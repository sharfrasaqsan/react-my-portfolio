import photo_dp from "../assets/images/DP.png";
import resume from "../assets/documents/Resume.pdf";

const About = () => {
  return (
    <section className="container-xxl py-5">
      <div className="row g-4 align-items-center">
        <div className="col-12 col-lg-4">
          <div className="card glass overflow-hidden text-center p-4">
            <img
              src={photo_dp}
              alt="A. Mohamed Sharfiras"
              className="rounded-4 shadow-sm mb-3"
              style={{ maxWidth: "200px" }}
            />
            <h2 className="h4">A. Mohamed Sharfiras</h2>
            <p className="text-body-secondary">
              Frontend Web Developer with <strong>3+ years</strong> crafting
              responsive, accessible, and user-focused apps.
            </p>
            <a href={resume} download className="btn btn-primary btn-glass mt-2">
              Download Resume
            </a>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card glass p-4 p-md-5">
            <h3 className="h5 mb-3">Bio & Background</h3>
            <p>
              I started with curiosity about how websites work. Now as a
              <b> Frontend Web Developer</b> at <b>Oscar Wylee</b>, I deliver
              fast, intuitive, and high-performance applications.
            </p>

            <h3 className="h5 mt-4">Career Goals</h3>
            <p>
              Expanding into <strong>full-stack</strong> with Node.js,
              Express, and Next.js. I aim to contribute to innovative teams and
              solve real-world problems.
            </p>

            <h3 className="h5 mt-4">Career Background</h3>
            <ul className="list-unstyled">
              <li className="mb-3">
                <strong>2022 – Present:</strong> Frontend Developer at Oscar
                Wylee
              </li>
              <li className="mb-3">
                <strong>2021 Dec – 2022 June:</strong> Software Engineer Intern
                at KINIT Pvt Ltd
              </li>
              <li>
                <strong>2021 Oct – 2022 Sep:</strong> Freelance Web Developer
              </li>
            </ul>

            <h3 className="h5 mt-4">Education</h3>
            <ul className="list-unstyled">
              <li className="mb-3">
                <strong>2018 – 2022:</strong> BICT (Hons), University of Kelaniya
              </li>
              <li>
                <strong>2014 – 2016:</strong> G.C.E Advanced Level, T/Kinniya
                Al-Aqsa College
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
