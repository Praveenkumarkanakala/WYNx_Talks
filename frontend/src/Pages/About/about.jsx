import "./about.css";
import heroimg from "./Heroimage.png";
import Navbar from "../NewNavbar/Navbar";  
import NewFooter from "../../Pages/Footer/footer";
import { useNavigate } from "react-router-dom";


/* ─── Icon helpers ───────────────────────────────────────────────── */
function Icon({ d, size = 22 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24"
      stroke="currentColor" strokeWidth="1.6">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const STATS = [
  {
    val: "200", plus: true,
    label: "Global Conferences",
    desc: "World-class events across 6 continents",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    val: "500", plus: true,
    label: "International Speakers",
    desc: "Award-winning voices from 30+ countries",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    val: "40", plus: true,
    label: "Award Categories",
    desc: "Recognising excellence across disciplines",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  {
    val: "50K", plus: true,
    label: "Worldwide Recognition",
    desc: "Lives transformed through our platform",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
];

const PILLARS = [
  {
    num: "01",
    tag: "Empowerment",
    title: "Empower Transformative Voices",
    desc: "We curate and amplify the most compelling voices — thought leaders whose ideas challenge the status quo and shift entire industries. Every speaker on the WYNx stage is handpicked for authenticity, expertise, and impact.",
  },
  {
    num: "02",
    tag: "Connection",
    title: "Create Global Connections",
    desc: "Through immersive summits, leadership conclaves, and networking sessions, we forge meaningful cross-border relationships that drive collaboration, partnerships, and innovation across continents.",
  },
  {
    num: "03",
    tag: "Recognition",
    title: "Honor Excellence in Leadership",
    desc: "Our prestigious award programs celebrate brilliance in thought leadership, entrepreneurship, education, humanitarian influence, and innovation — giving deserved recognition to changemakers worldwide.",
  },
];

const COMMUNITY_CARDS = [
  {
    title: "Visionary Leaders",
    desc: "C-suite executives, policy makers, and global leaders shaping tomorrow's world.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Innovators & Entrepreneurs",
    desc: "Founders, disruptors, and builders who are redefining industries and creating the future.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    title: "Educators & Academics",
    desc: "World-renowned professors, researchers, and learning pioneers committed to transforming education.",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    title: "Changemakers & Advocates",
    desc: "Social entrepreneurs, humanitarian leaders, and advocates driving meaningful change worldwide.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
];

/* ─── Section 1: About Us ────────────────────────────────────────── */
function AboutSection() {
    const navigate = useNavigate();
  return (
    <section className="ab-about-section">
      <div className="ab-about-glow ab-about-glow-1" />
      <div className="ab-about-glow ab-about-glow-2" />
      <div className="ab-container">
        <div className="ab-about-inner">

          {/* LEFT */}
          <div className="ab-about-left">
            <div className="ab-eyebrow ab-anim ab-anim-0">About Us</div>
            <h2 className="ab-about-title ab-anim ab-anim-1">
              Empowering Visionaries <span className="ab-accent">Through</span>{" "}
              Meaningful Conversations
            </h2>
            <p className="ab-about-body ab-anim ab-anim-2">
              In a world where innovation moves faster than ever, meaningful conversations have become one of the most valuable currencies of progress. WYNx Talks was founded on a simple yet powerful belief: when visionary leaders, researchers, entrepreneurs, educators, healthcare professionals, policymakers, and changemakers come together, extraordinary things happen.
            </p>
            <p className="ab-about-body ab-anim ab-anim-3">
              WYNx Talks is more than a conference platform it is a global movement dedicated to elevating voices, accelerating ideas, and creating opportunities for professionals to leave a lasting impact on their industries and communities. We provide a prestigious international stage where expertise is transformed into influence, research becomes action, and stories inspire meaningful change.
            </p>
            <p className="ab-about-body ab-anim ab-anim-3">
              Our mission is to connect exceptional minds from around the world and create environments where knowledge, innovation, leadership, wellbeing, and purpose intersect. Through carefully curated international conferences, summits, leadership forums, and networking experiences, we empower professionals to share their insights with audiences that extend far beyond a single event.
            </p>

            <div className="ab-about-cta-row ab-anim ab-anim-4">
              <button className="ab-btn-primary" onClick={() => navigate('/conferences')}>
                Explore Conferences <ArrowRight />
              </button>
              <button className="ab-btn-secondary" onClick={() => navigate('/awardcategories')}>
                View Award Programs
              </button>
            </div>
          </div>

          {/* RIGHT — Trophy (no chips) */}
          <div className="ab-about-right ab-anim-r ab-anim-1">
            <div className="ab-trophy-wrap">
              <div className="ab-trophy-ring ab-trophy-ring--outer" />
              <div className="ab-trophy-ring ab-trophy-ring--mid" />
              <div className="ab-trophy-ring ab-trophy-ring--inner" />
              <div className="ab-trophy-ambient" />
              <div className="ab-trophy-ground-glow" />
              <img src={heroimg} alt="WYNx Award Trophy" className="ab-trophy-img" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Section 2: Mission ─────────────────────────────────────────── */
function MissionSection() {
  return (
    <section className="ab-mission-section">
      <div className="ab-mission-bg-glow" />
      <div className="ab-mission-grid-bg" />
      <div className="ab-container">
        <div className="ab-mission-inner">

          <div className="ab-mission-header ab-anim ab-anim-0">
            <div className="ab-eyebrow" style={{justifyContent:'center',marginBottom:16}}>
              <span style={{width:28,height:'1.5px',background:'#c8922a',flexShrink:0,display:'inline-block'}} />
              Our Mission
              <span style={{width:28,height:'1.5px',background:'#c8922a',flexShrink:0,display:'inline-block'}} />
            </div>
            <h2 className="ab-mission-title">
              Empowering Voices That <span className="ab-accent">Inspire Change</span>
            </h2>
            <p className="ab-mission-body">
              We connect visionary leaders, innovators, researchers, and changemakers with global audiences through impactful conferences and recognition platforms.
            </p>
          </div>

          <div className="ab-mission-quote ab-anim ab-anim-1">
            <p className="ab-mission-quote-text">
              Our mission is to elevate exceptional voices, accelerate transformative ideas, and create
              global opportunities for professionals to inspire, lead, and make a meaningful difference in
              the world.
            </p>
          </div>

          {/* Stats */}
          <div className="ab-stats-row">
            {STATS.map((s, i) => (
              <div className={`ab-stat-card ab-anim ab-anim-${i + 1}`} key={i}>
                <div className="ab-stat-icon">
                  <Icon d={s.icon} size={24} />
                </div>
                <div className="ab-stat-val">
                  {s.val}{s.plus && <span className="ab-stat-plus">+</span>}
                </div>
                <div className="ab-stat-lbl">{s.label}</div>
                <div className="ab-stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Mission Pillars */}
          <div className="ab-mission-pillars">
            {PILLARS.map((p, i) => (
              <div className={`ab-pillar-card ab-anim ab-anim-${i + 2}`} key={i}>
                <div className="ab-pillar-num">{p.num}</div>
                <div className="ab-pillar-title">{p.title}</div>
                <p className="ab-pillar-desc">{p.desc}</p>
                <span className="ab-pillar-tag">{p.tag}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Section 3: Who We Are ──────────────────────────────────────── */
function WhoWeAreSection() {
  const navigate = useNavigate();

  return (
    <section className="ab-who-section">
      <div className="ab-who-glow-1" />
      <div className="ab-who-glow-2" />
      <div className="ab-container">
        <div className="ab-who-inner">

          <div className="ab-who-header ab-anim ab-anim-0">
            <div className="ab-eyebrow" style={{justifyContent:'center',marginBottom:16}}>
              <span style={{width:28,height:'1.5px',background:'#c8922a',flexShrink:0,display:'inline-block'}} />
              Who We Are
              <span style={{width:28,height:'1.5px',background:'#c8922a',flexShrink:0,display:'inline-block'}} />
            </div>
            <h2 className="ab-who-title">
              More Than a Platform — <span className="ab-accent">A Global Movement</span>
            </h2>
            <p className="ab-who-sub">
              A worldwide community of leaders, visionaries, educators, creators, and professionals
              committed to elevating powerful ideas onto the international stage.
            </p>
          </div>

          {/* Identity Block — text only, no aside cards */}
          <div className="ab-identity-block ab-anim ab-anim-1">
            <div className="ab-identity-block-inner ab-identity-block-inner--full">
              <div className="ab-identity-text">
                <h3 className="ab-identity-headline">
                  We Are a Community Built on
                  <span className="ab-accent"> Excellence & Impact</span>
                </h3>
                <p className="ab-identity-body">
                  WYNx Award Winning Talks is more than a conference platform — it is a movement
                  that recognises excellence, celebrates influence, and inspires the next generation
                  of changemakers. From global conclaves on women's leadership and mental health, to
                  entrepreneurship summits and innovation congresses, every WYNx event is designed to
                  leave an indelible mark on its participants and the world.
                </p>
                <p className="ab-identity-body">
                  We believe the world is shaped by ideas, and ideas are given power through the
                  people who dare to speak them aloud. That belief is at the heart of everything we
                  do — connecting the bold, the brilliant, and the visionary across every
                  boundary, industry, and border.
                </p>
                <p className="ab-identity-body">
                  Our events are not simply conferences — they are moments of convergence where
                  careers accelerate, collaborations ignite, and the recognition of outstanding
                  individuals inspires entire communities to reach higher. WYNx stands as a global
                  beacon of excellence, lighting the way for the next generation of world-changers.
                </p>
              </div>
            </div>
          </div>

          {/* Community Cards */}
          <div className="ab-community-grid">
            {COMMUNITY_CARDS.map((c, i) => (
              <div className={`ab-community-card ab-anim ab-anim-${i + 1}`} key={i}>
                <div className="ab-community-icon">
                  <Icon d={c.icon} size={22} />
                </div>
                <div>
                  <div className="ab-community-title">{c.title}</div>
                  <div className="ab-community-desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Movement CTA Strip */}
          <div className="ab-movement-strip ab-anim ab-anim-3">
            <div className="ab-movement-left">
              <div className="ab-movement-eyebrow">Join the Movement</div>
              <h3 className="ab-movement-title">
                Ready to Speak on the <span className="ab-accent">World Stage?</span>
              </h3>
              <p className="ab-movement-desc">
                Whether you're an aspiring speaker, an industry leader, or a changemaker with a
                story worth telling — WYNx is your platform. Apply to speak, nominate yourself for
                an award, or register for our next international conference.
              </p>
            </div>
            <div className="ab-movement-right">
              <button className="ab-btn-primary" onClick={() => navigate('/awardsnomination')}>
                Apply as a Speaker <ArrowRight />
              </button>
              <button className="ab-btn-secondary" onClick={() => navigate('/conferences')}>
                Explore Conferences
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Page Header Banner ─────────────────────────────────────────── */
function PageHeroBanner() {
  return (
    <section className="ab-hero-banner">
      <div className="ab-hero-banner-glow ab-hero-banner-glow-1" />
      <div className="ab-hero-banner-glow ab-hero-banner-glow-2" />
      <div className="ab-container">
        <div className="ab-hero-banner-inner">
          <h1 className="ab-page-title ab-anim ab-anim-1">
            About <span className="ab-page-title-shimmer">WYNx</span>
          </h1>
          <p className="ab-page-subtitle ab-anim ab-anim-2">
            Connecting exceptional minds from around the world, WYNx Talks creates spaces where knowledge, leadership, and purpose intersect.
          </p>
          <div className="ab-divider-ornament ab-anim ab-anim-3">
            <div className="ab-divider-line ab-divider-line--rev" />
            <div className="ab-divider-dot" />
            <div className="ab-divider-diamond" />
            <div className="ab-divider-dot" />
            <div className="ab-divider-line" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="ab-root">
      <Navbar />
      <PageHeroBanner />
      <AboutSection />
      <MissionSection />
      <WhoWeAreSection />
      <NewFooter />
    </div>
  );
}