import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <h4>Address</h4>
          <p>
            <FaLocationDot />
            402, CareTech Tower, New Delhi, India
          </p>
          <p>
            <FaPhone /> +91 98XXX 45XXX
          </p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li>Healthcare IT Consulting</li>
            <li>Medical Order Automation</li>
            <li>Custom Clinical Software</li>
          </ul>
        </div>
        <div>
          <h4>Social</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="X (Twitter)">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-punch">Code Better. Care Faster. Heal Smarter.</div>
      <p className="copyright">© 2026 DEVPERT IT Solutions</p>
    </footer>
  );
}

export default Footer;
