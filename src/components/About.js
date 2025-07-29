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
        <p
          className="about-intro"
          style={{ maxWidth: "1024px", lineHeight: "1.6" }}
        >
          I'm a <strong>Frontend Web Developer</strong> with{" "}
          <strong>3+ years of experience</strong> crafting
          <em> responsive</em>, <em>accessible</em>, and <em>user-focused</em>{" "}
          websites.
          <br />
          <br />
          My journey began with a curiosity about how websites work. Today, I
          build modern, scalable web applications using{" "}
          <strong>React.js</strong>, <strong>JavaScript (ES6+)</strong>,{" "}
          <strong>HTML5</strong>,<strong>CSS3</strong>, and{" "}
          <strong>REST APIs</strong>. At Oscar Wylee, I focus on performance,
          SEO, and clean UI development across devices.
          <br />
          <br />I also bring hands-on experience with platforms like{" "}
          <strong>Magento 2</strong> and <strong>WordPress</strong>, enabling me
          to support both eCommerce and content-driven sites effectively.
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

        <h3 id="career-goals">Career Goals</h3>
        <p>
          I'm currently expanding into <strong>full-stack development</strong>{" "}
          with technologies like <strong>Node.js</strong>,{" "}
          <strong>Express</strong>, and <strong>Next.js</strong>. My goal is to
          join <em>innovative teams</em> where I can contribute meaningfully,
          solve real-world problems, and grow with emerging tech.
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
