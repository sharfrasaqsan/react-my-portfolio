import React, { useEffect, useMemo, useRef, useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [sending, setSending] = useState(false);
  const abortRef = useRef(null);

  const validateForm = useMemo(
    () => (data) => {
      const errors = {};
      if (!data.name) errors.name = "Name is required";
      if (!data.email) errors.email = "Email is required";
      if (!data.message) errors.message = "Message is required";
      return errors;
    },
    []
  );

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  useEffect(() => {
    const t = setTimeout(() => setFormErrors(validateForm(formData)), 200);
    return () => clearTimeout(t);
  }, [formData, validateForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    // abort previous request if any
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setSending(true);
    setSuccessMessage("");
    try {
      const response = await fetch(
        "https://node-portfolio-contact-server.vercel.app/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          signal: abortRef.current.signal,
        }
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Failed to send");

      setSuccessMessage("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({});
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error sending message:", err);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="container-xxl py-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <h2 className="h3 mb-3">Contact Me</h2>
      </div>

      <form className="row g-3" onSubmit={handleSubmit} noValidate>
        <div className="col-12">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={handleChange}
            disabled={sending}
          />
          {formErrors.name && (
            <div className="invalid-feedback">{formErrors.name}</div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
            disabled={sending}
          />
          {formErrors.email && (
            <div className="invalid-feedback">{formErrors.email}</div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className={`form-control ${formErrors.message ? "is-invalid" : ""}`}
            value={formData.message}
            onChange={handleChange}
            disabled={sending}
          />
          {formErrors.message && (
            <div className="invalid-feedback">{formErrors.message}</div>
          )}
        </div>

        <div className="col-12">
          <button
            className="btn btn-primary btn-glass"
            type="submit"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </div>
        {successMessage && (
          <p className="text-success mt-2">{successMessage}</p>
        )}
      </form>
    </section>
  );
};

export default Contact;
