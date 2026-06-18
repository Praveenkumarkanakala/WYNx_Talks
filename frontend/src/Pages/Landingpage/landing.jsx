import { useState } from "react";
import "./landing.css";
import Navbar from "../NewNavbar/Navbar";      
import NewFooter from "../Footer/footer";
import heroimg from "./Heroimage.png";
import { useNavigate } from "react-router-dom";

import eventimg from "../conferences/conclaveimage4.jpg";
import eventimg1 from "../conferences/conclaveimage1.jpg";
import eventimg2 from "../conferences/conclaveimage.jpg";

/* ─── Speaker Spotlight Videos ─── */
import BannerHighlight from "./awardwinning.jpeg";
import spkVideo1 from "./Cátia Arnaut video.mp4"; 
import spkVideo2 from "./speaker video.mp4";
import spkVideo3 from "./Dawn chen video.mp4";

/* ─── Gallery Images ─── */
import Galleryhome from "../../components/images/sepgallery1.jpg";
import Galleryhome1 from "../../components/images/galleryn.jpg";
import Galleryhome2 from "../../components/images/galleryn9.jpg";
import Galleryhome3 from "../../components/images/galleryn11.jpg";
import Galleryhome4 from "../../components/images/galleryn5.jpg";
import Galleryhome5 from "../../components/Gallary/Conferencegallery1.jpeg";
import Galleryhome6 from "../../components/Gallary/Conferencegallery2.jpeg";


import brochure1 from "../../components/Events/WYNX New York Brochure.pdf";
import brochure2 from "../../components/Events/WYNx Toronto Brochure.pdf";
import brochure3 from "../../components/Events/WYNx Dubai Brochure.pdf";

/* ─── Data ──────────────────────────────────────────────────────── */

const TALKS = [
  {
    id: "wynx-01",
    image: eventimg1,
    title: "QUANTUM Next Gen Women Leadership & Mental Health Conclave 2026",
    date: "July 20–26, 2026",
    location: "New York, USA",
    brochure: brochure1,
    rating: "4.9",
    tags: ["Leadership", "Global", "Award Winning"],
  },
  {
    id: "wynx-02",
    image: eventimg,
    title: "ASCEND 2026: Rise of Next-Gen Women Leaders in Power, Purpose & Wellbeing",
    date: "November 09-15, 2026",
    location: "Toronto, Canada",
    brochure: brochure2,
    rating: "4.9",
    tags: ["Leadership", "Global", "Award Winning"],
  },
  {
    id: "wynx-03",
    image: eventimg2,
    title: " ARAB WOMEN Hi-RISE CONCLAVE",
    date: "November 23-29, 2026",
    location: "Dubai, UAE",
    brochure: brochure3,
    rating: "4.9",
    tags: ["Leadership", "Global Networking", "Award Winning"],
  },
  
];

const SPEAKER_VIDEOS = [
  { video: spkVideo1,  duration: "1:14",  },
  { video: spkVideo2,  duration: "2:02",  },
  { video: spkVideo3,  duration: "2:05",  },
];

const SERVICES = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Elite Networking",
    desc: "Connect with industry titans, award-winning speakers, and visionary leaders in curated, high-impact networking sessions designed to forge lasting professional bonds.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Award Ceremonies",
    desc: "Celebrate excellence with our prestigious award recognition programs honouring the boldest voices, breakthrough thinkers, and transformational leaders of our era.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: "Keynote Talks",
    desc: "Experience world-class keynote presentations by globally recognised thought leaders who challenge conventions, spark new ideas, and inspire audiences to think differently.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Innovation Workshops",
    desc: "Hands-on intensive workshops where attendees collaborate on real-world challenges, develop actionable strategies and walk away with frameworks to drive meaningful change.",
  },
];

const SPEAKER_STEPS = [
  {
    step: "Step 01",
    title: "Submit Your Speaker Profile",
    desc: "Share your headshot, speaker bio, and presentation title to showcase your expertise and speaking experience.",
    icon: (
      <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    featured: false,
  },
  {
    step: "Step 02",
    title: "Present Your Thought Leadership",
    desc: "Submit your abstract highlighting key insights, research, strategies, or ideas for our review committee.",
    icon: (
      <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    featured: true,
  },
  {
    step: "Step 03",
    title: "Take the Global Stage",
    desc: "Join a distinguished lineup of speakers, connect with global audiences, and expand your professional impact.",
    icon: (
      <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    featured: false,
  },
];

const GALLERY_IMAGES = [ Galleryhome, Galleryhome6, Galleryhome5, Galleryhome4, Galleryhome3, Galleryhome2, Galleryhome1];

const SPEAKER_IMAGES = [   "regspeaker.jpg",  "regspeaker1.jpg",  "regspeaker2.jpg",  "regspeaker3.jpg",  "regspeaker4.jpg",  "regspeaker5.jpg",  "regspeaker6.jpg",
  "Allison C. Williams.jpg",  "Anne Deatly Phd.jpg",  "Arsella Burton.jpg",  "Bruce Wren.jpg",  "Carlota De Gula Iremedio.jpg",  "Yelena Kalendareva.jpg",
  "Wanna Williamson-Jackson.jpg",  "Thiru Damodharan.jpg",  "Stephani Forbes.jpg",  "Sam Sammane.jpg",  "Rudy Merouchi.jpg",  "Rasimah Jar.jpg",
  "Nio Queiro.jpg",  "Christine Forment.jpg",  "Deborah S. Greenhut.jpg",  "Dr. Denise Y Wynn.jpg",  "Dr. Dimple Patel.jpg",  "Dr. Ignacio Bonasa.jpg",
  "Dr. Laura Kristan Wilhelm.jpg",  "Dr. Sharon Shappley.jpg",  "Eniko Frenyo Simoes.jpg",  "Huma Nosheen Mirza.jpg",  "Jean Pael.jpg",  "Jeffrey Herbert Williams.jpg",
  "Karima GUERFALI LAZZEM.jpg",  "Limor Jasinski.jpg",  "Lissette Valle.jpg",  "Nikki Langman.jpg",  "Tristina Anderson.jpg",  "Margaret Vuijk-Cieslak.jpg",  "Bente Vosteen.jpg",
  "Kunio Hara.jpg",  "Dr Diana Richardson.jpg",  "Kimly Hoang-Nakata.jpg",  "Kathryn Lancioni.jpg",  "Wahida parveen.jpg",  "Barb varcl smith.jpg",  "Michelle Sweeting D.jpg",
  "Ann-Marie Emmanuel.jpg",  "EnowBisong spouse Njonje Alice Bessem.jpg",  "Joanna Sroka.jpg",  "Manjinder Kau.jpg",  "Annabelle Hartnell.jpg",  "Heidy Kallion.jpg",  "Tina Collura.jpg",
  "Dr. Rita Lustgarten.jpeg",  "Steve Conway.jpeg",  "Hila Lauterbach.jpeg",  "Ellen Duffey Lueb.jpeg",  "Sabira Arefin.jpeg", "David Goldberg.jpeg","Paul Peters.jpeg", "Rebecca House.jpeg", "Roger Nakata, D.O.jpeg"
].map(img => require(`../../components/speaker images/${img}`));

/* ─── Icon helpers ───────────────────────────────────────────────── */
function PlayIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <polygon points="5 3 19 12 5 21 5 3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="13" height="13" fill="#c9a84c" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

// ─── Talk Card ────────────────────────────────────────────────────────
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
          <span className="wy-meta-item">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/>
              <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/>
              <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/>
            </svg>
            {talk.date}
          </span>
        </div>
        <div className="wy-card-meta-row">
          <span className="wy-meta-item">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {talk.location}
          </span>
        </div>
        <div className="wy-card-tags-row">
          <span className="wy-card-rating">
            <StarIcon /> {talk.rating}
          </span>
          {talk.tags.map((tag, i) => (
            <span key={i} className="wy-card-tag">{tag}</span>
          ))}
        </div>
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
          <button
            className="wy-action-btn wy-action-btn--outline"
            onClick={index === 0 ? () => navigate("/newyorkagenda2026") : undefined}
          >
            Agenda
          </button>
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
/* ─── Speaker Step Card ──────────────────────────────────────────── */
function SpeakerStepCard({ step }) {
  return (
    <div className={`wy-spk-card${step.featured ? " wy-spk-card--featured" : ""}`}>
      <div className="wy-spk-platform-wrap">
        {step.featured && <div className="wy-spk-featured-badge">KEY STEP</div>}
        <div className={`wy-spk-platform${step.featured ? " wy-spk-platform--featured" : ""}`}>
          <div className="wy-spk-orbit wy-spk-orbit--outer" />
          <div className="wy-spk-orbit wy-spk-orbit--inner" />
          <div className="wy-spk-icon-circle">{step.icon}</div>
        </div>
        <div className={`wy-spk-floor${step.featured ? " wy-spk-floor--featured" : ""}`} />
      </div>
      <div className="wy-spk-text">
        <div className="wy-spk-step-num">{step.step}</div>
        <div className="wy-spk-card-title">{step.title}</div>
        <p className="wy-spk-card-desc">{step.desc}</p>
      </div>
    </div>
  );
}

/* ─── Gallery ────────────────────────────────────────────────────── */
function GallerySection() {
  return (
    <section className="wy-gallery-section">
      <div className="wy-container">
        <div className="wy-section-header">
          <div>
            <div className="wy-section-eyebrow">MOMENTS</div>
            <h2 className="wy-section-title">From the Stage</h2>
          </div>
          <a href="/gallery" className="wy-view-all">View Full Gallery →</a>
        </div>
        <div className="wy-gallery-mosaic">
          {GALLERY_IMAGES.map((src, i) => (
            <div key={i} className="wy-gal-item"><img src={src} alt="" /></div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── Speaker Spotlights Section ─── */
function SpeakerSpotlights() {
  const handlePlay = (e) => {
    const card = e.currentTarget.closest(".wy-spot-card");
    const video = card.querySelector("video");
    const overlay = card.querySelector(".wy-spot-overlay");
    if (video.paused) {
      video.play();
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    } else {
      video.pause();
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";
    }
  };

  return (
    <section className="wy-spotlights" id="SpeakerSpotlights">
      <div className="wy-spot-glow wy-spot-glow-1" />
      <div className="wy-spot-glow wy-spot-glow-2" />
      <div className="wy-container">
        <div className="wy-spk-header">
          <div className="wy-section-eyebrow">SPEAKER SPOTLIGHTS</div>
          <h2 className="wy-spk-title">
            Voices from <span className="wy-accent">the Stage</span>
          </h2>
          <div className="wy-spot-divider" />
          <p className="wy-spk-subtitle">
            Hear directly from our speakers — their stories, insights, and what drives them to lead from the front.
          </p>
        </div>

        <div className="wy-spot-grid">
          {SPEAKER_VIDEOS.map((spk, i) => (
            <div className="wy-spot-card" key={i}>
              {/* Video */}
              <div className="wy-spot-video-wrap">
                <video
                  src={spk.video}
                  preload="metadata"
                  playsInline
                  className="wy-spot-video"
                />
                <div className="wy-spot-overlay" onClick={handlePlay}>
                  <div className="wy-spot-play-btn">
                    <svg width="16" height="16" fill="#0a1a14" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
                <span className="wy-spot-duration">{spk.duration}</span>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── Conference Highlight Banner ───────────────────────── */
function ConferenceBanner() {
  return (
    <section className="wy-banner-section">
      <div className="wy-container">
        <div className="wy-banner-header">
          <div className="wy-section-eyebrow">OUR IMPACT</div>
          <h2 className="wy-banner-title">
            WYNx <span className="wy-accent">Award Winning</span> Talks 2026
          </h2>
          <p className="wy-banner-subtitle">
            Celebrating excellence on the global stage — award winners, visionary speakers,
            and changemakers united at WYNx Award Winning Talks.
          </p>
        </div>
        <div className="wy-banner-img-wrap">
          <div className="wy-banner-glow" />
          <img src={BannerHighlight} alt="WYNx Award Winning Talks 2026" className="wy-banner-img" />
          {/* <div className="wy-banner-badge">
            <span className="wy-banner-badge-dot" />
            WYNx Award Winning Talks 2026
          </div> */}
        </div>
      </div>
    </section>
  );
}

/* ─── Speakers Marquee ───────────────────────────────────────────── */
function SpeakersSection() {
  const navigate = useNavigate();
  const items = [...SPEAKER_IMAGES, ...SPEAKER_IMAGES];
  return (
    <section className="wy-speakers-section">
      <div className="wy-spk-arc-bg-glow" />
      <div className="wy-container">
        <div className="wy-spk-arc-header">
          <div className="wy-section-eyebrow">OUR SPEAKERS</div>
          <h2 className="wy-spk-arc-title">
            Voices That Move<br /><span className="wy-accent">the World</span>
          </h2>
          <p className="wy-spk-arc-sub">
            Award-winning speakers across leadership, tech, and innovation — gathered on one stage.
          </p>
        </div>
      </div>
      <div className="wy-marquee-viewport">
        <div className="wy-marquee-track">
          {items.map((src, i) => (
            <div className="wy-marquee-card" key={i}>
              <div className="wy-marquee-img-wrap">
                <img src={src} alt={`Speaker ${(i % SPEAKER_IMAGES.length) + 1}`} draggable={false} />
                <div className="wy-marquee-overlay" />
              </div>
            </div>
          ))}
        </div>
        <div className="wy-arc-fade wy-arc-fade--left" />
        <div className="wy-arc-fade wy-arc-fade--right" />
      </div>
      <div className="wy-container">
        <div className="wy-spk-arc-cta">
          <button className="wy-cta-primary" onClick={() => navigate("/gallery")}>
            View All Speakers
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="wy-cta-secondary" onClick={() => navigate("/awardsnomination")}>
            Apply as a Speaker
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function WYNxLanding() {
  const navigate = useNavigate();
  return (
    <div className="wy-root">

      <Navbar />

      <div style={{ height: 68 }} />
      <section className="wy-hero">
        <div className="wy-hero-glow wy-hero-glow-1" />
        <div className="wy-hero-glow wy-hero-glow-2" />

        <div className="wy-hero-left">
          <div className="wy-hero-badge wy-anim wy-anim-0">
            {/* <span className="wy-hero-badge-dot" /> */}
            EVERY WIN HAS A STORY TO TALK
          </div>
          <h1 className="wy-hero-title wy-anim wy-anim-1">
            WYNx <span className="wy-accent">Award Winning</span> Talks
          </h1>
          <p className="wy-hero-sub wy-anim wy-anim-2">
            The world's most celebrated conference for breakthrough thinkers, visionary leaders, and award-winning speakers. Inspire. Connect. Transform.
          </p>
          <div className="wy-hero-actions wy-anim wy-anim-3">
            <button className="wy-cta-primary" onClick={() => navigate("/conferences")}>
              Explore Talks
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="wy-cta-secondary" onClick={() => { document   .getElementById("SpeakerSpotlights")   ?.scrollIntoView({ behavior: "smooth" }); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Highlights
            </button>
          </div>
          <div className="wy-hero-stats wy-anim wy-anim-4">
            {[["200+","Speakers"],["50K+","Attendees"],["120+","Awards"],["30+","Countries"]].map(([val,lbl],i,a) => (
              <div key={lbl} style={{display:"flex",alignItems:"center",gap:0}}>
                <div className="wy-hero-stat">
                  <span className="wy-hero-stat-val">{val}</span>
                  <span className="wy-hero-stat-lbl">{lbl}</span>
                </div>
                {i < a.length-1 && <div className="wy-hero-stat-divider" />}
              </div>
            ))}
          </div>
        </div>

        <div className="wy-hero-right wy-anim wy-anim-2">
          <div className="wy-hero-trophy-wrap">
            <div className="wy-trophy-glow-ring wy-trophy-glow-ring--outer" />
            <div className="wy-trophy-glow-ring wy-trophy-glow-ring--inner" />
            <div className="wy-trophy-ground-glow" />
            <img src={heroimg} alt="WYNx Award Trophy" className="wy-hero-trophy-img" />
          </div>
        </div>
      </section>

        {/* ════ SERVICES ════ */}
        <section className="wy-services">
          <div className="wy-container">
            <div className="wy-services-inner">

              <div className="wy-services-left">
                <div className="wy-section-eyebrow">ABOUT US</div>
                <h2 className="wy-services-title">
                  Be a Catalyst for Change at WYNx Talks Awards
                </h2>
                <div className="wy-services-divider" />
                <p className="wy-services-body">
                  Celebrate excellence and inspire transformation at the prestigious WYNx Talks Awards.
                  This global platform honors visionary leaders, innovators, and changemakers who have made
                  significant contributions to health, community well-being, and leadership.
                </p>
                <p className="wy-services-body">
                  As a nominee or awardee, you will gain unparalleled recognition, connect with a
                  distinguished network of experts, and showcase your groundbreaking work to a global audience.
                </p>
                <p className="wy-services-highlight">
                  The WYNx Talks Awards are more than an accolade — they are a celebration of impact,
                  innovation, and the power to drive meaningful change.
                </p>
                <button className="wy-know-more-btn" onClick={() => navigate("/about")}>
                  Learn More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              <div className="wy-services-right">
                <div className="wy-services-grid">
                  {SERVICES.map((svc, i) => (
                    <div key={i} className="wy-svc-card">
                      <div className="wy-svc-icon">{svc.icon}</div>
                      <div className="wy-svc-title">{svc.title}</div>
                      <div className="wy-svc-desc">{svc.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

      {/* ════ FEATURED TALKS ════ */}
      <section className="wy-talks-section">
        <div className="wy-container">
          <div className="wy-section-header">
            <h2 className="wy-section-title">Featured Talks</h2>
            <a href="/conferences" className="wy-view-all">View All Events →</a>
          </div>
          <div className="wy-talks-grid">
            {TALKS.map((talk, i) => <TalkCard key={i} talk={talk} index={i} />)}
          </div>
        </div>
      </section>

      {/* ════ HOW TO BECOME A SPEAKER ════ */}
      <section className="wy-speaker-steps">
        <div className="wy-spk-glow wy-spk-glow-1" />
        <div className="wy-spk-glow wy-spk-glow-2" />
        <div className="wy-container">
          <div className="wy-spk-header">
            <div className="wy-section-eyebrow">YOUR JOURNEY STARTS HERE</div>
            <h2 className="wy-spk-title">How to Become an <span className="wy-accent">Award-Winning</span> Speaker</h2>
            <p className="wy-spk-subtitle">Three essential steps that transform passionate professionals into stage-ready, award-recognised voices that captivate audiences worldwide.</p>
          </div>
          <div className="wy-spk-grid">
            {SPEAKER_STEPS.map((step, i) => <SpeakerStepCard key={i} step={step} />)}
          </div>
          <div className="wy-spk-cta-row">
            <button className="wy-cta-primary" onClick={() => navigate("/awardsnomination")}>
              Apply as a Speaker
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="wy-cta-secondary" onClick={() => navigate("/awardcategories")}>
              Learn About Awards
            </button>
          </div>
        </div>
      </section>

      <SpeakerSpotlights />
      <ConferenceBanner />
      <GallerySection />
      <SpeakersSection />
      <NewFooter />

    </div>
  );
}