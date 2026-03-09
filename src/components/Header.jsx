import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaMoon, FaSun, FaXmark } from "react-icons/fa6";
import { navItems } from "../data/siteData";

function Header({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="logo">DEVPERT</div>
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
    </header>
  );
}

export default Header;
