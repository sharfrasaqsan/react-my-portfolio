import React from "react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const {
    title = "Project Title",
    description = "No description available.",
    technologies = [],
    screenshot = "default-screenshot.jpg",
    liveLink = "#",
    repoLink = "#",
  } = project;


  const handleLinkClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="project-card">
      <img
        src={screenshot}
        alt={`${title} screenshot`}
        className="project-card-image"
      />
      <div className="project-card-content">
        <div className="project-card-head">
          <h3 className="project-card-title">{title}</h3>
          <p className="project-card-description">{description}</p>
          <div className="project-card-technologies">
            <strong>Technologies:</strong> {technologies.join(", ")}
          </div>
        </div>
        <div className="project-card-buttons">
          {liveLink ? (
            <a
              href={liveLink}
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

          {repoLink ? (
            <a
              href={repoLink}
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
