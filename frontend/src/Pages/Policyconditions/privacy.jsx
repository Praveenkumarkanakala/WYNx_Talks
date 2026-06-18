import { useEffect, useRef, useState } from "react";
import Navbar from "../NewNavbar/Navbar";
import NewFooter from "../Footer/footer";
import "./policy.css";

const SECTIONS = [
  {
    id: "overview",
    eyebrow: "Section 01",
    title: "Overview",
    body: (
      <>
        <p className="ppv-clause__text">
          WYNx Award Winning Talks operates{" "}
          <a
            href="https://wynxtalks.com/"
            className="pol-link"
            target="_blank"
            rel="noreferrer"
          >
            https://wynxtalks.com/
          </a>
          . This page sets out our policy on the collection, use, and disclosure of
          personal information we receive from visitors to our website.
        </p>
      </>
    ),
  },
  {
    id: "collection",
    eyebrow: "Section 02",
    title: "Information We Collect",
    body: (
      <>
        <p className="ppv-clause__text">
          We use your personal information only to provide and improve the site. By
          using the site, you agree to the collection and use of information in line
          with this policy. While using our site, we may ask you to provide certain
          personally identifiable information that can be used to contact you,
          including your email address, contact number, and name.
        </p>
        <p className="ppv-clause__text">
          We also collect information that your browser sends whenever you visit our
          site. This log data may include your computer's Internet Protocol ("IP")
          address, browser type and version, the pages of our website that you
          visit, the time and date of your visit, the time spent on those pages, and
          other diagnostic data.
        </p>
        <div className="ppv-callout">
          <span className="ppv-callout__icon">◈</span>
          <p>
            We may also use third-party services, such as Google Analytics, that
            collect, monitor, and analyse this data to help us improve your
            experience on our platform.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "use",
    eyebrow: "Section 03",
    title: "How We Use Your Information",
    body: (
      <>
        <p className="ppv-clause__text">
          We may use your personal information to contact you with emails,
          newsletters, and marketing materials related to our events, awards, and
          conclaves.
        </p>
        <ul className="ppv-list">
          <li>To provide and improve our conference services</li>
          <li>To send event updates, confirmations, and important notices</li>
          <li>To personalise your experience on our platform</li>
          <li>To process registrations and payments securely</li>
          <li>To respond to enquiries and support requests</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    eyebrow: "Section 04",
    title: "Security",
    body: (
      <p className="ppv-clause__text">
        The security of your personal information matters to us, but no method of
        transmission over the Internet, or method of electronic storage, is ever
        fully secure. While we make every effort to use commercially acceptable
        means to protect your personal information, we cannot guarantee its
        absolute security.
      </p>
    ),
  },
  {
    id: "changes",
    eyebrow: "Section 05",
    title: "Policy Changes",
    body: (
      <>
        <p className="ppv-clause__text">
          This privacy policy is effective as of June 18, 2026, and will
          remain in effect except with respect to any changes in its provisions
          in the future, which will take effect immediately after being posted on
          this page. We reserve the right to update or change our privacy policy
          at any time, and you should check this page periodically.
        </p>
        <p className="ppv-clause__text">
          Your continued use of the service after any changes to this privacy
          policy are posted on this page will constitute your acknowledgement of
          the changes and your agreement to be bound by the revised policy.
        </p>
      </>
    ),
  },
  {
    id: "contact-priv",
    eyebrow: "Section 06",
    title: "Contact Us",
    body: (
      <>
        <p className="ppv-clause__text">
          If you have any questions about this privacy policy, please get in
          touch with us.
        </p>
        <a href="mailto:contact@wynxtalks.com" className="pol-contact-btn">
          contact@wynxtalks.com
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const contentRef = useRef(null);

  useEffect(() => {
    const nodes = contentRef.current?.querySelectorAll("[data-section]");
    if (!nodes || nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute("data-section"));
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pol-root">
      <Navbar />

      {/* ── HERO ── */}
      <section className="pol-hero pol-hero--privacy">
        <div className="pol-hero__noise" />
        <div className="pol-hero__glow" />

        <div className="pol-hero__inner">
          <h1 className="pol-hero__title">Privacy Policy</h1>
          <p className="pol-hero__sub">
            How WYNx Award Winning Talks collects, uses, and protects your personal
            information.
          </p>
          <div className="pol-hero__line" />
          <span className="pol-hero__date">Effective: June 18, 2026</span>
        </div>
        <div className="pol-hero__strip" />
      </section>

      {/* ── BODY ── */}
      <main className="ppv-wrap">
        <div className="ppv-rail">

          {/* index */}
          <aside className="ppv-index">
            <div className="ppv-index__label">Contents</div>
            <div className="ppv-index__list">
              <span className="ppv-index__thread" />
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={
                    "ppv-index__item" + (activeId === s.id ? " ppv-index__item--active" : "")
                  }
                  onClick={() => scrollToSection(s.id)}
                >
                  <span className="ppv-index__marker" />
                  <span className="ppv-index__text">{s.title}</span>
                </button>
              ))}
            </div>

            <div className="ppv-help">
              <div className="ppv-help__label">Need help?</div>
              <p className="ppv-help__text">
                Reach out and our team will walk you through any part of this policy.
              </p>
              <a href="mailto:contact@wynxtalks.com" className="pol-contact-btn pol-contact-btn--sm">
                Contact us
              </a>
            </div>
          </aside>

          {/* content */}
          <article className="ppv-content" ref={contentRef}>
            {SECTIONS.map((s, i) => (
              <section key={s.id} id={s.id} data-section={s.id} className="ppv-clause">
                <span className="ppv-clause__num">{String(i + 1).padStart(2, "0")}</span>
                <div className="ppv-clause__eyebrow">{s.eyebrow}</div>
                <h2 className="ppv-clause__heading">{s.title}</h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}