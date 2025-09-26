// Hero.js (with updated copy)
import { Link } from "react-router-dom";
import photo_dp from "../assets/images/DP.webp";

const Hero = () => {
  return (
    <section className="container-xxl py-5" id="hero">
      <div className="row g-4 align-items-center">
        <div className="col-12 col-lg-5">
          <div className="card glass overflow-hidden p-0">
            <div className="ratio ratio-1x1">
              <img
                src={photo_dp}
                alt="A. Mohamed Sharfiras"
                className="w-100 h-100 object-fit-cover rounded-4"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                width={800}
                height={800}
                sizes="(max-width: 992px) 100vw, 40vw"
              />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card glass p-4 p-md-5">
            <h1 className="display-5 fw-semibold mb-3">
              Web Developer — React &amp; Next.js
            </h1>

            <p className="lead text-body-secondary mb-2">
              Performance-minded. Accessibility-first.
            </p>

            <p className="mb-3">
              3+ years building responsive, SEO-friendly products. Expanding
              into <strong>Node.js</strong> and <strong>Express</strong> for
              full-stack impact. Let’s create something users love.
            </p>

            <p className="mb-0">
              <span className="badge bg-primary-subtle text-primary-emphasis">
                Available for full-time or freelance
              </span>
            </p>

            <div className="d-flex flex-wrap gap-3 mt-3">
              <Link
                className="btn btn-primary btn-glass"
                to="/contact"
                aria-label="Hire Sharfiras"
              >
                Hire Me
              </Link>
              <Link
                className="btn btn-outline-light btn-glass"
                to="/projects"
                aria-label="See Sharfiras' work"
              >
                See Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
