import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const AdminPanel = () => {
  const { user } = useAuth();
  const { projects, setProjects } = useData();

  const navigate = useNavigate();

  if (projects.length === 0) return <p>No projects found!</p>;

  if (!user)
    return (
      <p>
        You need to be logged in to view this page!
        <br />
        <NavLink to="/login">Login</NavLink> Here.
      </p>
    );

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      setProjects((projects) =>
        projects.filter((project) => project.id !== projectId)
      );
      toast.success("Project deleted successfully!");
      navigate("/admin");
    } catch (err) {
      toast.error("Failed to delete project!", err.message);
    }
  };

  return (
    <section>
      <div>
        <h2>Admin Panel</h2>

        <Link to="/admin/project/create">
          <button type="button">Add Project</button>
        </Link>

        <div>
          <table>
            <tr>
              <th>Project Title</th>
              <th>Actions</th>
            </tr>
            {projects.map((project) => (
              <tr key={project.id}>
                <Link to={`/project/${project.id}`}>
                  <td>{project.title}</td>
                </Link>
                <td>
                  <Link to={`/admin/project/edit/${project.id}`}>Edit</Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
