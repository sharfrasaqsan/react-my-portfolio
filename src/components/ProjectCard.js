import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const { id, title, shortDescription, technologies, screenshot, liveLink, repoLink } = project;

  return (
    <article className="card glass h-100">
      <div className="ratio ratio-16x9">
        <img
          src={screenshot || "/fallback.jpg"}
          alt={`${title} screenshot`}
          loading="lazy"
          className="w-100 h-100 object-fit-cover rounded-top-4"
        />
      </div>

      <div className="card-body p-4">
        <Link to={`/project/${id}`} className="stretched-link text-decoration-none">
          <h3 className="h5 mb-2">{title}</h3>
        </Link>
        <p className="text-body-secondary mb-3">{shortDescription}</p>

        {technologies?.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mb-3">
            {technologies.map((t) => (
              <span className="badge text-bg-primary" key={t}>{t}</span>
            ))}
          </div>
        )}

        <div className="d-flex flex-wrap gap-2">
          <a
            href={liveLink || "#"}
            className={"btn btn-primary btn-glass" + (!liveLink ? " disabled" : "")}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!liveLink}
            onClick={(e) => !liveLink && e.preventDefault()}
          >
            Live Site
          </a>
          <a
            href={repoLink || "#"}
            className={"btn btn-outline-light btn-glass" + (!repoLink ? " disabled" : "")}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!repoLink}
            onClick={(e) => !repoLink && e.preventDefault()}
          >
            Source
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
