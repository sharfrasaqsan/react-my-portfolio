import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/AdminPanel.css";
import { useState } from "react";

const AdminPanel = () => {
  const { user } = useAuth();
  const { projects, setProjects } = useData();
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState(false);

  if (!user)
    return (
      <p className="admin-message">
        You need to be logged in to view this page!
        <br />
        <NavLink to="/login" className="admin-login-link">
          Login
        </NavLink>{" "}
        Here.
      </p>
    );

  if (projects.length === 0)
    return (
      <p className="admin-message">
        No projects found! You need to create a project first!
        <br />
        <Link to="/admin/project/create" className="admin-login-link">
          Create a Project
        </Link>{" "}
        Here.
      </p>
    );

  const handleDeleteProject = async (projectId) => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "projects", projectId));
      setProjects((projects) =>
        projects.filter((project) => project.id !== projectId)
      );
      toast.success("Project deleted successfully!");
      navigate("/admin");
    } catch (err) {
      toast.error("Failed to delete project! " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <div className="admin-panel-container">
        <div className="create-project-div">
          <Link to="/admin/project/create" className="admin-add-link">
            <button type="button" className="btn btn-primary admin-add-btn">
              Add Project
            </button>
          </Link>

          <Link to="/admin/blog/create" className="admin-add-link">
            <button type="button" className="btn btn-primary admin-add-btn">
              Add Blog
            </button>
          </Link>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="admin-table-row">
                  <td>
                    <Link
                      to={`/project/${project.id}`}
                      className="admin-project-link"
                    >
                      {project.title}
                    </Link>
                  </td>
                  <td className="admin-actions-cell">
                    <Link
                      to={`/admin/project/edit/${project.id}`}
                      className="btn btn-secondary admin-edit-btn"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger admin-delete-btn"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
