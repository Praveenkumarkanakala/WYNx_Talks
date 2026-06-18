import { useState } from "react";
import Navbar from "../NewNavbar/Navbar";
import NewFooter from "../Footer/footer";
import "./policy.css";

const TERMS = [
  {
    id: "gratitude",
    title: "Welcome & Gratitude",
    content:
      "Terms & Conditions — Huge gratitude and thanks for registering with WYN Conferences. Following are the Terms and Conditions that are going to apply to you and your participation in any of the WYN Conferences. Please note that these terms and conditions apply to all registrants as Speaker, Listener, Sponsor, Exhibitor, Poster, Accompanying, and any other.",
  },
  {
    id: "currency",
    title: "Rate of Currency Exchange",
    content:
      "WYN Conferences is not responsible for the registrants if any increase/decrease in the value of currency exchange. We will consider the exchange rate on the day of registration.",
  },
  {
    id: "payment",
    title: "Payment & Participation",
    content:
      "Participants will not be allowed to participate in the conference without valid proof of payment. All the dues should be cleared before a month of commencement of the conference. Participants can do the registration online and offline also. For offline registration, the WYN Conferences will be supported by phone conversation or email conversation.",
  },
  {
    id: "online-registration",
    title: "Online Registration",
    content:
      "Note that some countries will not allow online registration without respective bank authorization. If any online registration will not process, primarily please contact the respective bank for the international credit/debit card authorization for international payments. If you find any more issues with the authorized credit card also, please contact our finance team through contact@wynconferences.com.",
  },
  {
    id: "group-discount",
    title: "Group Discounts",
    content:
      "Group discounts are applicable if more than four members are going to register at once. Group discounts are applicable with a maximum discount of 25% on registration charges for each individual or four registrations without discount a complimentary registration will be provided.",
  },
  {
    id: "substitution",
    title: "Substitution & Replacement",
    content:
      "If the participant is unable to participate in the conference for any reason, substitution is going to be allowed. Make sure that the substitution registration needs approval from the conference manager and the substitute should also show the copy of the acceptance mail to the conference hall as proof. Replacement is only for speakers and delegates but is not allowed for Exhibitors, Sponsors, and memberships.",
  },
  {
    id: "distribution",
    title: "Distribution Policy",
    content:
      "Speakers and delegates are not allowed to distribute their business booklets, flyers, books, or any other hard copies without the conference manager's approval. This term is not applicable for exhibitors, sponsors, and members.",
  },
  {
    id: "queries",
    title: "Further Details & Queries",
    content:
      "For any more details and queries on terms and conditions please mail to contact@wynconferences.com. We are happy to assist you with any questions or concerns regarding your participation.",
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={`tnc-item${isOpen ? " tnc-item--open" : ""}`}>
      <button className="tnc-item__trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="tnc-item__title">{item.title}</span>
        <span className="tnc-item__chevron">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className="tnc-item__body">
        <p className="tnc-item__text">{item.content}</p>
      </div>
    </div>
  );
}

export default function TermsAndConditions() {
  const [openId, setOpenId] = useState("gratitude");

  return (
    <div className="pol-root">
      <Navbar />

      {/* ── HERO ── */}
      <section className="pol-hero pol-hero--terms">
        <div className="pol-hero__noise" />
        <div className="pol-hero__glow pol-hero__glow--center" />
        <div className="pol-hero__inner">
          <div className="pol-hero__tag">Legal</div>
          <h1 className="pol-hero__title">Terms &amp; Conditions</h1>
          <p className="pol-hero__sub">
            Please read these terms carefully before registering for any WYN Conference.
          </p>
          <div className="pol-hero__line" />
          <span className="pol-hero__date">WYN Conferences — All Registrant Types</span>
        </div>
        <div className="pol-hero__strip" />
      </section>

      {/* ── BODY ── */}
      <main className="pol-body pol-body--terms">
        <div className="pol-body__wide">

          <div className="tnc-layout">

            {/* Left: intro card */}
            <div className="tnc-intro-col">
              <div className="tnc-intro-card">
                <div className="tnc-intro-card__icon">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="tnc-intro-card__title">Who These Apply To</h3>
                <ul className="tnc-intro-card__list">
                  {["Speaker","Listener","Sponsor","Exhibitor","Poster","Accompanying","Any other registrant"].map((r) => (
                    <li key={r}>
                      <span className="tnc-intro-card__dot" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tnc-contact-card">
                <div className="tnc-contact-card__label">Need Clarification?</div>
                <p className="tnc-contact-card__text">Reach out to our team for any questions about these terms.</p>
                <a href="mailto:contact@wynconferences.com" className="pol-contact-btn pol-contact-btn--sm">
                  Email Us
                  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: accordion */}
            <div className="tnc-accordion-col">
              <div className="tnc-accordion">
                {TERMS.map((item) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      <NewFooter />
    </div>
  );
}