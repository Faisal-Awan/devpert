import {
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { services } from "../data/siteData";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-company-block">
          <p>
            DevPert is a dynamic, full-service software development company
            specializing in Generative AI, Web, and Mobile solutions. We work
            with a diverse range of clients, from emerging startups to large
            enterprise organizations with over 3,000 employees.
          </p>

          <div className="social-links footer-social-links">
            <a href="https://www.instagram.com/devpert" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.tiktok.com/@devpert" target="_blank" rel="noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="https://www.linkedin.com/company/devpert-solutions/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://x.com/devpert" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
              <FaXTwitter />
            </a>
          </div>
        </div>

        <div>
          <h4>Solutions</h4>
          <ul>
            {services.map((service) => (
              <li key={service.title}>{service.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Quick Contact</h4>
          <p>
            <FaLocationDot />
            DHA, Lahore
          </p>
          <p>
            <FaPhone /> +92 310 4318090
          </p>
          <p>
            <FaEnvelope /> info@devpert.com
          </p>
        </div>
      </div>
      <div className="footer-punch">Code Better. Care Faster. Heal Smarter.</div>
      <p className="copyright">© 2026 DEVPERT IT Solutions</p>
    </footer>
  );
}

export default Footer;
