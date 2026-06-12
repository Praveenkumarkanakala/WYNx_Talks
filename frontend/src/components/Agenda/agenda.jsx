import React, { useState } from 'react';
import Navbar from '../../Pages/NewNavbar/Navbar';
import NewFooter from '../../Pages/Footer/footer';

import day1 from './agenda-day1.jpg';
import day2 from './agenda-day2.jpg';
import day3 from './agenda-day3.jpg';
import day4 from './agenda-day4.jpg';
import day5 from './agenda-day5.jpg';
import day6 from './agenda-day6.jpg';
import day7 from './agenda-day7.jpg';

const Agenda = () => {
  const dates = [
    'July 20, 2026',
    'July 21, 2026',
    'July 22, 2026',
    'July 23, 2026',
    'July 24, 2026',
    'July 25, 2026',
    'July 26, 2026',
  ];

  const agendaImages = {
    'July 20, 2026': day1,
    'July 21, 2026': day2,
    'July 22, 2026': day3,
    'July 23, 2026': day4,
    'July 24, 2026': day5,
    'July 25, 2026': day6,
    'July 26, 2026': day7,
  };

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  return (
    <>
      {/* Inject Google Fonts + keyframes via a style tag */}
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

        /* ── Date buttons ── */
        .agenda-date-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 40px;
        }
        .agenda-date-btn {
          padding: 13px 10px;
          border: 1.5px solid rgba(200,146,42,0.25);
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          background: rgba(200,146,42,0.06);
          color: rgba(255,255,255,0.65);
          transition: all 0.22s ease;
          letter-spacing: 0.2px;
          line-height: 1.4;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .agenda-date-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(200,146,42,0.0);
          transition: background 0.22s;
          border-radius: inherit;
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
          font-weight: 700;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(200,146,42,0.30);
        }

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
        }
        @media (max-width: 480px) {
          .agenda-date-grid { grid-template-columns: 1fr 1fr; }
          .agenda-date-btn { font-size: 12px; padding: 11px 8px; }
        }
      `}</style>

      <Navbar />
      {/* Push content below fixed navbar (68px height) */}
      <div style={{ height: 68 }} />

      <div className="agenda-root">
        {/* Ambient glows */}
        <div className="agenda-glow agenda-glow-1" />
        <div className="agenda-glow agenda-glow-2" />

        <div className="agenda-container">
          {/* Header */}
          <div className="agenda-eyebrow">
            <span className="agenda-eyebrow-dot" />
            NEW YORK, USA — JULY 20–26, 2026
          </div>
          <h1 className="agenda-heading">
            New York Conclave <span>Agenda</span> 2026
          </h1>
          <div className="agenda-divider" />

          {/* Date selector */}
          <div className="agenda-date-grid">
            {dates.map((date, idx) => (
              <button
                key={date}
                className={`agenda-date-btn${selectedDate === date ? ' active' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                Day {idx + 1}<br />{date}
              </button>
            ))}
          </div>

          {/* Agenda image card */}
          <div className="agenda-image-card">
            <div className="agenda-image-wrap">
              <img
                key={selectedDate}
                src={agendaImages[selectedDate]}
                alt={`${selectedDate} Agenda`}
                className="agenda-image"
              />
            </div>
            <div className="agenda-footer-row">
              <div className="agenda-footer-label">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/>
                  <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round"/>
                </svg>
                {selectedDate}
              </div>
              <div className="agenda-day-badge">
                Day {dates.indexOf(selectedDate) + 1} of {dates.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewFooter />
    </>
  );
};

export default Agenda;