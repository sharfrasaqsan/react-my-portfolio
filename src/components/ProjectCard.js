import React from "react";
import "../styles/ProjectCard.css";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const handleLinkClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="project-card">
      <img
        src={project.screenshot}
        alt={`${project.title} screenshot`}
        className="project-card-image"
      />
      <div className="project-card-content">
        <Link to={`/project/${project.id}`}>
          <div className="project-card-head">
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-description">
              {project.shortDescription}
            </p>
            <div className="project-card-technologies">
              <strong>Tech Stack:</strong> {project.technologies.join(", ")}
            </div>
          </div>
        </Link>
        <div className="project-card-buttons">
          {project.liveLink ? (
            <a
              href={project.liveLink}
              className="project-card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Site
            </a>
          ) : (
            <a
              href="null"
              className="project-card-button disabled"
              onClick={handleLinkClick}
            >
              Live Site
            </a>
          )}

          {project.repoLink ? (
            <a
              href={project.repoLink}
              className="project-card-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          ) : (
            <a
              href="null"
              className="project-card-button disabled"
              onClick={handleLinkClick}
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
