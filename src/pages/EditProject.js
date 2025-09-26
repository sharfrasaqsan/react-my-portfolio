// EditProject.js
import { useEffect, useMemo, useState, useCallback } from "react";
import { useData } from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../utils/Loading";

const EditProject = () => {
  const { editProject, setEditProject, projects, setProjects, loading } =
    useData();
  const [updating, setUpdating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const selected = useMemo(
    () => projects.find((p) => p.id === id),
    [projects, id]
  );

  useEffect(() => {
    if (selected) setEditProject({ ...selected });
  }, [selected, setEditProject]);

  useEffect(() => {
    if (editProject?.screenshot && typeof editProject.screenshot === "object") {
      const url = URL.createObjectURL(editProject.screenshot);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl("");
  }, [editProject?.screenshot]);

  const uploadImageToCloudinary = useCallback(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "react-portfolio");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/sharfras/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (!res.ok || !data?.secure_url) throw new Error("Image upload failed");
    return data.secure_url;
  }, []);

  const cencelEdit = useCallback(() => {
    navigate(`/project/${id}`);
    toast.warning("Project update canceled!");
    setEditProject({
      title: "",
      shortDescription: "",
      description: "",
      technologies: [],
      screenshot: "",
      liveLink: "",
      repoLink: "",
      createdAt: "",
      updatedAt: "",
    });
  }, [id, navigate, setEditProject]);

  const handleOnchange = useCallback(
    (e) => {
      const { name, value, files } = e.target;
      if (name === "screenshot") {
        const file = files?.[0];
        setEditProject((prev) => ({ ...prev, screenshot: file || "" }));
      } else if (name === "technologies") {
        setEditProject((prev) => ({
          ...prev,
          technologies: value
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }));
      } else {
        setEditProject((prev) => ({ ...prev, [name]: value }));
      }
    },
    [setEditProject]
  );

  const handleEditProject = useCallback(
    async (projectId) => {
      if (updating) return;

      const p = editProject;
      if (
        !p.title ||
        !p.shortDescription ||
        !p.description ||
        !p.technologies?.length
      ) {
        return toast.error("All fields are required!");
      }
      if (!p.screenshot) return toast.error("Screenshot is required!");

      setUpdating(true);
      try {
        const screenshotUrl =
          typeof p.screenshot === "object"
            ? await uploadImageToCloudinary(p.screenshot)
            : p.screenshot;

        const updatedProject = {
          ...p,
          screenshot: screenshotUrl,
          updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        };

        await updateDoc(doc(db, "projects", projectId), updatedProject);

        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === projectId ? { ...proj, ...updatedProject } : proj
          )
        );

        setEditProject({
          title: "",
          shortDescription: "",
          description: "",
          technologies: [],
          screenshot: "",
          liveLink: "",
          repoLink: "",
          createdAt: "",
          updatedAt: "",
        });

        toast.success("Project updated successfully!");
        navigate(`/project/${projectId}`);
      } catch (err) {
        toast.error(`Failed to update project: ${err.message}`);
      } finally {
        setUpdating(false);
      }
    },
    [
      editProject,
      navigate,
      setEditProject,
      setProjects,
      uploadImageToCloudinary,
      updating,
    ]
  );

  if (loading) return <Loading />;

  if (!editProject)
    return <p className="no-projects-found">Project is not found!</p>;

  return (
    <section className="container-xxl py-5">
      <div className="card glass p-4 p-md-5">
        <h2 className="h4 mb-4">Edit Project</h2>
        <form
          className="row g-3"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditProject(id);
          }}
        >
          <div className="col-12">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              value={editProject.title}
              onChange={handleOnchange}
              required
              autoFocus
            />
          </div>

          <div className="col-12">
            <label htmlFor="shortDescription" className="form-label">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              rows="3"
              className="form-control"
              value={editProject.shortDescription}
              onChange={handleOnchange}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="10"
              className="form-control"
              value={editProject.description}
              onChange={handleOnchange}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="technologies" className="form-label">
              Technologies
            </label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              className="form-control"
              value={(editProject.technologies || []).join(", ")}
              onChange={handleOnchange}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="screenshot" className="form-label">
              Screenshot
            </label>
            <input
              id="screenshot"
              name="screenshot"
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleOnchange}
            />
            {(previewUrl ||
              (typeof editProject.screenshot === "string" &&
                editProject.screenshot)) && (
              <img
                src={previewUrl || editProject.screenshot}
                alt="Preview"
                className="img-fluid rounded mt-3"
                width={600}
                height={338}
                style={{ maxWidth: "300px", height: "auto" }}
              />
            )}
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="liveLink" className="form-label">
              Live Link
            </label>
            <input
              id="liveLink"
              name="liveLink"
              type="url"
              className="form-control"
              value={editProject.liveLink}
              onChange={handleOnchange}
            />
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="repoLink" className="form-label">
              Repository Link
            </label>
            <input
              id="repoLink"
              name="repoLink"
              type="url"
              className="form-control"
              value={editProject.repoLink}
              onChange={handleOnchange}
            />
          </div>

          <div className="col-12 d-flex gap-2">
            <button
              className="btn btn-primary btn-glass"
              type="submit"
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Project"}
            </button>
            <button
              className="btn btn-outline-light btn-glass"
              type="button"
              onClick={cencelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProject;
