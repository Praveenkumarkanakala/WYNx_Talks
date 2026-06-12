import { useState } from "react";
import "./winner.css";
// import Navbar from "../Navbar/navbar";
import Navbar from "../../Pages/NewNavbar/Navbar";
import NewFooter from "../../Pages/Footer/footer";

const awardCategories = [
  { id: 1,  icon: '👔', label: 'BUSINESS, ECONOMIC &\nENTREPRENEURIAL ACHIEVEMENT' },
  { id: 2,  icon: '🕊️', label: 'CONTRIBUTION TO CHILDREN,\nWORLD PEACE & HUMAN RIGHTS' },
  { id: 3,  icon: '🎤', label: 'POLITICAL, LEADER AND/OR\nGOVERNMENTAL AFFAIRS' },
  { id: 4,  icon: '🤝', label: 'HUMANITARIAN AND/OR\nVOLUNTARY LEADERSHIP' },
  { id: 5,  icon: '🎓', label: 'ACADEMIC LEADERSHIP\nAND/OR ACCOMPLISHMENT' },
  { id: 6,  icon: '⚛️', label: 'SCIENTIFIC AND/OR\nTECHNOLOGICAL DEVELOPMENT' },
  { id: 7,  icon: '🎨', label: 'CULTURAL ACHIEVEMENT' },
  { id: 8,  icon: '🏅', label: 'PERSONAL IMPROVEMENT\nAND/OR ACCOMPLISHMENT' },
  { id: 9,  icon: '🌿', label: 'MORAL AND/OR\nENVIRONMENTAL LEADERSHIP' },
  { id: 10, icon: '⚕️', label: 'MEDICAL INNOVATION' },
];

function AwardCategoryRow({ icon, label, hovered, onEnter, onLeave, delay }) {
  return (
    <div
      className={`aw-cat-row${hovered ? " aw-cat-row--hovered" : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ '--delay': delay }}
    >
      {/* Corner accents */}
      <div className="aw-corner aw-corner--tl" />
      <div className="aw-corner aw-corner--br" />

      {/* Gold medal */}
      <div className="aw-medal">
        <div className="aw-medal-outer">
          <div className="aw-medal-inner">
            <span className="aw-medal-icon">{icon}</span>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="aw-banner">
        <span className="aw-banner-bar" />
        <span className="aw-banner-label">{label}</span>
        {hovered && (
          <svg className="aw-banner-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default function AwardWinners() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="aw-root">
      <Navbar />

      {/* ═══ HERO — unchanged ═══ */}
      <section className="aw-hero">
        <div className="aw-hero-overlay" />
        <div className="aw-hero-streak aw-hero-streak--1" />
        <div className="aw-hero-streak aw-hero-streak--2" />
        <div className="aw-hero-streak aw-hero-streak--3" />

        <div className="aw-hero-content">
          <div className="aw-hero-ornament">
            <span className="aw-orn-line" />
            <span className="aw-orn-diamond">◆</span>
            <span className="aw-orn-line aw-orn-line--rev" />
          </div>

          <p className="aw-hero-eyebrow">Celebrating Excellence</p>

          <h1 className="aw-hero-title">
            <span className="aw-title-gold">Award</span>{" "}
            <span className="aw-title-white">Winners</span>
          </h1>

          <p className="aw-hero-sub">
            Honoring the visionaries, leaders &amp; trailblazers who shape our world.<br />
            Ten prestigious categories. One transformational stage.
          </p>

          <div className="aw-hero-badges">
            <span className="aw-hero-badge"><span className="aw-badge-num">10</span> Categories</span>
            <span className="aw-badge-sep" />
            <span className="aw-hero-badge"><span className="aw-badge-num">120+</span> Awards</span>
            <span className="aw-badge-sep" />
            <span className="aw-hero-badge"><span className="aw-badge-num">30+</span> Countries</span>
          </div>
        </div>

        <div className="aw-hero-bottom-fade" />
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="aw-grid-section">
        <div className="aw-container">

          <div className="aw-section-head">
            <div className="aw-section-ornament">
              <span className="aw-orn-line" />
              <span className="aw-orn-diamond">◆</span>
              <span className="aw-orn-line aw-orn-line--rev" />
            </div>
            <h2 className="aw-section-title">Award Nominated Speakers</h2>
            <p className="aw-section-sub">
              Explore our ten prestigious categories honouring the boldest voices and transformational leaders of our era.
            </p>
          </div>

          <div className="aw-categories-grid">
            {awardCategories.map((cat, i) => (
              <AwardCategoryRow
                key={cat.id}
                icon={cat.icon}
                label={cat.label}
                hovered={hovered === cat.id}
                onEnter={() => setHovered(cat.id)}
                onLeave={() => setHovered(null)}
                delay={`${0.05 + i * 0.05}s`}
              />
            ))}
          </div>

        </div>
      </section>

      <NewFooter />
    </div>
  );
}