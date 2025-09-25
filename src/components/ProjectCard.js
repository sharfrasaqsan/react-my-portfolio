import { Link } from "react-router-dom";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const MAX_TAGS = 4;

export default function ProjectCard({ project }) {
  if (!project) return null;

  const {
    id,
    title,
    shortDescription,
    technologies = [],
    screenshot,
    liveLink,
    repoLink,
  } = project;

  const visibleTags = technologies.slice(0, MAX_TAGS);
  const overflowCount = Math.max(technologies.length - MAX_TAGS, 0);
  const overflowList =
    overflowCount > 0 ? technologies.slice(MAX_TAGS).join(", ") : "";

  const imgSrc = screenshot || "/fallback.jpg";

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.getAttribute("data-bs-theme") === "dark";

  return (
    <article className="card glass h-100 d-flex flex-column">
      {/* Media */}
      <div className="ratio ratio-16x9 overflow-hidden rounded-top-4 card-img-zoom">
        <img
          src={imgSrc}
          alt={title ? `${title} screenshot` : "Project screenshot"}
          loading="lazy"
          decoding="async"
          className="w-100 h-100 object-fit-cover"
          onError={(e) => {
            e.currentTarget.src = "/fallback.jpg";
          }}
        />
      </div>

      {/* Body */}
      <div className="card-body p-4 d-flex flex-column">
        <Link
          to={`/project/${id}`}
          className="stretched-link text-decoration-none"
        >
          <h3 className="h5 mb-2">{title}</h3>
        </Link>

        {shortDescription && (
          <p className="text-body-secondary mb-3 line-clamp-3">
            {shortDescription}
          </p>
        )}

        {visibleTags.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mb-3">
            {visibleTags.map((t) => (
              <span
                key={t}
                className="badge bg-primary-subtle text-primary-emphasis rounded-pill"
              >
                {t}
              </span>
            ))}

            {overflowCount > 0 && (
              <span
                className="badge bg-secondary-subtle text-dark-emphasis rounded-pill"
                title={overflowList}
                aria-label={`${overflowCount} more: ${overflowList}`}
              >
                +{overflowCount}
              </span>
            )}
          </div>
        )}

        {/* CTAs pinned to bottom */}
        <div className="mt-auto d-flex flex-wrap gap-2">
          <a
            href={liveLink || "#"}
            className={
              "btn btn-primary btn-glass d-flex align-items-center gap-2" +
              (!liveLink ? " disabled" : "")
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!liveLink}
            onClick={(e) => !liveLink && e.preventDefault()}
          >
            <FiExternalLink aria-hidden /> Live
          </a>

          <a
            href={repoLink || "#"}
            className={
              `btn ${
                isDark ? "btn-outline-light" : "btn-outline-dark"
              } btn-glass d-flex align-items-center gap-2` +
              (!repoLink ? " disabled" : "")
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!repoLink}
            onClick={(e) => !repoLink && e.preventDefault()}
          >
            <FiGithub aria-hidden /> Source
          </a>
        </div>
      </div>
    </article>
  );
}
