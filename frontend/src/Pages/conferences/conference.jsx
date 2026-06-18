import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./conference.css";
import Navbar from "../NewNavbar/Navbar";
import NewFooter from "../Footer/footer";

import eventimg from "../conferences/conclaveimage4.jpeg";
import eventimg1 from "../conferences/conclaveimage1.jpg";
import eventimg2 from "../conferences/conclaveimage4.jpg";
import eventimg3 from "../conferences/conclaveimage.jpg";
import eventimg4 from "../conferences/conclaveimg.png";
import eventimg5 from "../conferences/conclaveimg1.png";
import eventimg6 from "../conferences/conclaveimg2.png";



import brochure1 from "../../components/Events/WYNX New York Brochure.pdf";
import brochure2 from "../../components/Events/WYNx Toronto Brochure.pdf";
import brochure3 from "../../components/Events/WYNx Dubai Brochure.pdf";
import brochure4 from "../../components/Events/WYNx Paris Brocher.pdf";

/* ─── Data ──────────────────────────────────────────────────────── */

const ALL_EVENTS = [
  {
    id: "wynx-01",
    image: eventimg1,
    title: "QUANTUM Next Gen Women Leadership & Mental Health Conclave 2026",
    date: "July 20–26, 2026",
    location: "New York, USA",
    brochure: brochure1,
    rating: "4.9",
    tags: ["Leadership", "Global", "Award Winning"],
    category: "Leadership",
  },
  {
    id: "wynx-02",
    image: eventimg2,
    title: "ASCEND 2026: Rise of Next-Gen Women Leaders in Power, Purpose & Wellbeing",
    date: "November 09-15, 2026",
    location: "Toronto, Canada",
    brochure: brochure2,
    rating: "4.7",
    tags: ["Leadership", "Global", "Award Winning"],
    category: "Leadership",
  },
  {
    id: "wynx-03",
    image: eventimg3,
    title: "ARAB WOMEN Hi-RISE CONCLAVE",
    date: "November 23-29, 2026",
    location: "Dubai, UAE",
    brochure: brochure3,
    rating: "4.8",
    tags: ["Leadership", "Global Networking", "Award Winning"],
    category: "Leadership",
  },
  {
    id: "wynx-04",
    image: eventimg,
    title: "International Women's Day Conclave: A Global Movement for Women's Empowerment & Mental Wellbeing",
    date: "March 08–14, 2027",
    location: "Paris, France",
    brochure: brochure4,
    rating: "4.9",
    tags: ["Leadership", "Global", "Award Winning"],
    category: "Leadership",
  },
  {
    id: "wynx-08",
    image: eventimg,
    title: "QUANTUM Next Gen Women Leadership & Mental Health Conclave 2027",
    date: "March 08–14, 2027",
    location: "New York, USA",
    brochure: brochure4,
    rating: "4.9",
    tags: ["Leadership", "Global Networking", "Award Winning"],
    category: "Leadership",
  },
  {
    id: "wynx-05",
    image: eventimg4,
    title: "Quantum Tech Women Leadership, AI Health Conclave",
    date: "May 09-15, 2027",
    location: "Tokyo, Japan",
    rating: "4.9",
    tags: ["Innovation", "Global Networking", "Keynote Speaker"],
    category: "Innovation",
  },
  {
    id: "wynx-06",
    image: eventimg5,
    title: "Gen-Xer Women Empowerment & Mental Health Conclave",
    date: "September 05-11, 2027",
    location: "Miami/Florida, USA",
    rating: "4.9",
    tags: ["Empowerment", "Leadership", "Award Winning"],
    category: "Empowerment",
  },
  {
    id: "wynx-07",
    image: eventimg6,
    title: "ARAB WOMEN Hi-RISE CONCLAVE",
    date: "November 07-13, 2027",
    location: "Dubai, UAE",
    rating: "4.9",
    tags: ["Women Empowerment", "Leadership", "Keynote Speaker"],
    category: "Innovation",
  },
];

const CATEGORIES = ["All", "Leadership", "Innovation", "Empowerment"];

const STATS = [
  { val: "120+", lbl: "Events Hosted" },
  { val: "50K+", lbl: "Attendees" },
  { val: "30+",  lbl: "Countries" },
  { val: "200+", lbl: "Speakers" },
];

/* ─── Icon helpers ───────────────────────────────────────────────── */
function StarIcon() {
  return (
    <svg width="13" height="13" fill="#c9a84c" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
      <line x1="8"  y1="2" x2="8"  y2="6" strokeLinecap="round" />
      <line x1="3"  y1="10" x2="21" y2="10" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Event Card ────────────────────────────────────────────────── */
function TalkCard({ talk, index }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/wynxconferences/${talk.id}`);
  };

  return (
    <div className="wy-card">
      <div className="wy-card-img-wrap">
        <img src={talk.image} alt={talk.title} className="wy-card-img" />
      </div>
      <div className="wy-card-body">
        <div className="wy-card-title">{talk.title}</div>
        <div className="wy-card-meta-row">
          <span className="wy-meta-item"><CalendarIcon />{talk.date}</span>
        </div>
        <div className="wy-card-meta-row">
          <span className="wy-meta-item"><PinIcon />{talk.location}</span>
        </div>
        <div className="wy-card-tags-row">
          <span className="wy-card-rating"><StarIcon /> {talk.rating}</span>
          {talk.tags.map((tag, i) => (
            <span key={i} className="wy-card-tag">{tag}</span>
          ))}
        </div>

        {/* View Details button — full width, above action row */}
        <button className="wy-view-details-btn" onClick={handleViewDetails}>
          View Conference <ArrowIcon />
        </button>

        <div className="wy-card-actions">
          <button className="wy-action-btn wy-action-btn--outline"
            style={!talk.brochure ? { opacity: 0.4, cursor: "not-allowed" } : {}}
            onClick={() => {
              if (!talk.brochure) return;
              const link = document.createElement("a");
              link.href = talk.brochure;
              link.download = `${talk.title.slice(0, 40)}-brochure.pdf`;
              link.click();
            }}
          >   Brochure  </button>
          <button className="wy-action-btn wy-action-btn--outline"
            onClick={index === 0 ? () => navigate("/newyorkagenda2026") : undefined}
          > Agenda   </button>
          <button
            className="wy-action-btn wy-action-btn--filled"
            onClick={() => navigate("/awardsnomination")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function ConferenceEvents() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery]       = useState("");
  const [visibleCount, setVisibleCount]     = useState(6);

  const eventsRef = useRef(null);
  const navigate  = useNavigate();

  const scrollToEvents = () => {
    eventsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtered = ALL_EVENTS.filter((e) => {
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="ce-page">
      <Navbar />
      <div style={{ height: 72 }} />

      {/* ════ HERO ════ */}
      <section className="ce-hero">
        <div className="ce-hero-glow ce-hero-glow-1" />
        <div className="ce-hero-glow ce-hero-glow-2" />
        <div className="ce-hero-glow ce-hero-glow-3" />
        <div className="ce-hero-line ce-hero-line--top" />
        <div className="ce-hero-line ce-hero-line--bot" />

        <div className="ce-hero-inner">
          <h1 className="ce-hero-title">
            Explore World-Class<br />
            <span className="wy-accent">Conferences</span>
          </h1>

          <p className="ce-hero-sub">
            Explore award-winning conclaves, leadership summits and empowerment congresses
            happening across the globe.
          </p>

          <div className="ce-hero-stats">
            {STATS.map(({ val, lbl }, i, arr) => (
              <div key={lbl} style={{ display: "flex", alignItems: "center" }}>
                <div className="ce-stat">
                  <span className="ce-stat-val">{val}</span>
                  <span className="ce-stat-lbl">{lbl}</span>
                </div>
                {i < arr.length - 1 && <div className="ce-stat-divider" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ EVENTS LISTING ════ */}
      <section className="ce-events-section" ref={eventsRef} id="all-events">
        <div className="wy-container">

          <div className="ce-listing-header">
            <div>
              <div className="wy-section-eyebrow">ALL EVENTS</div>
              <h2 className="wy-section-title">
                {activeCategory === "All"
                  ? "Future Conferences"
                  : `${activeCategory} Events`}
              </h2>
            </div>

            <div className="ce-filter-pills">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`ce-pill${activeCategory === cat ? " ce-pill--active" : ""}`}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(6); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="ce-result-count">
            Showing <strong>{visible.length}</strong> of <strong>{filtered.length}</strong> events
            {activeCategory !== "All" && <span> in <em>{activeCategory}</em></span>}
          </div>

          {filtered.length === 0 ? (
            <div className="ce-empty">
              <div className="ce-empty-icon">🔍</div>
              <p>No events found for <strong>"{searchQuery}"</strong>. Try a different search.</p>
            </div>
          ) : (
            <div className="ce-talks-grid">
              {visible.map((event, i) => (
                <TalkCard key={event.id} talk={event} index={i} />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="ce-load-more-wrap">
              <button
                className="ce-load-more-btn"
                onClick={() => setVisibleCount((v) => v + 3)}
              >
                Load More Events
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <span className="ce-load-more-hint">
                {filtered.length - visibleCount} more event
                {filtered.length - visibleCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ════ WHY ATTEND BAND ════ */}
      <section className="ce-why-band">
        <div className="ce-why-inner">

          <div className="ce-why-text">
            <span className="ce-why-tagline">WHY ATTEND</span>
            <h3 className="ce-why-heading">
              Where Bold Ideas<br />
              <span className="wy-accent">Shape the Future</span>
            </h3>
            <p className="ce-why-desc">
              Our conferences bring together the world's most visionary women leaders,
              changemakers and innovators. Every event is engineered to spark
              breakthroughs — not just conversations.
            </p>
            <div className="ce-why-cta-row">
              <button className="wy-cta-primary" onClick={scrollToEvents}>
                Explore All Events
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="ce-why-link" onClick={() => navigate("/gallery")}>
                View Past Highlights
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="ce-why-cards">
            <div className="ce-why-card">
              <div className="ce-why-icon">🏆</div>
              <div className="ce-why-card-body">
                <div className="ce-why-card-title">Award-Winning Format</div>
                <div className="ce-why-card-desc">
                  Globally recognised for outstanding programme design, speaker curation
                  and delegate experience — every session is crafted to drive real impact.
                </div>
              </div>
            </div>
            <div className="ce-why-card">
              <div className="ce-why-icon">🌍</div>
              <div className="ce-why-card-body">
                <div className="ce-why-card-title">Truly Global Network</div>
                <div className="ce-why-card-desc">
                  Connect with 50,000+ delegates from 30+ countries. Build partnerships,
                  find mentors and access opportunities that transcend borders.
                </div>
              </div>
            </div>
            <div className="ce-why-card">
              <div className="ce-why-icon">🎤</div>
              <div className="ce-why-card-body">
                <div className="ce-why-card-title">200+ World-Class Speakers</div>
                <div className="ce-why-card-desc">
                  Hear from CEOs, policymakers, scientists and social innovators who are
                  actively rewriting the rules in their industries.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <NewFooter />
    </div>
  );
}