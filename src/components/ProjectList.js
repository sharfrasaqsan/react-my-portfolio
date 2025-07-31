import "../styles/ProjectList.css";
import ProjectCard from "./ProjectCard";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";

const ProjectList = () => {
  const { projects, loading } = useData();

  if (loading) return <Loading />;
  if (projects.length === 0)
    return <p className="no-projects-found">No projects found!</p>;

  return (
    <div className="project-list">
      <h2>Projects</h2>

      {/* Optional Search Bar (if needed later) */}
      {/* 
      <form className="project-search-form">
        <input type="text" placeholder="Search projects..." />
      </form>
      */}

      {projects.map((project) => (
        <div key={project.id} className="project-card-section">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
