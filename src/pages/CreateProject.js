import { useState } from "react";
import { useData } from "../context/DataContext";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/CreateProject.css";

const CreateProject = () => {
  const { project, setProject, projects, setProjects } = useData();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

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
    <section className="create-project-section">
      <div className="create-project-container">
        <h2>Create Project</h2>
        <form onSubmit={handleCreateProject}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={project.title}
            onChange={handleOnchange}
            required
            autoFocus
            autoComplete="off"
            placeholder="Enter project title"
          />

          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            required
            placeholder="Enter short description"
            value={project.shortDescription}
            onChange={handleOnchange}
            autoComplete="off"
            rows="5"
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            required
            placeholder="Enter project description"
            value={project.description}
            onChange={handleOnchange}
            autoComplete="off"
            rows="20"
          />

          <label htmlFor="technologies">Technologies</label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            required
            autoComplete="off"
            placeholder="e.g., React, Firebase, Tailwind"
            value={project.technologies.join(", ")}
            onChange={handleOnchange}
          />

          <label htmlFor="screenshot">Screenshot</label>
          <input
            type="file"
            id="screenshot"
            name="screenshot"
            accept="image/*"
            required
            autoComplete="off"
            onChange={handleOnchange}
          />

          {/* Optional Image Preview */}
          {project.screenshot && typeof project.screenshot === "object" && (
            <img
              src={URL.createObjectURL(project.screenshot)}
              alt="Preview"
              style={{ width: "200px", marginTop: "1rem" }}
            />
          )}

          <label htmlFor="liveLink">Live Link</label>
          <input
            type="url"
            id="liveLink"
            name="liveLink"
            autoComplete="off"
            placeholder="Enter live URL"
            value={project.liveLink}
            onChange={handleOnchange}
          />

          <label htmlFor="repoLink">Repository Link</label>
          <input
            type="url"
            id="repoLink"
            name="repoLink"
            autoComplete="off"
            placeholder="Enter GitHub repo URL"
            value={project.repoLink}
            onChange={handleOnchange}
          />

          <button type="submit" disabled={uploading}>
            {uploading ? "Creating..." : "Create Project"}
          </button>

          <button type="button" onClick={() => cencelCreate()}>
            Cencel
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProject;
