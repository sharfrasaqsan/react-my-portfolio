import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import { useAuth } from "../context/AuthContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import "../styles/ProjectDetails.css";

const ProjectDetails = () => {
  const { projects, loading } = useData();
  const { user } = useAuth();

  const { id } = useParams();

  if (loading) {
    return <Loading />;
  }

  if (projects.length === 0) {
    return <p className="no-projects-found">No projects to show!</p>;
  }

  const project = projects.find((project) => project.id === id);

  if (!project) {
    return <p className="no-project-found">Project not found!</p>;
  }

  return (
    <section className="project-details">
      <Link to="/projects" className="back-link">
        <FaArrowLeftLong /> Back to Projects
      </Link>

      <h3>{project.title}</h3>

      <article>
        {user && (
          <>
            <time>
              <stong>Created at:</stong> {project.createdAt}
            </time>
            {project.updatedAt && (
              <time>
                <strong>Updated at:</strong> {project.updatedAt}
              </time>
            )}
          </>
        )}

        {project.screenshot && (
          <img src={project.screenshot} alt={`${project.title} screenshot`} />
        )}

        <p style={{ textAlign: "justify" }}>
          <strong>Description:</strong> <br />
          {project.description.split("\n").map((para, idx) => (
            <p
              key={idx}
              style={{ textAlign: "justify", whiteSpace: "pre-line" }}
            >
              {para}
            </p>
          ))}
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
          <a
            href={project.liveLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!project.liveLink}
            className={!project.liveLink ? "disabled-link" : ""}
          >
            Live Link
          </a>

          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!project.repoLink}
            className={!project.repoLink ? "disabled-link" : ""}
          >
            Repo Link
          </a>
        </div>
      </article>
    </section>
  );
};

export default ProjectDetails;
