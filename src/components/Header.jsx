import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaEnvelope,
  FaInstagram,
  FaLinkedin,
  FaLocationDot,
  FaMoon,
  FaPhone,
  FaSun,
  FaTiktok,
  FaXTwitter,
  FaXmark,
} from "react-icons/fa6";
import { navItems } from "../data/siteData";
import logo from "../images/logo.png";


function Header({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-main-row">
        <div className="logo">
          
          <a href="/"  >
  <img src={logo} alt="DevPert Logo" />
</a>
          

          {/* DEVPERT */}
          </div>
        <nav className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-btn"
            onClick={onThemeToggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          <button
            type="button"
            className="menu-btn"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* <div className="header-info-strip">
        <p>
          DevPert is a dynamic, full-service software development company
          specializing in Generative AI, Web, and Mobile solutions. We work
          with a diverse range of clients, from emerging startups to large
          enterprise organizations with over 3,000 employees.
        </p>
        <h4>Contact us</h4>
        <div className="header-contact-links">
          <a href="mailto:info@devpert.com">
            <FaEnvelope /> info@devpert.com
          </a>
          <a href="tel:+923104318090">
            <FaPhone /> +92 310 4318090
          </a>
          <span>
            <FaLocationDot /> DHA, Lahore
          </span>
        </div>
        <div className="social-links header-social-links">
          <a href="https://www.instagram.com/devpert" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com/@devpert" target="_blank" rel="noreferrer" aria-label="TikTok">
            <FaTiktok />
          </a>
          <a href="https://www.linkedin.com/company/devpert" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://x.com/devpert" target="_blank" rel="noreferrer" aria-label="X (Twitter)">
            <FaXTwitter />
          </a>
        </div>
      </div> */}
    </header>
  );
}

export default Header;
