import { useState } from "react";
import { FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

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
    setSent(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSent(false);
      return;
    }

    const subject = encodeURIComponent(`Contact Request - ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );

    setErrors({});
    setSent(true);
    window.location.href = `mailto:info.devpert@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section page-hero">
      <h1>Contact</h1>
      <p>Tell us your healthcare workflow goals and we will craft a solution.</p>
      <div className="contact-wrap">
        <article className="glass-card">
          <h3>Reach Us</h3>
          <p>
            <FaLocationDot /> 402, CareTech Tower, New Delhi, India
          </p>
          <p>
            <FaPhone /> +91 98XXX 45XXX
          </p>
          <p>
            <FaEnvelope /> info.devpert@gmail.com
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

          <button type="submit">Send Message</button>
          {sent ? <p className="form-success">Opening your email app to send message.</p> : null}
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
