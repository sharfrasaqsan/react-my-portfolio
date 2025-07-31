import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/EditProject.css";

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
    <section className="edit-project-section">
      <div className="edit-project-container">
        <h2>Edit Project</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditProject(id);
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editProject.title}
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
            value={editProject.shortDescription}
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
            value={editProject.description}
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
            value={editProject.technologies.join(", ")}
            onChange={handleOnchange}
          />

          <label htmlFor="screenshot">Screenshot</label>
          <input
            type="file"
            id="screenshot"
            name="screenshot"
            accept="image/*"
            autoComplete="off"
            onChange={handleOnchange}
          />

          {/* Image Preview */}
          {editProject.screenshot && (
            <img
              src={
                typeof editProject.screenshot === "object"
                  ? URL.createObjectURL(editProject.screenshot)
                  : editProject.screenshot
              }
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
            value={editProject.liveLink}
            onChange={handleOnchange}
          />

          <label htmlFor="repoLink">Repository Link</label>
          <input
            type="url"
            id="repoLink"
            name="repoLink"
            autoComplete="off"
            placeholder="Enter GitHub repo URL"
            value={editProject.repoLink}
            onChange={handleOnchange}
          />

          <button type="submit" disabled={updating}>
            {updating ? "Updating..." : "Update Project"}
          </button>

          <button type="button" onClick={() => cencelEdit()}>
            Cencel
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProject;
