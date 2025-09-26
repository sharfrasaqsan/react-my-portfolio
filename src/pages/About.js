// About.js (updated after resignation)
import React, { memo } from "react";
import photo_dp from "../assets/images/DP.webp";
import resume from "../assets/documents/Resume.pdf";

// --- Static data kept outside to avoid re-creation on re-renders
const CAREER_ROLES = [
  {
    title: "Frontend Developer",
    org: "Oscar Wylee (Cloud Atlantic International Group)",
    place: "Sydney — Remote",
    period: "Sep 2022 – Sep 2025", // resigned
    bullets: [
      "Developed & maintained e-commerce pages with Magento 2 and WordPress.",
      "Increased organic traffic by ~30% via SEO and front-end improvements.",
      "Improved site speed by ~15% through refactors, lazy loading & image compression.",
      "Delivered mobile-first designs; boosted mobile performance by ~25%.",
      "Collaborated in Agile sprints with designers, PMs, and backend engineers.",
    ],
  },
  {
    title: "Software Engineer Intern",
    org: "KINIT Pvt Ltd",
    place: "Kinniya",
    period: "Dec 2021 – Jun 2022",
    bullets: [
      "Built reusable React components to accelerate feature delivery.",
      "Optimized performance and load time; improved overall UX.",
      "Implemented responsive, SEO-friendly UI with accessibility in mind.",
    ],
  },
];

const EDUCATION = [
  {
    title:
      "Bachelor of Information and Communication Technology (Honours), GPA 3.14",
    org: "University of Kelaniya",
    period: "2018 – 2022",
  },
  {
    title: "G.C.E. Advanced Level",
    org: "T/Kinniya Al-Aqsa College",
    period: "2014 – 2016",
  },
];

const TimelineItem = memo(function TimelineItem({
  title,
  org,
  place,
  period,
  bullets,
}) {
  return (
    <li className="mb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2">
        <strong className="me-2">{title}</strong>
        <span className="text-body-secondary small">{period}</span>
      </div>
      <div className="text-body-secondary">
        {org}
        {place ? ` | ${place}` : ""}
      </div>
      {bullets?.length > 0 && (
        <ul className="mt-2 mb-0 ps-3">
          {bullets.map((b, i) => (
            <li key={i} className="mb-1">
              {b}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});

const About = () => {
  return (
    <section className="container-xxl py-5">
      <div className="row g-4 align-items-start">
        {/* Left: photo + quick summary + resume */}
        <div className="col-12 col-lg-4">
          <div className="card glass overflow-hidden text-center p-4 d-flex align-items-center flex-column">
            <img
              src={photo_dp}
              alt="A. Mohamed Sharfiras"
              className="rounded-4 shadow-sm mb-3"
              width={200}
              height={200}
              decoding="async"
              loading="lazy"
              sizes="(max-width: 992px) 200px, 200px"
              style={{ maxWidth: "200px", height: "auto" }}
            />
            <h2 className="h5 mb-2">A. Mohamed Sharfiras</h2>
            <p className="text-body-secondary mb-2">
              Web Developer with <strong>3+ years</strong> building fast,
              intuitive, SEO-friendly applications.
            </p>
            {/* Optional status badge after resignation */}
            <span className="badge bg-primary-subtle text-primary-emphasis mb-3">
              Open to new opportunities
            </span>
            <a href={resume} download className="btn btn-primary btn-glass">
              Download Resume
            </a>
          </div>
        </div>

        {/* Right: bio/goals/background/education */}
        <div className="col-12 col-lg-8">
          <div className="card glass p-4 p-md-5">
            <h3 className="h5 mb-3">Bio &amp; Background</h3>
            <p className="mb-4">
              I started with curiosity about how websites work. Most recently, I
              worked as a <strong>Frontend Developer</strong> at{" "}
              <strong>Oscar Wylee</strong>, delivering high-performance,
              accessible UIs with strong SEO foundations.
            </p>

            <h3 className="h5 mt-2">Career Goals</h3>
            <p className="mb-4">
              I’m expanding into <strong>full-stack</strong> development with{" "}
              <strong>Node.js</strong>, <strong>Express</strong>, and{" "}
              <strong>Next.js</strong> to build scalable products. I enjoy
              collaborating in Agile teams and solving real-world problems with
              measurable impact.
            </p>

            <h3 className="h5 mt-2">Career Background</h3>
            <ul className="list-unstyled mb-4">
              {CAREER_ROLES.map((r, idx) => (
                <TimelineItem key={idx} {...r} />
              ))}
            </ul>

            <h3 className="h5 mt-2">Education</h3>
            <ul className="list-unstyled mb-0">
              {EDUCATION.map((e, idx) => (
                <li key={idx} className="mb-3">
                  <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2">
                    <strong className="me-2">{e.title}</strong>
                    <span className="text-body-secondary small">
                      {e.period}
                    </span>
                  </div>
                  <div className="text-body-secondary">{e.org}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
