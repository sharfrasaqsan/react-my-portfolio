// Skills.js (updated to reflect CV)
import React from "react";

// --- Static data (no re-creation on re-renders)
const FRONTEND = [
  { name: "React.js", value: 85 },
  { name: "Next.js", value: 75 },
  { name: "JavaScript (ES6+)", value: 85 },
  { name: "TypeScript", value: 65 },
  { name: "HTML5", value: 95 },
  { name: "CSS3", value: 90 },
  { name: "jQuery", value: 70 },
  { name: "Bootstrap", value: 85 },
];

const BACKEND_CLOUD = [
  { name: "Firebase (Auth, Firestore, Hosting, CF)", value: 75 },
  { name: "Firestore / Realtime DB", value: 70 },
  { name: "MongoDB", value: 60 },
  { name: "MySQL", value: 75 },
  { name: "RESTful APIs", value: 80 },
];

const CMS = ["WordPress", "Magento 2", "WooCommerce"];

const TOOLS_COLLAB = [
  "Git",
  "GitHub",
  "Bitbucket",
  "Vite",
  "Jira",
  "CI/CD (GitHub Actions)",
];

const SEO_ANALYTICS = [
  "On-Page SEO",
  "Technical SEO",
  "Google Analytics",
  "Search Console",
  "Ahrefs",
];

const UX_QUALITY = [
  "Responsive Web Design",
  "Cross-Browser Testing",
  "UI/UX Optimization",
];

const LANGUAGES_SPOKEN = ["English", "Sinhala", "Tamil"];

const CERTS = [
  "Introduction to Front-End Development — Meta (May 2023)",
  "ReactJS for Beginners — SkillUp (Sep 2022)",
  "JavaScript for Beginners — SkillUp (Sep 2022)",
  "Web Design for Beginners — CODL, University of Moratuwa (Aug 2022)",
];

const SectionHeader = ({ children }) => <h5 className="mt-4">{children}</h5>;

const SkillBar = ({ label, value, color = "primary" }) => (
  <div className="mb-3">
    <span className="d-block small fw-semibold">{label}</span>
    <div className="progress glass" style={{ height: "8px" }}>
      <div
        className={`progress-bar bg-${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const BadgeList = ({ items, variant = "primary" }) => (
  <ul className="list-inline">
    {items.map((item, idx) => (
      <li
        key={idx}
        className={`badge bg-${variant}-subtle text-${variant}-emphasis me-2 mb-2`}
      >
        {item}
      </li>
    ))}
  </ul>
);

const Skills = () => {
  return (
    <section className="container-xxl py-5">
      <div className="card glass p-4 p-md-5">
        <h2 className="h4 mb-4">Skills Overview</h2>

        <div className="row g-4">
          <div className="col-md-6">
            <SectionHeader>Frontend</SectionHeader>
            {FRONTEND.map((s, i) => (
              <SkillBar
                key={i}
                label={s.name}
                value={s.value}
                color="primary"
              />
            ))}
          </div>

          <div className="col-md-6">
            <SectionHeader>Databases &amp; Cloud / Backend</SectionHeader>
            {BACKEND_CLOUD.map((s, i) => (
              <SkillBar
                key={i}
                label={s.name}
                value={s.value}
                color="success"
              />
            ))}
          </div>
        </div>

        <SectionHeader>CMS</SectionHeader>
        <BadgeList items={CMS} variant="primary" />

        <SectionHeader>Tools &amp; Collaboration</SectionHeader>
        <BadgeList items={TOOLS_COLLAB} variant="primary" />

        <SectionHeader>SEO &amp; Analytics</SectionHeader>
        <BadgeList items={SEO_ANALYTICS} variant="primary" />

        <SectionHeader>Quality &amp; UX</SectionHeader>
        <BadgeList items={UX_QUALITY} variant="secondary" />

        <SectionHeader>Languages</SectionHeader>
        <BadgeList items={LANGUAGES_SPOKEN} variant="secondary" />

        <SectionHeader>Certifications</SectionHeader>
        <ul className="mb-0">
          {CERTS.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Skills;
