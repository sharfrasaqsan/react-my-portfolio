import React from "react";
import "./styles/Skills.css";

const Skills = () => {
  return (
    <section className="skills-container">
      <h2>Skills Overview</h2>

      <div className="skills-categories">
        {/* Frontend Skills */}
        <div className="skills-category">
          <h3>Frontend</h3>
          <div className="skill">
            <span>HTML</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "95%" }}>
                95%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>CSS</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "90%" }}>
                90%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>JavaScript</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "85%" }}>
                85%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>React</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "80%" }}>
                80%
              </div>
            </div>
          </div>
        </div>

        {/* Backend Skills */}
        <div className="skills-category">
          <h3>Backend</h3>
          <div className="skill">
            <span>Node.js</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "50%" }}>
                50%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>Express</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "50%" }}>
                50%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>MongoDB</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "50%" }}>
                50%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>MySQL</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "75%" }}>
                75%
              </div>
            </div>
          </div>
        </div>

        {/* Tools/Frameworks */}
        <div className="skills-category">
          <h3>Tools & Frameworks</h3>
          <div className="skill">
            <span>WordPress</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "85%" }}>
                85%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>Magento 2</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "70%" }}>
                70%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>Git</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "80%" }}>
                80%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>VSCode</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "85%" }}>
                85%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>Adobe Tools</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "60%" }}>
                60%
              </div>
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="skills-category">
          <h3>Soft Skills</h3>
          <div className="skill">
            <span>Communication & Team Collaboration</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "90%" }}>
                90%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>Problem-Solving</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "80%" }}>
                80%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>Adaptability</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "75%" }}>
                75%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>Time Management</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "80%" }}>
                80%
              </div>
            </div>
          </div>
          <div className="skill">
            <span>Multitasking</span>
            <div className="progress-bar">
              <div className="progress" style={{ width: "75%" }}>
                75%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="certifications">
        <h3>Certifications</h3>
        <ul>
          <li>Introduction to Front-End Development - Coursera - 2023</li>
          <li>
            Web Design for Beginners - Faculty of
            Information Technology, University of Moratuwa - 2022
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Skills;
