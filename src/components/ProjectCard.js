import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const MAX_TAGS = 4;

function ProjectCard({ project }) {
  const {
    id,
    title,
    shortDescription,
    technologies = [],
    screenshot,
    liveLink,
    repoLink,
  } = project;

  const { visibleTags, overflowCount, overflowList } = useMemo(() => {
    const visible = technologies.slice(0, MAX_TAGS);
    const extra = Math.max(technologies.length - MAX_TAGS, 0);
    return {
      visibleTags: visible,
      overflowCount: extra,
      overflowList: extra > 0 ? technologies.slice(MAX_TAGS).join(", ") : "",
    };
  }, [technologies]);

  const imgSrc = screenshot || "/fallback.jpg";
  if (!project) return null;

  return (
    <article className="card glass h-100 d-flex flex-column">
      <div className="ratio ratio-16x9 overflow-hidden rounded-top-4 card-img-zoom">
        <img
          src={imgSrc}
          alt={title ? `${title} screenshot` : "Project screenshot"}
          loading="lazy"
          decoding="async"
          width={1280}
          height={720}
          sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw"
          className="w-100 h-100 object-fit-cover"
          onError={(e) => {
            e.currentTarget.src = "/fallback.jpg";
          }}
        />
      </div>

      <div className="card-body p-4 d-flex flex-column">
        <Link to={`/project/${id}`} className="text-decoration-none">
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
              "btn btn-gh btn-glass d-flex align-items-center gap-2" +
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

export default memo(ProjectCard);
