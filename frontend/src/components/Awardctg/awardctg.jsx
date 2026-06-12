import { useState } from "react";
import "./awardctg.css";
import Navbar from "../../Pages/NewNavbar/Navbar";
// import Navbar from "../Navbar/navbar";
import NewFooter from "../../Pages/Footer/footer";
import heroBg from "./awardimg.png"; // Image 1 — the gold stars bg

const CATEGORIES = [
  {
    id: 1,
    title: "Champion of Resilient Leadership",
    items: [
      "Crisis Management & Adaptability",
      "Emotional Intelligence & Mental Toughness",
      "Transformational & Visionary Leadership",
    ],
  },
  {
    id: 2,
    title: "Architect of Inclusive Leadership Cultures",
    items: [
      "Diversity, Equity, and Inclusion in Leadership",
      "Fostering a Sense of Belonging in Teams",
      "Inclusive Decision-Making for Organizational Growth",
      "Leading with Cultural Intelligence",
    ],
  },
  {
    id: 3,
    title: "Innovator in Workplace Wellness Strategies",
    items: [
      "Integrating Mental Health into Corporate Policies",
      "Holistic Approaches to Employee Well-Being",
      "Leveraging Technology for Workplace Wellness",
      "Creating Sustainable Work-Life Balance Programs",
    ],
  },
  {
    id: 4,
    title: "Digital Transformation in Mental Health Leadership",
    items: [
      "AI and Technology in Mental Health Support",
      "Data-Driven Insights for Employee Well-Being",
      "Remote Work and Digital Wellness Strategies",
      "Leveraging Apps and Platforms for Mental Health",
    ],
  },
  {
    id: 5,
    title: "Pioneering People-First Leadership",
    items: [
      "Empathy-Driven Decision Making",
      "Cultivating High-Trust Work Environments",
      "Balancing Productivity with Well-Being",
      "Empowering Teams Through Active Listening",
    ],
  },
  {
    id: 6,
    title: "Sustainability Champion in Workplace Wellness",
    items: [
      "Long-Term Well-Being Programs for Employees",
      "Eco-Friendly Work Environments and Mental Health",
      "Sustainable Productivity Without Burnout",
      "Creating Wellness Focused Leadership Models",
    ],
  },
  {
    id: 7,
    title: "Trailblazer in Stress and Burnout Prevention",
    items: [
      "Recognizing Early Signs of Workplace Burnout",
      "Proactive Strategies for Stress Management",
      "Building a Culture of Psychological Safety",
      "Redefining Success Without Overworking",
    ],
  },
  {
    id: 8,
    title: "Collaborative Excellence in Mental Health Solutions",
    items: [
      "Cross-Industry Partnerships for Mental Health",
      "Team-Based Approaches to Employee Support",
      "Leveraging Community Resources for Workplace Wellness",
      "Encouraging Peer Support Networks",
    ],
  },
  {
    id: 9,
    title: "Visionary in Leadership and Mental Health Advocacy",
    items: [
      "Championing Mental Health in Executive Leadership",
      "Breaking Stigmas Around Workplace Mental Health",
      "Encouraging Open Conversations About Well-Being",
    ],
  },
  {
    id: 10,
    title: "Next-Gen Leadership Advocate",
    items: [
      "Developing Future Leaders with Emotional Intelligence",
      "Bridging the Gap Between Generations in Leadership",
      "Embracing Change and Innovation in Leadership",
      "Redefining Leadership for a Dynamic Workforce",
    ],
  },
];

export default function AwardCategoriesPage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="ac-root">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="ac-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="ac-hero-overlay" />
        <div className="ac-hero-streak ac-hero-streak--1" />
        <div className="ac-hero-streak ac-hero-streak--2" />
        <div className="ac-hero-streak ac-hero-streak--3" />

        <div className="ac-hero-content">
          <h1 className="ac-hero-title">
            <span className="ac-title-award">Award</span>
            <span className="ac-title-separator"> </span>
            <span className="ac-title-categories">Categories</span>
          </h1>
          <p className="ac-hero-sub">
            Celebrating excellence across every dimension of human achievement.<br />
            Ten prestigious categories. One transformational stage.
          </p>
          <div className="ac-hero-badges">
            <span className="ac-hero-badge"><span className="ac-badge-num">10</span> Categories</span>
            <span className="ac-hero-badge-sep" />
            <span className="ac-hero-badge"><span className="ac-badge-num">120+</span> Awards</span>
            <span className="ac-hero-badge-sep" />
            <span className="ac-hero-badge"><span className="ac-badge-num">30+</span> Countries</span>
          </div>
        </div>

        <div className="ac-hero-bottom-fade" />
      </section>

      {/* ═══ CATEGORIES GRID ═══ */}
      <section className="ac-grid-section">
        <div className="ac-container">
          <div className="ac-section-head">
            <div className="ac-section-ornament">
              <span className="ac-orn-line" /><span className="ac-orn-diamond">◆</span><span className="ac-orn-line" />
            </div>
            <h2 className="ac-section-title">Explore All Categories</h2>
            <p className="ac-section-sub">Click any category to learn more about the recognition criteria and nomination process.</p>
          </div>

          <div className="ac-categories-grid">
            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                className={`ac-cat-card${hovered === cat.id ? " ac-cat-card--hovered" : ""}`}
                style={{ "--delay": `${i * 0.06}s` }}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Number badge */}
                <div className="ac-cat-num">
                  {String(cat.id).padStart(2, "0")}
                </div>

                <h3 className="ac-cat-title">{cat.title}</h3>

                <ul className="ac-cat-items">
                  {cat.items.map((item, j) => (
                    <li key={j} className="ac-cat-item">
                      <span className="ac-cat-item-bar" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Hover glow corners */}
                <div className="ac-cat-corner ac-cat-corner--tl" />
                <div className="ac-cat-corner ac-cat-corner--br" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="ac-cta-section">
        <div className="ac-container">
          <div className="ac-cta-inner">
            <div className="ac-cta-glow" />
            <div className="ac-cta-stars">
              <span className="ac-cta-star ac-cta-star--1">✦</span>
              <span className="ac-cta-star ac-cta-star--2">✦</span>
              <span className="ac-cta-star ac-cta-star--3">✦</span>
            </div>
            <p className="ac-cta-eyebrow">Ready to be recognised?</p>
            <h2 className="ac-cta-title">Submit Your Nomination Today</h2>
            <p className="ac-cta-sub">
              Join the world's most celebrated community of award-winning leaders, speakers and change-makers.
            </p>
            <div className="ac-cta-actions">
              <button className="ac-cta-primary" onClick={() => window.location.href = "/awardsnomination"}>
                Nominate Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="ac-cta-secondary">Download Brochure</button>
            </div>
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}