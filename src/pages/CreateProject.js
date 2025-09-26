import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useData } from "../context/DataContext";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";

const CreateProject = () => {
  const { project, setProject, projects, setProjects, loading } = useData();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const navigate = useNavigate();
  const mounted = useRef(true);

  useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

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
    if (!res.ok || !data.secure_url) throw new Error("Image upload failed");
    return data.secure_url;
  }, []);

  // Clean up blob previews
  useEffect(() => {
    if (project?.screenshot && typeof project.screenshot === "object") {
      const url = URL.createObjectURL(project.screenshot);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [project?.screenshot]);

  const handleOnchange = useCallback(
    (e) => {
      const { name, value, files } = e.target;
      if (name === "screenshot") {
        const file = files?.[0];
        setProject((prev) => ({ ...prev, screenshot: file || "" }));
      } else if (name === "technologies") {
        setProject((prev) => ({
          ...prev,
          technologies: value
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }));
      } else {
        setProject((prev) => ({ ...prev, [name]: value }));
      }
    },
    [setProject]
  );

  const resetProject = useCallback(() => {
    setProject({
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
  }, [setProject]);

  const cencelCreate = useCallback(() => {
    navigate("/projects");
    toast.warning("Project creation canceled!");
    resetProject();
  }, [navigate, resetProject]);

  const handleCreateProject = useCallback(
    async (e) => {
      e.preventDefault();
      if (uploading) return;

      if (
        !project.title ||
        !project.shortDescription ||
        !project.description ||
        !project.technologies.length
      ) {
        return toast.error("All fields are required!");
      }
      if (!project.screenshot) return toast.error("Screenshot is required!");

      setUploading(true);
      try {
        const screenshotUrl = await uploadImageToCloudinary(project.screenshot);
        const newProject = {
          ...project,
          screenshot: screenshotUrl,
          createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          updatedAt: "",
        };
        const res = await addDoc(collection(db, "projects"), newProject);
        if (!res.id) throw new Error("Failed to create project");

        setProjects((prev) => [...prev, { id: res.id, ...newProject }]);
        resetProject();
        toast.success("Project created successfully!");
        navigate("/projects");
      } catch (err) {
        toast.error(`Failed to create project! ${err.message}`);
      } finally {
        mounted.current && setUploading(false);
      }
    },
    [
      navigate,
      project,
      resetProject,
      setProjects,
      uploadImageToCloudinary,
      uploading,
    ]
  );

  if (loading) return <Loading />;
  if (!project) return <p className="no-projects-found">Project not found</p>;

  return (
    <section className="container-xxl py-5">
      <div className="card glass p-4 p-md-5">
        <h2 className="h4 mb-4">Create Project</h2>
        <form className="row g-3" onSubmit={handleCreateProject}>
          <div className="col-12">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              required
              autoFocus
              autoComplete="off"
              value={project.title}
              onChange={handleOnchange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="shortDescription" className="form-label">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              className="form-control"
              rows="3"
              required
              value={project.shortDescription}
              onChange={handleOnchange}
            />
          </div>

          <div className="col-12">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="10"
              required
              value={project.description}
              onChange={handleOnchange}
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
              placeholder="e.g., React, Firebase, Tailwind"
              value={project.technologies.join(", ")}
              onChange={handleOnchange}
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
            {previewUrl && (
              <img
                src={previewUrl}
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
              value={project.liveLink}
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
              value={project.repoLink}
              onChange={handleOnchange}
            />
          </div>

          <div className="col-12 d-flex gap-2">
            <button
              className="btn btn-primary btn-glass"
              type="submit"
              disabled={uploading}
            >
              {uploading ? "Creating..." : "Create Project"}
            </button>
            <button
              className="btn btn-outline-light btn-glass"
              type="button"
              onClick={cencelCreate}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateProject;
