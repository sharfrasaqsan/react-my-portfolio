import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { toast } from "sonner";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useCallback, useState } from "react";

const AdminPanel = () => {
  const { user } = useAuth();
  const { projects, setProjects } = useData();
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteProject = useCallback(
    async (projectId) => {
      if (deletingId) return;
      setDeletingId(projectId);
      try {
        await deleteDoc(doc(db, "projects", projectId));
        setProjects((prev) => prev.filter((proj) => proj.id !== projectId));
        toast.success("Project deleted successfully!");
        navigate("/admin");
      } catch (err) {
        toast.error("Failed to delete project! " + err.message);
      } finally {
        setDeletingId(null);
      }
    },
    [deletingId, navigate, setProjects]
  );

  if (!user) {
    return (
      <div className="container-xxl py-5">
        <div className="alert alert-warning glass">
          You need to be logged in to view this page.
          <NavLink to="/login" className="ms-2">
            Login
          </NavLink>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="container-xxl py-5">
        <div className="alert alert-info glass">
          No projects found!{" "}
          <Link to="/admin/project/create">Create a Project</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="container-xxl py-5">
      <div className="card glass p-4">
        <h2 className="h4 mb-4">Admin Panel</h2>
        <div className="d-flex gap-3 mb-4">
          <Link
            to="/admin/project/create"
            className="btn btn-primary btn-glass"
          >
            Add Project
          </Link>
          <Link to="/admin/blog/create" className="btn btn-primary btn-glass">
            Add Blog
          </Link>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0 glass">
            <thead>
              <tr>
                <th>Project Title</th>
                <th style={{ width: "160px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <Link
                      to={`/project/${project.id}`}
                      className="text-decoration-none"
                    >
                      {project.title}
                    </Link>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/admin/project/edit/${project.id}`}
                        className="btn btn-sm btn-secondary"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteProject(project.id)}
                        disabled={deletingId === project.id}
                      >
                        {deletingId === project.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
