import { Link } from "react-router-dom";
import photo_dp from "../assets/images/DP.webp";

const Hero = () => {
  return (
    <section className="container-xxl py-5">
      <div className="row g-4 align-items-center">
        <div className="col-12 col-lg-5">
          <div className="card glass overflow-hidden p-0">
            <div className="ratio ratio-1x1">
              <img
                src={photo_dp}
                alt="Profile"
                className="w-100 h-100 object-fit-cover rounded-4"
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card glass p-4 p-md-5">
            <h1 className="display-5 fw-semibold mb-3">
              Hello, I&apos;m A. Mohamed Sharfiras
            </h1>
            <p className="lead text-body-secondary">
              Creative Web Developer focused on fast, accessible React apps. I
              love solving problems and crafting engaging experiences.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-3">
              <Link className="btn btn-primary btn-glass" to="/contact">
                Get in Touch
              </Link>
              <Link className="btn btn-outline-light btn-glass" to="/projects">
                My Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
