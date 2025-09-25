import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.message) errors.message = "Message is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("https://node-portfolio-contact-server.vercel.app/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.error("Error:", data);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <section className="container-xxl py-5">
      <div className="card glass p-4 p-md-5">
        <h2 className="h4 mb-4">Contact Me</h2>
        <form className="row g-3" onSubmit={handleSubmit} noValidate>
          <div className="col-12">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
          </div>

          <div className="col-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
          </div>

          <div className="col-12">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className={`form-control ${formErrors.message ? "is-invalid" : ""}`}
              value={formData.message}
              onChange={handleChange}
            />
            {formErrors.message && <div className="invalid-feedback">{formErrors.message}</div>}
          </div>

          <div className="col-12">
            <button className="btn btn-primary btn-glass" type="submit">
              Send Message
            </button>
          </div>
          {successMessage && <p className="text-success mt-2">{successMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
