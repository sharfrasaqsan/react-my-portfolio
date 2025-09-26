// Skills.js
const FRONTEND = [
  { name: "HTML", value: 95 },
  { name: "CSS", value: 90 },
  { name: "JavaScript", value: 85 },
  { name: "React", value: 80 },
];
const BACKEND = [
  { name: "Node.js", value: 50 },
  { name: "Express", value: 50 },
  { name: "MongoDB", value: 50 },
  { name: "MySQL", value: 75 },
];
const TOOLS = ["WordPress", "Magento 2", "Git", "Firebase", "Adobe Tools"];
const SOFT = [
  "Communication",
  "Problem-Solving",
  "Adaptability",
  "Time Management",
  "Multitasking",
];

const Skills = () => {
  return (
    <section className="container-xxl py-5">
      <div className="card glass p-4 p-md-5">
        <h2 className="h4 mb-4">Skills Overview</h2>

        <div className="row g-4">
          <div className="col-md-6">
            <h5>Frontend</h5>
            {FRONTEND.map((s, i) => (
              <div key={i} className="mb-3">
                <span className="d-block small fw-semibold">{s.name}</span>
                <div className="progress glass" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${s.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-6">
            <h5>Backend</h5>
            {BACKEND.map((s, i) => (
              <div key={i} className="mb-3">
                <span className="d-block small fw-semibold">{s.name}</span>
                <div className="progress glass" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${s.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <h5 className="mt-4">Tools & Frameworks</h5>
        <ul className="list-inline">
          {TOOLS.map((tool, idx) => (
            <li
              key={idx}
              className="badge bg-primary-subtle text-primary-emphasis me-2 mb-2"
            >
              {tool}
            </li>
          ))}
        </ul>

        <h5 className="mt-4">Soft Skills</h5>
        <ul className="list-inline">
          {SOFT.map((soft, idx) => (
            <li
              key={idx}
              className="badge bg-secondary-subtle text-dark-emphasis me-2 mb-2"
            >
              {soft}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <h5>Certifications</h5>
          <ul>
            <li>Introduction to Front-End Development - Coursera - 2023</li>
            <li>Web Design for Beginners - University of Moratuwa - 2022</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
