import React from "react";
import "./styles/About.css"; // Using your global variables
import photo_dp from "../assets/images/DP.png"; // Your headshot or personal graphic
import resume from "../assets/documents/Resume.pdf"; // Your resume PDF

const About = () => {
  return (
    <section className="about-container">
      <div className="about-header">
        <img
          src={photo_dp}
          alt="A. Mohamed Sharfiras"
          className="about-photo"
        />
        <h2>A. Mohamed Sharfiras</h2>
        <p className="about-intro">
          I’m a passionate <strong>Frontend Web Developer</strong> with a love
          for
          <strong> problem-solving</strong>, <strong>design</strong>, and
          creating
          <strong> memorable web experiences</strong>. Here's my story.
        </p>
        <a href={resume} download className="resume-button">
          Download Resume
        </a>
      </div>

      <div className="about-content">
        <h3>Bio & Background</h3>
        <p>
          I started my journey in web development with a curiosity to understand
          how websites function. Now, as a <b>Frontend Web Developer</b> at{" "}
          <b>Oscar Wylee</b> since <b>October 2022</b>, I've honed my skills in{" "}
          <strong>creating intuitive</strong>, <strong>responsive</strong> user
          experiences while delivering <b>high-performance web applications</b>.
        </p>

        <h3>Career Goals</h3>
        <p>
          My aim is to further grow as a <strong>full-stack developer</strong>,
          with a focus on building
          <strong> scalable</strong> and{" "}
          <strong>efficient web applications</strong>. I aspire to work with{" "}
          <b>innovative teams</b> where I can contribute my skills, collaborate
          on exciting projects, and continue learning{" "}
          <b>cutting-edge technologies</b>.
        </p>

        <h3>Career Background</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <h4>2022 - Present: Frontend Web Developer</h4>
              <p>
                <b>Oscar Wylee</b> (Sydney - Remote) - Leading the development
                of <strong>responsive</strong>,{" "}
                <strong>SEO-friendly websites</strong> that enhance
                <strong>user interface (UI)</strong> and{" "}
                <strong>user experience (UX)</strong> for a popular eyewear
                brand.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h4>2021 Dec - 2022 June: Software Engineer Intern</h4>
              <p>
                <b>KINIT Pvt Ltd</b> (Kinniya) - Gained experience in{" "}
                <strong>backend development</strong>,
                <strong>API integration</strong>, and full-stack web solutions
                as part of an agile team.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h4>2021 Oct - 2022 Sep: Freelance Web Developer</h4>
              <p>
                Worked as a freelance developer on various client projects,
                focusing on
                <strong>front-end technologies</strong>,{" "}
                <strong>mobile optimization</strong>, and{" "}
                <strong>high-ranking SEO solutions</strong>.
              </p>
            </div>
          </div>
        </div>

        <h3>Education Background</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <h4>2018 - 2022: BICT (Honors)</h4>
              <p>
                <b>University of Kelaniya</b> - Bachelor of Information and
                Communication Technology (Honors) specialized in
                <strong>Software Systems</strong>.
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-content">
              <h4>2014 - 2016: G.C.E Advanced Level</h4>
              <p>
                <b>T/Kinniya Al-Aqsa College</b> - Engineering Technology
                stream, with a focus on <strong>problem-solving</strong> and{" "}
                <strong>system design</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
