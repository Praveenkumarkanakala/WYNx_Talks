import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "../Footer/WYNx_logo.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Conclaves", path: "/conferences" },
  { label: "Awards",
    dropdown: [
      { label: "Award Categories", path: "/awardcategories" },
      { label: "Award Winners", path: "/awardwinners" },
    ],
  },
  { label: "Gallery", path: "/gallery" },
  { label: "Our Addons",
    dropdown: [
      { label: "WINSPIRE Magazine", path: "https://www.winspire.live" },
      { label: "French Chronicles", path: "https://www.french-chronicles.com" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({}); // tracks which mobile accordions are open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!e.target.closest(".wynx-nav")) setMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  const toggleMobileAccordion = (label) => {
    setMobileOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <nav className={`wynx-nav${scrolled ? " wynx-nav--scrolled" : ""}`}>
      <div className="wynx-nav-inner">

        {/* Logo */}
        <a href="/" className="wynx-nav-logo">
          <div className="wynx-nav-logo-img-wrap">
            <img src={logo} alt="WYNx Logo" className="wynx-nav-logo-img" />
          </div>
          <div className="wynx-nav-logo-divider" />
          <div className="wynx-nav-logo-text-wrap">
            <span className="wynx-nav-logo-name">WYNx</span>
            <span className="wynx-nav-logo-sub">AWARD WINNING TALKS</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="wynx-nav-links">
          {navLinks.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="wynx-nav-dropdown-wrap">
                <a href={item.path} className="wynx-nav-link wynx-nav-link--has-dropdown">
                  {item.label}
                  <svg
                    className="wynx-nav-chevron"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </a>
                <div className="wynx-nav-dropdown">
                  <div className="wynx-nav-dropdown-inner">
                    {item.dropdown.map((sub) => (
                      <a key={sub.label} href={sub.path} className="wynx-nav-dropdown-item">
                        <span className="wynx-nav-dropdown-dot" aria-hidden="true" />
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.path} className="wynx-nav-link">
                {item.label}
              </a>
            )
          )}
          <button className="wynx-nav-register-btn" onClick={() => window.location.href = "/awardsnomination"} >
            Nominate Now
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`wynx-nav-hamburger${menuOpen ? " wynx-nav-hamburger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="wynx-nav-ham-line wynx-nav-ham-line--1" />
          <span className="wynx-nav-ham-line wynx-nav-ham-line--2" />
          <span className="wynx-nav-ham-line wynx-nav-ham-line--3" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`wynx-nav-drawer${menuOpen ? " wynx-nav-drawer--open" : ""}`}>
        <div className="wynx-nav-drawer-inner">
          {navLinks.map((item) =>
            item.dropdown ? (
              <div key={item.label} className="wynx-nav-drawer-accordion">
                <button
                  className={`wynx-nav-drawer-link wynx-nav-drawer-accordion-toggle${mobileOpen[item.label] ? " wynx-nav-drawer-accordion-toggle--open" : ""}`}
                  onClick={() => toggleMobileAccordion(item.label)}
                  aria-expanded={!!mobileOpen[item.label]}
                >
                  <span className="wynx-nav-drawer-arrow" aria-hidden="true">→</span>
                  {item.label}
                  <svg
                    className="wynx-nav-drawer-chevron"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`wynx-nav-drawer-subnav${mobileOpen[item.label] ? " wynx-nav-drawer-subnav--open" : ""}`}
                >
                  {item.dropdown.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.path}
                      className="wynx-nav-drawer-sublink"
                      onClick={() => setMenuOpen(false)}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.path}
                className="wynx-nav-drawer-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
          <button className="wynx-nav-register-btn wynx-nav-register-btn--mobile" onClick={() => { setMenuOpen(false); window.location.href = "/awardsnomination"; }} >
            Register Now
          </button>
        </div>
      </div>
    </nav>
  );
}