import { useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import "../styles/ProjectDetails.css";

const ProjectDetails = () => {
  const { projects, loading } = useData();
  const { user } = useAuth();

  const { id } = useParams();

  if (loading) {
    return <Loading />;
  }

  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }

  const project = projects.find((project) => project.id === id);

  if (!project) {
    return <p>Project not found.</p>;
  }

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    return format(new Date(timestamp.seconds * 1000), "yyyy-MM-dd HH:mm");
  };

  return (
    <section className="project-details">
      <h3>{project.title}</h3>
      <article>
        {user && (
          <>
            <time>Created at: {formatDate(project.createdAt)}</time>
            {project.updatedAt && (
              <time>Updated at: {formatDate(project.updatedAt)}</time>
            )}
          </>
        )}

        {project.screenshot && (
          <img src={project.screenshot} alt={`${project.title} screenshot`} />
        )}

        <p>
          <strong>Description:</strong> {project.description}
        </p>

        <p>
          <strong>Tech Stack:</strong>
        </p>
        <ul>
          {project.technologies?.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>

        <div className="project-links">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
            Live Link
          </a>
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
            Repo Link
          </a>
        </div>
      </article>
    </section>
  );
};

export default ProjectDetails;
