import Navbar from "../NewNavbar/Navbar";
import NewFooter from "../Footer/footer";
import "./refund.css";

export default function RefundPolicy() {
  return (
    <div className="rf-root">
      <Navbar />

      {/* ══ HERO ══ */}
      <section className="rf-hero">
        <div className="rf-hero__bg-grid" />
        <div className="rf-hero__glow rf-hero__glow--tl" />
        <div className="rf-hero__glow rf-hero__glow--br" />

        <div className="rf-hero__inner">
          <div className="rf-hero__left">
            <h1 className="rf-hero__title">Refund <span className="rf-hero__title-gold">Policy</span></h1>
            <p className="rf-hero__sub">
              Clear guidelines on cancellations, credits, and refund eligibility for all WYNx Award Winning Talks registrants.
            </p>
            <a href="mailto:contact@wynxtalks.com" className="rf-hero__cta">
              Questions? Contact Us
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="rf-hero__right">
            <div className="rf-hero__stat-card">
              <div className="rf-hero__stat-card-glow" />
              <div className="rf-hero__stat-row">
                <div className="rf-hero__stat">
                  <span className="rf-hero__stat-val">50%</span>
                  <span className="rf-hero__stat-lbl">Max Refund</span>
                </div>
                <div className="rf-hero__stat-sep" />
                <div className="rf-hero__stat">
                  <span className="rf-hero__stat-val">60</span>
                  <span className="rf-hero__stat-lbl">Days Threshold</span>
                </div>
                <div className="rf-hero__stat-sep" />
                <div className="rf-hero__stat">
                  <span className="rf-hero__stat-val">Wk 2</span>
                  <span className="rf-hero__stat-lbl">Processing Time</span>
                </div>
              </div>
              <div className="rf-hero__stat-note">
                All refunds processed after conference completion
              </div>
            </div>
          </div>
        </div>

        <div className="rf-hero__bar" />
      </section>

      {/* ══ BODY ══ */}
      <main className="rf-main">

        {/* ── Section 1: Natural Calamity Notice ── */}
        <div className="rf-notice">
          <div className="rf-notice__icon-wrap">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div className="rf-notice__body">
            <div className="rf-notice__label">Important Notice</div>
            <p className="rf-notice__text">
              We kindly inform you that in the unfortunate event of cancellation due to natural calamities,
              refunds will not be possible. However, the fee will be credited toward your registration for
              subsequent events. In case you no longer wish to attend the Conference, your registration fee
              will be transferred to subsequent events organised by WYNx Award Winning Talks. We appreciate your
              understanding and support.
            </p>
          </div>
        </div>

        {/* ── Section 2: Cancellation Timeline ── */}
        <div className="rf-section">
          <div className="rf-section__header">
            <div className="rf-section__eyebrow">Cancellation Windows</div>
            <h2 className="rf-section__title">Refund Eligibility Timeline</h2>
          </div>

          <div className="rf-timeline">
            {/* Timeline line */}
            <div className="rf-timeline__track">
              <div className="rf-timeline__line" />
              <div className="rf-timeline__node rf-timeline__node--start">
                <span>Registration</span>
              </div>
              <div className="rf-timeline__node rf-timeline__node--90">
                <span>90 Days</span>
              </div>
              <div className="rf-timeline__node rf-timeline__node--60">
                <span>60 Days</span>
              </div>
              <div className="rf-timeline__node rf-timeline__node--event">
                <span>Event</span>
              </div>
            </div>

            {/* Cards below timeline */}
            <div className="rf-timeline__cards">
              <div className="rf-tcard rf-tcard--eligible">
                <div className="rf-tcard__top">
                  <div className="rf-tcard__icon">◆</div>
                  <div className="rf-tcard__badge rf-tcard__badge--yes">✓ Eligible</div>
                </div>
                <div className="rf-tcard__window">Within 90–60 Days Before Conference</div>
                <div className="rf-tcard__title">50% Payment Refund</div>
                <p className="rf-tcard__desc">
                  Speakers who cancel their registration between 90 and 60 days before the
                  Conference are eligible for a 50% payment refund.
                </p>
                <div className="rf-tcard__amount">
                  <span className="rf-tcard__amount-val">50%</span>
                  <span className="rf-tcard__amount-lbl">of registration fee</span>
                </div>
              </div>

              <div className="rf-tcard rf-tcard--ineligible">
                <div className="rf-tcard__top">
                  <div className="rf-tcard__icon rf-tcard__icon--dim">▲</div>
                  <div className="rf-tcard__badge rf-tcard__badge--no">✕ Not Eligible</div>
                </div>
                <div className="rf-tcard__window">Before 60 Days of Conference</div>
                <div className="rf-tcard__title">No Refund</div>
                <p className="rf-tcard__desc">
                  Speakers who cancel less than 60 days before the Conference are not
                  eligible for a refund of any kind.
                </p>
                <div className="rf-tcard__amount rf-tcard__amount--nil">
                  <span className="rf-tcard__amount-val">0%</span>
                  <span className="rf-tcard__amount-lbl">no refund issued</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: How to Cancel ── */}
        <div className="rf-section">
          <div className="rf-section__header">
            <div className="rf-section__eyebrow">Process</div>
            <h2 className="rf-section__title">How to Cancel</h2>
          </div>

          <div className="rf-steps">
            <div className="rf-step">
              <div className="rf-step__num">01</div>
              <div className="rf-step__body">
                <div className="rf-step__title">Send a Cancellation Email</div>
                <p className="rf-step__desc">
                  To cancel your registration for the Conference, please send an email to{" "}
                  <a href="mailto:contact@wynxtalks.com" className="rf-link">
                    contact@wynxtalks.com
                  </a>{" "}
                  notifying the WYNx Award Winning Talks group of your decision.
                </p>
              </div>
            </div>
            <div className="rf-step__connector" />
            <div className="rf-step">
              <div className="rf-step__num">02</div>
              <div className="rf-step__body">
                <div className="rf-step__title">Await Confirmation</div>
                <p className="rf-step__desc">
                  Our team will confirm receipt of your cancellation request and provide details on
                  credit transfer or refund eligibility based on the cancellation window.
                </p>
              </div>
            </div>
            <div className="rf-step__connector" />
            <div className="rf-step">
              <div className="rf-step__num">03</div>
              <div className="rf-step__body">
                <div className="rf-step__title">Refund Processed</div>
                <p className="rf-step__desc">
                  All refunds will be processed in the second week after the completion of the
                  conference, returned only to the original source account.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 4: Important Notes ── */}
        <div className="rf-section">
          <div className="rf-notes-grid">
            <div className="rf-notes-card">
              <div className="rf-notes-card__header">
                <div className="rf-notes-card__icon">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <span>NOTE</span>
              </div>
              <ul className="rf-notes-card__list">
                <li>
                  <span className="rf-notes-card__bullet">›</span>
                  All kind of refunds will be processed in the second week, after the completion of the conference.
                </li>
                <li>
                  <span className="rf-notes-card__bullet">›</span>
                  Once the Payment is made, refund can be processed only to the Source Account.
                </li>
              </ul>
            </div>

            <div className="rf-contact-card">
              <div className="rf-contact-card__label">Need Help?</div>
              <h3 className="rf-contact-card__title">Get in Touch</h3>
              <p className="rf-contact-card__text">
                For any additional information regarding our refund policy, please email us at
              </p>
              <a href="mailto:contact@wynxtalks.com" className="rf-contact-card__btn">
                contact@wynxtalks.com
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </main>

      <NewFooter />
    </div>
  );
}