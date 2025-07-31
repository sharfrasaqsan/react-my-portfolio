import "../styles/ProjectCard.css";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <div className="project-card">
      <img
        src={project.screenshot || "/fallback.jpg"}
        alt={`${project.title} Screenshot`}
        className="project-card-image"
      />
      <div className="project-card-content">
        <Link to={`/project/${project.id}`} className="project-card-link">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-description">{project.shortDescription}</p>
          <div className="project-card-technologies">
            <strong>Tech Stack:</strong> {project.technologies?.join(", ")}
          </div>
        </Link>

        <div className="project-card-buttons">
          <a
            href={project.liveLink || "#"}
            className={`project-card-button ${
              !project.liveLink ? "disabled" : ""
            }`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => !project.liveLink && e.preventDefault()}
          >
            Live Site
          </a>

          <a
            href={project.repoLink || "#"}
            className={`project-card-button ${
              !project.repoLink ? "disabled" : ""
            }`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => !project.repoLink && e.preventDefault()}
          >
            Source
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
