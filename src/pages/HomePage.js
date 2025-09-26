// HomePage.js
import { Suspense, lazy } from "react";
const Hero = lazy(() => import("../components/Hero"));

const HomePage = () => {
  return (
    <main className="container-xxl py-5">
      <Suspense fallback={<div className="text-center py-5">Loading…</div>}>
        <Hero />
      </Suspense>
    </main>
  );
};

export default HomePage;
