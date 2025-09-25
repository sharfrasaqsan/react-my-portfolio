import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mb-5">
      <div className="container-xxl">
        <div className="card glass px-3 py-3">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
            <p className="mb-0 small text-body-secondary">
              &copy; {new Date().getFullYear()} Mohamed Sharfiras. All rights
              reserved.
            </p>

            <div className="d-flex align-items-center gap-3">
              <a
                href="https://github.com/sharfrasaqsan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-glass"
                aria-label="GitHub"
                title="GitHub"
              >
                <FaGithub aria-hidden />
              </a>
              <a
                href="https://www.linkedin.com/in/sharfiras/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-glass"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <FaLinkedin aria-hidden />
              </a>
              <a
                href=" https://facebook.com/sharfras.aqsan97/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-glass"
                aria-label="Facebook"
                title="Facebook"
              >
                <FaFacebook aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
