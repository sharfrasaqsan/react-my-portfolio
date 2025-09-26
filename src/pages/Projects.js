// Projects.js
import { Suspense, lazy } from "react";
const ProjectList = lazy(() => import("../components/ProjectList"));

const Projects = () => {
  return (
    <Suspense fallback={<div className="text-center py-5">Loading…</div>}>
      <ProjectList />
    </Suspense>
  );
};

export default Projects;
