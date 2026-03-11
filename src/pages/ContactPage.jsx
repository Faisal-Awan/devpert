import { useState } from "react";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

const CONTACT_API_ENDPOINT = import.meta.env.VITE_CONTACT_API_ENDPOINT || "/api/contact";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      nextErrors.name = "Please enter a valid name (min 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      nextErrors.message = "Please enter at least 10 characters in your message.";
    }

    return nextErrors;
  };

  const onChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
    if (submitState.status !== "idle") {
      setSubmitState({ status: "idle", message: "" });
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    console.info("[ContactForm] Submit triggered", {
      nameLength: formData.name.trim().length,
      email: formData.email.trim(),
      messageLength: formData.message.trim().length,
    });

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      console.warn("[ContactForm] Validation failed", nextErrors);
      setErrors(nextErrors);
      setSubmitState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }

    if (!CONTACT_API_ENDPOINT) {
      setSubmitState({
        status: "error",
        message: "Contact API endpoint is missing. Set VITE_CONTACT_API_ENDPOINT in .env.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      console.info("[ContactForm] Sending request to backend API", {
        endpoint: CONTACT_API_ENDPOINT,
        payload,
      });

      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error("[ContactForm] Backend request failed", {
          status: response.status,
          result,
        });
        setSubmitState({
          status: "error",
          message: result.message || "Unable to send your message right now. Please try again in a moment.",
        });
        return;
      }

      console.info("[ContactForm] Backend request succeeded", result);
      setSubmitState({ status: "success", message: "Message sent successfully. We will contact you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("[ContactForm] Network error while sending message", error);
      setSubmitState({
        status: "error",
        message: "Network error while sending message. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section page-hero">
      <h1>Contact</h1>
      <p>Tell us your healthcare workflow goals and we will craft a solution.</p>
      <div className="contact-wrap">
        <article className="glass-card">
          <h3>Reach Us</h3>
          <p>
            <FaLocationDot /> DHA, Lahore
          </p>
          <p>
            <FaPhone /> +92 310 4318090
          </p>
          <p>
            <FaEnvelope /> info@devpert.com
          </p>
        </article>

        <form className="glass-card contact-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={onChange}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <small className="field-error">{errors.name}</small> : null}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={onChange}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <small className="field-error">{errors.email}</small> : null}

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="4"
            placeholder="How can we help?"
            value={formData.message}
            onChange={onChange}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? <small className="field-error">{errors.message}</small> : null}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {submitState.status === "success" ? (
            <p className="form-success">{submitState.message}</p>
          ) : null}
          {submitState.status === "error" ? <p className="field-error">{submitState.message}</p> : null}
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
