import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditProject = () => {
  const { editProject, setEditProject, projects, setProjects, loading } =
    useData();
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const project = projects.find((project) => project.id === id);

  useEffect(() => {
    if (project) {
      setEditProject({ ...project });
    }
  }, [project, setEditProject]);

  if (loading) return <loading />;

  if (!editProject)
    return <p className="no-projects-found">Project is not found!</p>;

  const uploadImageToCloudinary = async (file) => {
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
    return data.secure_url;
  };

  const cencelEdit = () => {
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
  };

  const handleOnchange = (e) => {
    const { name, value, files } = e.target;

    if (name === "screenshot") {
      setEditProject((prev) => ({
        ...prev,
        screenshot: files[0],
      }));
    } else if (name === "technologies") {
      setEditProject((prev) => ({
        ...prev,
        [name]: value.split(",").map((tech) => tech.trim()),
      }));
    } else {
      setEditProject((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditProject = async (projectId) => {
    if (
      !editProject.title ||
      !editProject.shortDescription ||
      !editProject.description ||
      !editProject.technologies.length
    ) {
      return toast.error("All fields are required!");
    }

    if (!editProject.screenshot) {
      return toast.error("Screenshot is required!");
    }

    setUpdating(true);

    try {
      let screenshotUrl = "";

      // If screenshot is a File (not already a URL), upload it
      if (typeof editProject.screenshot === "object") {
        screenshotUrl = await uploadImageToCloudinary(editProject.screenshot);
      } else {
        screenshotUrl = editProject.screenshot; // already uploaded
      }

      const updatedProject = {
        ...editProject,
        screenshot: screenshotUrl,
        updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
      };

      await updateDoc(doc(db, "projects", projectId), updatedProject);

      setProjects(
        projects.map((project) =>
          project.id === projectId ? { ...project, ...updatedProject } : project
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
  };

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
              value={editProject.technologies.join(", ")}
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
            {editProject.screenshot && (
              <img
                src={
                  typeof editProject.screenshot === "object"
                    ? URL.createObjectURL(editProject.screenshot)
                    : editProject.screenshot
                }
                alt="Preview"
                className="img-fluid rounded mt-3"
                style={{ maxWidth: "300px" }}
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
