import ProjectCard from "./ProjectCard";
import { useData } from "../context/DataContext";
import Loading from "../utils/Loading";
import Search from "./Search";

const ProjectList = () => {
  const { projects, loading, searchedProjects } = useData();

  if (loading) return <Loading />;

  if (projects.length === 0) {
    return (
      <div className="container-xxl py-5">
        <p className="text-center text-body-secondary">No projects found!</p>
      </div>
    );
  }

  const sorted = [...(searchedProjects || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className="container-xxl py-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <h2 className="h3 mb-0">Projects</h2>
        <Search />
      </div>

      {sorted.length > 0 ? (
        <div className="row g-4">
          {sorted.map((project) => (
            <div key={project.id} className="col-12 col-sm-6 col-lg-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-body-secondary mt-5">No projects found!</p>
      )}
    </section>
  );
};

export default ProjectList;
