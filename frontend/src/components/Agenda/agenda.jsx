import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Pages/NewNavbar/Navbar';
import NewFooter from '../../Pages/Footer/footer';

// ── Agenda images ──
import nyDay1 from './room1agenda.jpeg';
import nyDay2 from './room2agenda.jpeg';
import nyDay3 from './cestagenda.jpeg';
import nyDay4 from './estagenda.jpeg';
import parisDay1 from './Parisagenda2027.jpeg';


const AGENDA_DATA = {
  'wynx-01': {
    name: 'Dubai Conclave',
    location: 'Dubai, UAE',
    headerDates: 'November 18 – 26, 2026',
    tabs: [
      {
        id: 'room-1',
        title: 'Room 1',
        mode: 'In person',
        dateText: 'November 25-26, 2026',
        image: nyDay1,
      },
      {
        id: 'room-2',
        title: 'Room 2',
        mode: 'In person',
        dateText: 'November 25-26, 2026',
        image: nyDay2,
      },
      {
        id: 'cest',
        title: 'CEST',
        mode: 'Virtual',
        dateText: 'November 18, 19 & 20, 2026',
        image: nyDay3,
      },
      {
        id: 'est',
        title: 'EST',
        mode: 'Virtual',
        dateText: 'November 18, 19 & 20, 2026',
        image: nyDay4,
      },
    ],
  },

  'wynx-02': {
    name: 'Paris Conclave',
    location: 'Paris, France',
    headerDates: 'March 08-12, 2026',
    tabs: [
      {
        id: 'day-1',
        title: 'International Women’s Day 2027',
        mode: 'IN-PERSON & VIRTUAL PARTICIPATION',
        dateText: 'March 08-12, 2026',
        image: parisDay1,
      },
    ],
  },

  // ── Add the next conference here when ready ──
};

const Agenda = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = AGENDA_DATA[eventId];

  const [selectedId, setSelectedId] = useState(event ? event.tabs[0].id : null);

  if (!event) {
    return (
      <>
        <Navbar />
        <div style={{ height: 68 }} />
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            background: '#0a1a14',
            padding: '60px 24px',
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Agenda Not Found</h2>
          <p style={{ opacity: 0.7, marginTop: 8 }}>
            This conference's agenda isn't available yet. Please check back soon.
          </p>
          <button
            onClick={() => navigate(-1)}
            style={{
              marginTop: 24,
              padding: '10px 24px',
              background: '#c8922a',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Go Back
          </button>
        </div>
        <NewFooter />
      </>
    );
  }

  const { name, location, headerDates, tabs } = event;
  const selectedIndex = Math.max(0, tabs.findIndex((t) => t.id === selectedId));
  const selectedTab = tabs[selectedIndex];
  const isSingle = tabs.length === 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes agendaFadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes agendaGlowPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(1.08); }
        }
        @keyframes agendaPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: 0.6; }
        }
        @keyframes agendaImageFade {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }

        .agenda-root {
          font-family: 'Inter', sans-serif;
          background: #0a1a14;
          min-height: 100vh;
          color: #fff;
          overflow-x: hidden;
          padding: 60px 24px 80px;
          position: relative;
        }

        /* ── Ambient glows ── */
        .agenda-glow {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          animation: agendaGlowPulse 6s ease-in-out infinite;
          z-index: 0;
        }
        .agenda-glow-1 {
          width: 640px; height: 640px;
          background: radial-gradient(circle, rgba(200,146,42,0.11) 0%, transparent 68%);
          top: -180px; left: -140px;
        }
        .agenda-glow-2 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(200,146,42,0.08) 0%, transparent 68%);
          bottom: -160px; right: -100px;
          animation-delay: 3s;
        }

        /* ── Inner container ── */
        .agenda-container {
          max-width: 980px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          animation: agendaFadeIn 0.7s cubic-bezier(.22,1,.36,1) both;
        }

        /* ── Header ── */
        .agenda-eyebrow {
          text-align: center;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #c8922a;
          text-transform: uppercase;
          margin-bottom: 12px;
          opacity: 0.85;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .agenda-eyebrow-dot {
          width: 6px; height: 6px;
          background: #c8922a;
          border-radius: 50%;
          animation: agendaPulse 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }
        .agenda-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 800;
          text-align: center;
          margin-bottom: 10px;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }
        .agenda-heading span {
          color: #c8922a;
        }
        .agenda-divider {
          width: 48px; height: 3px;
          background: linear-gradient(90deg, #c8922a, rgba(200,146,42,0.15));
          border-radius: 2px;
          margin: 16px auto 40px;
        }

        /* ── Tab buttons ── */
        .agenda-date-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 40px;
        }
        .agenda-date-btn {
          padding: 14px 10px;
          border: 1.5px solid rgba(200,146,42,0.25);
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          background: rgba(200,146,42,0.06);
          color: rgba(255,255,255,0.65);
          transition: all 0.22s ease;
          text-align: center;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }
        .agenda-tab-title {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.3px;
        }
        .agenda-tab-mode {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          opacity: 0.85;
        }
        .agenda-tab-date {
          font-size: 12px;
          font-weight: 500;
          line-height: 1.35;
          opacity: 0.9;
        }
        .agenda-date-btn:hover {
          border-color: rgba(200,146,42,0.55);
          color: #c8922a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        }
        .agenda-date-btn.active {
          background: #c8922a;
          border-color: #c8922a;
          color: #0a1a14;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(200,146,42,0.30);
        }

        /* ── Single-event banner ── */
        .agenda-single {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 24px 32px;
          margin-bottom: 40px;
          border-radius: 18px;
          background:
            linear-gradient(135deg, rgba(200,146,42,0.16) 0%, rgba(200,146,42,0.04) 60%),
            #0f2019;
          border: 1px solid rgba(200,146,42,0.35);
          box-shadow: 0 18px 50px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05);
          position: relative;
          overflow: hidden;
        }
        .agenda-single::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #e0a93b, #c8922a, rgba(200,146,42,0.2));
        }
        .agenda-single-icon {
          width: 60px; height: 60px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 16px;
          color: #0a1a14;
          background: linear-gradient(135deg, #e0a93b, #c8922a);
          box-shadow: 0 8px 24px rgba(200,146,42,0.35);
        }
        .agenda-single-body { flex: 1; min-width: 0; }
        .agenda-single-kicker {
          display: block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #c8922a;
          margin-bottom: 4px;
        }
        .agenda-single-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 2.6vw, 30px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 12px;
          line-height: 1.2;
        }
        .agenda-single-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .agenda-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 5px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #f0c46a;
          background: rgba(200,146,42,0.12);
          border: 1px solid rgba(200,146,42,0.35);
        }
        .agenda-chip-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #c8922a;
          animation: agendaPulse 1.8s ease-in-out infinite;
        }
        .agenda-single-date {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          text-align: right;
          padding-left: 24px;
          border-left: 1px solid rgba(200,146,42,0.25);
          gap: 3px;
        }
        .agenda-single-date-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .agenda-single-date strong {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          white-space: nowrap;
        }
        .agenda-single-date-loc { font-size: 12px; color: #c8922a; font-weight: 600; }

        /* ── Image card ── */
        .agenda-image-card {
          background: #0f2019;
          border: 1px solid rgba(200,146,42,0.18);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.55);
          position: relative;
        }
        .agenda-image-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #c8922a, transparent);
          opacity: 0.7;
        }
        .agenda-image-wrap {
          padding: 20px;
        }
        .agenda-image {
          width: 100%;
          max-height: 88vh;
          object-fit: contain;
          display: block;
          border-radius: 12px;
          animation: agendaImageFade 0.45s cubic-bezier(.22,1,.36,1) both;
        }
        .agenda-image-placeholder {
          width: 100%;
          min-height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.5);
          gap: 10px;
          text-align: center;
          padding: 40px 20px;
        }
        .agenda-image-placeholder strong {
          color: #c8922a;
          font-size: 15px;
        }

        /* ── Footer row ── */
        .agenda-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px 20px;
          border-top: 1px solid rgba(200,146,42,0.1);
        }
        .agenda-footer-label {
          font-size: 12px;
          font-weight: 600;
          color: #c8922a;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .agenda-footer-label svg {
          opacity: 0.8;
        }
        .agenda-day-badge {
          background: rgba(200,146,42,0.1);
          border: 1px solid rgba(200,146,42,0.3);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 700;
          color: #c8922a;
          letter-spacing: 0.5px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .agenda-root { padding: 40px 16px 64px; }
          .agenda-date-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .agenda-image-wrap { padding: 12px; }
          .agenda-footer-row { flex-direction: column; gap: 10px; align-items: flex-start; }

          .agenda-single {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 22px 20px 22px 24px;
          }
          .agenda-single-date {
            align-items: flex-start;
            text-align: left;
            padding: 14px 0 0;
            border-left: none;
            border-top: 1px solid rgba(200,146,42,0.25);
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          .agenda-date-grid { grid-template-columns: 1fr 1fr; }
          .agenda-date-btn { padding: 11px 8px; }
          .agenda-tab-title { font-size: 14px; }
          .agenda-tab-date { font-size: 11px; }
        }
      `}</style>

      <Navbar />
      <div style={{ height: 68 }} />

      <div className="agenda-root">
        <div className="agenda-glow agenda-glow-1" />
        <div className="agenda-glow agenda-glow-2" />

        <div className="agenda-container">
          <div className="agenda-eyebrow">
            <span className="agenda-eyebrow-dot" />
            {location.toUpperCase()} — {headerDates}
          </div>
          <h1 className="agenda-heading">
            {name} <span>Agenda</span>
          </h1>
          <div className="agenda-divider" />

          {/* Tab selector / single-event banner */}
          {isSingle ? (
            <div className="agenda-single">
              <div className="agenda-single-icon">
                <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
                  <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
                  <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" />
                </svg>
              </div>

              <div className="agenda-single-body">
                <span className="agenda-single-kicker">Event Scheduled on</span>
                <h2 className="agenda-single-title">{selectedTab.title}</h2>
                <div className="agenda-single-chips">
                  {selectedTab.mode
                    .split('&')
                    .map((m) => m.trim())
                    .filter(Boolean)
                    .map((m) => (
                      <span key={m} className="agenda-chip">
                        <i className="agenda-chip-dot" />
                        {m}
                      </span>
                    ))}
                </div>
              </div>

              <div className="agenda-single-date">
                <span className="agenda-single-date-label">Dates</span>
                <strong>{selectedTab.dateText}</strong>
                <span className="agenda-single-date-loc">{location}</span>
              </div>
            </div>
          ) : (
            <div className="agenda-date-grid">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`agenda-date-btn${selectedTab.id === tab.id ? ' active' : ''}`}
                  onClick={() => setSelectedId(tab.id)}
                >
                  <span className="agenda-tab-title">{tab.title}</span>
                  <span className="agenda-tab-mode">{tab.mode}</span>
                  <span className="agenda-tab-date">{tab.dateText}</span>
                </button>
              ))}
            </div>
          )}

          {/* Agenda image card */}
          <div className="agenda-image-card">
            <div className="agenda-image-wrap">
              {selectedTab.image ? (
                <img
                  key={selectedTab.id}
                  src={selectedTab.image}
                  alt={`${selectedTab.title} ${selectedTab.mode} Agenda`}
                  className="agenda-image"
                />
              ) : (
                <div className="agenda-image-placeholder">
                  <strong>Agenda coming soon</strong>
                  <span>
                    The schedule for {selectedTab.title} ({selectedTab.mode}) hasn't been published yet.
                  </span>
                </div>
              )}
            </div>

            {/* Footer row only for multi-tab events (banner already shows this info for single events) */}
            {!isSingle && (
              <div className="agenda-footer-row">
                <div className="agenda-footer-label">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/>
                    <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/>
                    <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/>
                  </svg>
                  {selectedTab.dateText}
                </div>
                <div className="agenda-day-badge">
                  {selectedTab.title} · {selectedTab.mode}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <NewFooter />
    </>
  );
};

export default Agenda;