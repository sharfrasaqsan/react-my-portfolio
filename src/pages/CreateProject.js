import { useState } from "react";
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
  const navigate = useNavigate();

  if (loading) return <Loading />;

  if (!project) return <p className="no-projects-found">Project not found</p>;

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

  const handleOnchange = (e) => {
    const { name, value, files } = e.target;

    if (name === "screenshot") {
      setProject((prev) => ({
        ...prev,
        screenshot: files[0],
      }));
    } else if (name === "technologies") {
      setProject((prev) => ({
        ...prev,
        [name]: value.split(",").map((tech) => tech.trim()),
      }));
    } else {
      setProject((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const cencelCreate = () => {
    navigate("/projects");
    toast.warning("Project creation canceled!");
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
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (
      !project.title ||
      !project.shortDescription ||
      !project.description ||
      !project.technologies.length
    )
      return toast.error("All fields are required!");

    if (!project.screenshot) return toast.error("Screenshot is required!");

    setUploading(true);

    try {
      let screenshotUrl = "";
      if (project.screenshot) {
        screenshotUrl = await uploadImageToCloudinary(project.screenshot);
      }

      const newProject = {
        ...project,
        screenshot: screenshotUrl,
        createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        updatedAt: "",
      };

      const res = await addDoc(collection(db, "projects"), newProject);
      if (!res.id) {
        toast.error("Failed to create project!");
        return;
      }

      setProjects([...projects, { id: res.id, ...newProject }]);

      // Reset form
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

      toast.success("Project created successfully!");
      navigate("/projects");
    } catch (err) {
      toast.error(`Failed to create project! ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

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
            {project.screenshot && typeof project.screenshot === "object" && (
              <img
                src={URL.createObjectURL(project.screenshot)}
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
