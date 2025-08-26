import "../styles/ProjectList.css";
import ProjectCard from "./ProjectCard";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import Search from "./Search";

const ProjectList = () => {
  const { projects, loading, searchedProjects } = useData();

  if (loading) return <Loading />;

  if (projects.length === 0)
    return <p className="no-projects-found">No projects found!</p>;

  const sortedSearchProjects = [...searchedProjects]?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  console.log(sortedSearchProjects);

  return (
    <div className="project-list-container">
      <h2>Projects</h2>

      <Search />

      {sortedSearchProjects && sortedSearchProjects.length > 0 ? (
        <div className="project-card-container">
          {sortedSearchProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="no-projects-found">No projects found!</p>
      )}
    </div>
  );
};

export default ProjectList;
