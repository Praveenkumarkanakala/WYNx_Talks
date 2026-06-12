import React, { useState } from "react";
import "./footer.css";
import logo from "./WYNx_logo.png";

const DropdownLink = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        className="wynx-footer-links-anchor"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          font: "inherit",
        }}
      >
        {item.label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          style={{
            listStyle: "none",
            margin: "6px 0 0 0",
            padding: "8px 0",
            background: "#0f2019",
            border: "1px solid rgba(200,146,42,0.2)",
            borderRadius: "8px",
            minWidth: "180px",
          }}
        >
          {item.submenu.map((sub) => (
            <li key={sub.label}>
              <a
                href={sub.href}
                className="wynx-footer-links-anchor"
                style={{ display: "block", padding: "6px 16px" }}
              >
                {sub.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email.trim()) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About us", href: "/about" },
    { label: "Conclaves", href: "/conferences" },
    { label: "Gallery", href: "/gallery" },
    { label: "Awards", href: "/awardcategories" },
    { label: "Register", href: "/awardsnomination" },
  ];

  return (
    <div className="wynx-footer-root">

      {/* ── Newsletter Banner ── */}
      <div className="wynx-footer-newsletter">
        <div className="wynx-footer-newsletter-left">
          <div className="wynx-footer-newsletter-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div>
            <div className="wynx-footer-newsletter-title">Subscribe to Newsletter</div>
            <div className="wynx-footer-newsletter-sub">Stay updated with latest talks &amp; events</div>
          </div>
        </div>
        <input
          className="wynx-footer-newsletter-input"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
        />
        <button className="wynx-footer-newsletter-btn" onClick={handleSubscribe}>
          Subscribe
        </button>
      </div>

      {/* ── Main Footer ── */}
      <footer className="wynx-footer-main">
        <div className="wynx-footer-container">
          <div className="wynx-footer-grid">

            {/* Col 1 — Brand */}
            <div className="wynx-footer-col">
              <div className="wynx-footer-brand">
                <div className="wynx-footer-logo-img-wrap">
                  <img src={logo} alt="WYNx Logo" className="wynx-footer-logo-img" />
                </div>
                <div className="wynx-footer-brand-divider" />
                <div className="wynx-footer-brand-name-wrap">
                  <span className="wynx-footer-brand-name">WYNx</span>
                  <span className="wynx-footer-brand-tagline">Award Winning Talks</span>
                </div>
              </div>

              <p className="wynx-footer-brand-desc">
                The world's most celebrated conference for breakthrough thinkers, visionary leaders, and award-winning speakers. Inspire. Connect. Transform.
              </p>

              <div className="wynx-footer-socials">
                <a href="https://www.facebook.com/wynglobalconferences/" aria-label="Facebook" className="wynx-footer-social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a href="https://x.com/WYNxTalks" aria-label="Twitter" className="wynx-footer-social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/wynxtalks/" aria-label="LinkedIn" className="wynx-footer-social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/wynxtalks/" aria-label="Instagram" className="wynx-footer-social-link">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2 — Address */}
            <div className="wynx-footer-col">
              <h4 className="wynx-footer-col-title">Address</h4>
              <ul className="wynx-footer-address-list">
                <li className="wynx-footer-address-item">
                  <span className="wynx-footer-address-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span className="wynx-footer-address-text">
                    BLVD Heights, Dubai Opera District,<br />Dubai, United Arab Emirates.
                  </span>
                </li>
                <li className="wynx-footer-address-item">
                  <span className="wynx-footer-address-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <span className="wynx-footer-address-text">contact@wynxtalks.com</span>
                </li>
                <li className="wynx-footer-address-item">
                  <span className="wynx-footer-address-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.4 3.13 2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.51-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  <span className="wynx-footer-address-text">+1 (716) 217-1471</span>
                </li>
              </ul>
            </div>

            {/* Col 3 — Quick Links */}
            <div className="wynx-footer-col">
              <h4 className="wynx-footer-col-title">Quick Links</h4>
              <ul className="wynx-footer-links-list">
                {quickLinks.map((l) => (
                  <li key={l.label} className="wynx-footer-links-item">
                    {l.submenu ? (
                      <DropdownLink item={l} />
                    ) : (
                      <a href={l.href} className="wynx-footer-links-anchor">{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Get Involved */}
            <div className="wynx-footer-col">
              <h4 className="wynx-footer-col-title">Get Involved</h4>
              <div className="wynx-footer-involve-card">
                <div className="wynx-footer-involve-bar" />
                <p className="wynx-footer-involve-text">
                  Ready to take your conference experience global and share your voice with the world?
                </p>
                <a href="/contact" className="wynx-footer-involve-btn">
                  Contact Us
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="wynx-footer-bottom">
            <p className="wynx-footer-copyright">
              © 2024 All Rights Reserved. Developed By{" "}
              <a href="#" className="wynx-footer-copyright-link">WYNx Award Winning Talks</a>
            </p>
            <div className="wynx-footer-bottom-links">
              <a href="#" className="wynx-footer-bottom-link">Privacy Policy</a>
              <span className="wynx-footer-bottom-sep">·</span>
              <a href="#" className="wynx-footer-bottom-link">Terms &amp; Conditions</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;