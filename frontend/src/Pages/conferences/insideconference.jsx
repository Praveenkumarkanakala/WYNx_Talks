import { useParams, useNavigate } from "react-router-dom";
import { getConferenceByRegionAndId } from "./globaldata";
import "./insideconference.css";
import Navbar from "../NewNavbar/Navbar";
import Footer from "../Footer/footer";

const REGION = "north-america";
const categoryLabels = {
  "women-leadership": "Women Leadership",
  wellness: "Wellness",
  "ai-stem": "AI & STEM",
  business: "Business",
};

const pricingPlans = [
  {
    id: 1,
    badge: "WYNx Award Winning Talk + Media Coverage",
    price: "$999",
    period: "per person",
    tagline: "Award-winning talk with media coverage",
    description: "WYNx Award-Winning Talk plus Media Coverage Live Interview, 1 Night Hotel, and Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health.",
    features: ["Award-Winning Talk slot", "Live media interview coverage", "1 night hotel stay", "Peercite journal publication"],
    highlight: false,
  },
  {
    id: 2,
    badge: "Physical Speaker",
    price: "$899",
    period: "per person",
    tagline: "In-person award-winning speaker pass",
    description: "WYNx Award-Winning Talk Physical Speaker Registration with Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health.",
    features: ["Physical speaker registration", "Award-Winning Talk slot", "Peercite journal publication", "On-site networking access"],
    highlight: false,
  },
  {
    id: 3,
    badge: "Physical Keynote Speaker",
    price: "$1099",
    period: "per person",
    tagline: "Keynote speaker experience with 2-night stay",
    description: "WYNx Award-Winning Talk Physical Speaker Registration with 2 Nights Hotel Stay and Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health.",
    features: ["Physical speaker registration", "Award-Winning Talk slot", "2 nights hotel stay", "Peercite journal publication"],
    highlight: false,
  },
  {
    id: 4,
    badge: "Tour Trip",
    price: "$499",
    period: "per person",
    tagline: "Photography shoot & on-site experience",
    description: "WYNx Tour Trip with On-Site Event Photographer — capture your experience with a professional photography session at the event venue.",
    features: ["WYNx Tour Trip access", "On-site event photographer", "Professional photo shoot", "Digital photo delivery"],
    highlight: false,
  },
  {
    id: 5,
    badge: "Keynote Virtual Award Winning Talk",
    price: "$499",
    period: "per person",
    tagline: "Keynote Virtual award Winning talk + magazine cover story",
    description: "WYNx Virtual Award-Winning Talk Registration with Magazine Cover Story and Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health.",
    features: ["Virtual Award-Winning Talk", "Magazine Cover Story feature", "Peercite journal publication", "30-day recording access"],
    highlight: false,
  },
  {
    id: 6,
    badge: "Virtual Award Winning Talk",
    price: "$399",
    period: "per person",
    tagline: "Virtual speaker Award Winning Talk",
    description: "WYNx Virtual Online Speaker Registration with Abstract Talk Publication in Peercite International Journal of Women Leadership & Mental Health.",
    features: ["Virtual speaker registration", "Online session access", "Peercite journal publication", "Digital conference kit"],
    highlight: false,
  },
];

const SESSION_ICONS = ["◈", "◆", "▲", "●", "◉", "★", "◇", "▶"];

const renderBadge = (badge) => {
  if (!badge.includes("WYNx")) return badge;
  const parts = badge.split("WYNx");
  return (
    <>
      {parts[0]}WYN<span style={{ fontSize: "0.70em", verticalAlign: "middle" }}>x</span>{parts[1]}
    </>
  );
};

export default function WynxEventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const conf = getConferenceByRegionAndId(REGION, id);

  if (!conf)
    return (
      <div className="wynx-page">
        <Navbar />
        <div className="wynx-ed-notfound">
          <h2>Conference not found.</h2>
          <button
            className="wynx-ed-back-btn"
            onClick={() => navigate("/conferences")}
          >
            ← Back to Events
          </button>
        </div>
        <Footer />
      </div>
    );

  const paragraphs = conf.description
    ? conf.description.split("\n\n").filter(Boolean)
    : [];

  const row1Plans = pricingPlans.slice(0, 3);
  const row2Plans = pricingPlans.slice(3, 6);

  return (
    <div className="wynx-page">
      <Navbar />

      {/* ── HERO ── */}
      <section className="wynx-ed-hero">
        <div className="wynx-ed-hero__orb" />
        <div className="wynx-ed-hero__img-wrap">
          <img src={conf.image} alt={conf.title} className="wynx-ed-hero__img" />
          <div className="wynx-ed-hero__overlay" />
        </div>
        <div className="wynx-ed-hero__accent-bar" />

        <div className="wynx-ed-hero__content">
          <div className="wynx-ed-hero__top-row">
            <div className="wynx-ed-hero__title-block">
              <div className="wynx-ed-hero__eyebrow">
                <span className="wynx-ed-hero__eyebrow-line" />
                <span className="wynx-ed-hero__cat">{categoryLabels[conf.category]}</span>
              </div>
              <h1 className="wynx-ed-hero__title">{conf.title}</h1>
              <div className="wynx-ed-hero__meta">
                <div className="wynx-ed-hero__meta-item">
                  <span className="wynx-ed-hero__meta-label">📅 Date</span>
                  <span className="wynx-ed-hero__meta-value">{conf.date}</span>
                </div>
                <div className="wynx-ed-hero__meta-div" />
                <div className="wynx-ed-hero__meta-item">
                  <span className="wynx-ed-hero__meta-label">📍 Location</span>
                  <span className="wynx-ed-hero__meta-value">{conf.location}</span>
                </div>
                <div className="wynx-ed-hero__meta-div" />
                <div className="wynx-ed-hero__meta-item">
                  <span className="wynx-ed-hero__meta-label">🏷️ Category</span>
                  <span className="wynx-ed-hero__meta-value">{categoryLabels[conf.category]}</span>
                </div>
              </div>
            </div>

            <div className="wynx-ed-cta-card">
              <p className="wynx-ed-cta-card__label">Secure your spot</p>
              <h3 className="wynx-ed-cta-card__title">{conf.title}</h3>
              <div className="wynx-ed-cta-card__details">
                <div className="wynx-ed-cta-card__row">
                  <span className="wynx-ed-cta-card__row-label">📅 Date</span>
                  <span className="wynx-ed-cta-card__row-val">{conf.date}</span>
                </div>
                <div className="wynx-ed-cta-card__row">
                  <span className="wynx-ed-cta-card__row-label">📍 Venue</span>
                  <span className="wynx-ed-cta-card__row-val">{conf.location}</span>
                </div>
                <div className="wynx-ed-cta-card__row">
                  <span className="wynx-ed-cta-card__row-label">🏷️ Category</span>
                  <span className="wynx-ed-cta-card__row-val">{categoryLabels[conf.category]}</span>
                </div>
              </div>
              <button className="wynx-ed-cta-card__btn" onClick={() => navigate("/awardsnomination")}>
                Register Now
              </button>
              <button
                className="wynx-ed-cta-card__btn wynx-ed-cta-card__btn--outline"
                onClick={() => navigate("/conferences")}
              >
                ← Browse All Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="wynx-ed-body">
        <div className="wynx-ed-body__inner">

          {/* ── ABOUT ── */}
          <section className="wynx-ed-section">
            <h2 className="wynx-ed-section__heading">About This Conference</h2>
            <div className="wynx-ed-section__paragraphs">
              {paragraphs.map((para, i) => (
                <p className="wynx-ed-section__text" key={i}>{para}</p>
              ))}
            </div>
            {conf.fullDescription && (
              <div className="wynx-ed-theme-line">
                <span className="wynx-ed-theme-line__label">Theme</span>
                <p className="wynx-ed-theme-line__text">{conf.fullDescription}</p>
              </div>
            )}
          </section>

          {/* ── PROGRAM SESSIONS & TOPICS ── */}
          {conf.themes && conf.themes.length > 0 && (
            <section className="wynx-ed-section wynx-ed-section--sessions">

              {/* Section header */}
              <div className="wynx-ed-sessions__header">
                <h2 className="wynx-ed-sessions__title">Program Sessions &amp; Topics</h2>
                <p className="wynx-ed-sessions__sub">
                  Explore the key focus areas and session themes covered at this conference.
                </p>
              </div>

              {/* Topics grid — clean cards, no numbers */}
              <div className="wynx-ed-topics-grid">
                {conf.themes.map((theme, i) => (
                  <div key={i} className="wynx-ed-topic-card">
                    <div className="wynx-ed-topic-card__body">
                      <span className="wynx-ed-topic-card__icon">
                        {SESSION_ICONS[i % SESSION_ICONS.length]}
                      </span>
                      <span className="wynx-ed-topic-card__label">{theme}</span>
                    </div>
                    <div className="wynx-ed-topic-card__bar" />
                  </div>
                ))}
              </div>

            </section>
          )}

        </div>

        {/* ── PRICING ── */}
        <section className="wynx-ed-pricing">
          <div className="wynx-ed-pricing__inner">
            <div className="wynx-ed-pricing__header-block">
              <div className="wynx-ed-pricing__eyebrow">
                <span className="wynx-ed-pricing__eyebrow-line" />
                <span className="wynx-ed-pricing__eyebrow-text">Registration</span>
                <span className="wynx-ed-pricing__eyebrow-line" />
              </div>
              <h2 className="wynx-ed-pricing__heading">Registration Packages</h2>
              <p className="wynx-ed-pricing__sub">
                Choose the pass that fits your goals — every ticket is a step toward transformation.
              </p>
            </div>

            <div className="wynx-ed-pricing__grid">
              {row1Plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`wynx-ed-price-card${plan.highlight ? " wynx-ed-price-card--highlight" : ""}`}
                >
                  {plan.highlight && (
                    <span className="wynx-ed-price-card__popular">Most Popular</span>
                  )}
                  <span className="wynx-ed-price-card__badge">{renderBadge(plan.badge)}</span>
                  <div className="wynx-ed-price-card__price-row">
                    <span className="wynx-ed-price-card__price">{plan.price}</span>
                    <span className="wynx-ed-price-card__period">{plan.period}</span>
                  </div>
                  <p className="wynx-ed-price-card__tagline">{plan.tagline}</p>
                  <p className="wynx-ed-price-card__desc">{plan.description}</p>
                  <ul className="wynx-ed-price-card__features">
                    {plan.features.map((f, i) => (
                      <li key={i} className="wynx-ed-price-card__feature">
                        <span className="wynx-ed-price-card__check">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="wynx-ed-price-card__btn"
                    onClick={() => navigate("/awardsnomination")}
                  >
                    {plan.price === "Custom" ? "Contact Us" : "Get This Pass"}
                  </button>
                </div>
              ))}
            </div>

            <div className="wynx-ed-pricing__grid-row2">
              {row2Plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`wynx-ed-price-card${plan.highlight ? " wynx-ed-price-card--highlight" : ""}`}
                >
                  {plan.highlight && (
                    <span className="wynx-ed-price-card__popular">Most Popular</span>
                  )}
                  <span className="wynx-ed-price-card__badge">{renderBadge(plan.badge)}</span>
                  <div className="wynx-ed-price-card__price-row">
                    <span className="wynx-ed-price-card__price">{plan.price}</span>
                    <span className="wynx-ed-price-card__period">{plan.period}</span>
                  </div>
                  <p className="wynx-ed-price-card__tagline">{plan.tagline}</p>
                  <p className="wynx-ed-price-card__desc">{plan.description}</p>
                  <ul className="wynx-ed-price-card__features">
                    {plan.features.map((f, i) => (
                      <li key={i} className="wynx-ed-price-card__feature">
                        <span className="wynx-ed-price-card__check">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="wynx-ed-price-card__btn"
                    onClick={() => navigate("/awardsnomination")}
                  >
                    {plan.price === "Custom" ? "Contact Us" : "Get This Pass"}
                  </button>
                </div>
              ))}
            </div>

            <hr className="wynx-ed-pricing__bottom-sep" />
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}