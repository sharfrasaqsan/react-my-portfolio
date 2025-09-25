import { Link, useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import { useAuth } from "../context/AuthContext";
import { FaArrowLeftLong } from "react-icons/fa6";

const ProjectDetails = () => {
  const { projects, loading } = useData();
  const { user } = useAuth();
  const { id } = useParams();

  if (loading) return <Loading />;
  if (projects.length === 0)
    return (
      <p className="text-center text-body-secondary">No projects to show!</p>
    );

  const project = projects.find((p) => p.id === id);
  if (!project)
    return (
      <p className="text-center text-body-secondary">Project not found!</p>
    );

  return (
    <section className="container-xxl py-5">
      <Link to="/projects" className="btn btn-link mb-3 text-decoration-none">
        <FaArrowLeftLong /> Back to Projects
      </Link>

      <div className="card glass p-4 p-md-5">
        <h3 className="h4">{project.title}</h3>

        {user && (
          <p className="small text-body-secondary mb-2">
            Created at: {project.createdAt}
            {project.updatedAt && <> • Updated at: {project.updatedAt}</>}
          </p>
        )}

        {project.screenshot && (
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="img-fluid rounded shadow-sm mb-4"
          />
        )}

        <div className="mb-4">
          <h5>Description</h5>
          {project.description.split("\n").map((para, idx) => (
            <p key={idx} style={{ whiteSpace: "pre-line" }}>
              {para}
            </p>
          ))}
        </div>

        <div className="mb-4">
          <h5>Tech Stack</h5>
          <ul className="list-inline">
            {project.technologies?.map((tech, index) => (
              <li
                key={index}
                className="badge bg-primary-subtle text-primary-emphasis me-2 mb-2"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex gap-2">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-glass"
            >
              Live Link
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light btn-glass"
            >
              Repo Link
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
