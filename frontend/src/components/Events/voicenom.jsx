import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from './conclaveimage2.jpg';
import image2 from './conclaveimage1.jpg';
import image3 from './conclaveimage.jpg';
import image4 from './conclaveimage3.jpg';
import image6 from './conclaveimage4.jpeg';
import newYorkBrochure from './WYNX New York Brochure.pdf';
import TorontoBrochure from './WYNx Toronto Brochure.pdf';
import DubaiBrochure from './WYNx Dubai Brochure.pdf';

const CONFERENCES = [
  { img: image2, name: "QUANTUM Next Gen Women Leadership & Mental Health Conclave 2026", date: "July 20-26, 2026", location: "New York, USA", brochure: newYorkBrochure, brochureName: "WYNx New York Brochure.pdf", agenda: true },
  { img: image4, name: "ASCEND 2026: Rise of Next-Gen Women Leaders in Power, Purpose & Wellbeing", date: "November 09-15, 2026", location: "Toronto, Canada", brochure: TorontoBrochure, brochureName: "WYNx Toronto Brochure.pdf" },
  { img: image3, name: "ARAB WOMEN Hi-RISE CONGRESS", date: "November 23-29, 2026", location: "Dubai, UAE", brochure: DubaiBrochure, brochureName: "WYNx Dubai Brochure.pdf" },
  { img: image6, name: "International Women's Day Congress: A Global Movement for Women's Empowerment & Mental Wellbeing", date: "March 08-14, 2027", location: "Paris, France" },
  { img: image1, name: "International Women's Day Carnival of Leadership, Impact & Innovation", date: "March 02-08, 2026", location: "Paris, France", past: true },
];

const downloadFile = (file, name) => {
  const a = Object.assign(document.createElement('a'), { href: file, download: name });
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
};

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5c518" style={{ marginRight: 4 }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ConferenceCard = ({ img, name, date, location, brochure, brochureName, past, agenda }) => {
  const navigate = useNavigate();
  const s = styles;
  return (
    <div style={s.card}>
      <div style={s.imgWrap}>
        <img src={img} alt={name} style={s.img} />
        <div style={s.overlay} />
        <div style={s.bookmark}><BookmarkIcon /></div>
        {past && <div style={s.pastBadge}>Past Conference</div>}
      </div>
      <div style={s.body}>
        <h3 style={s.title}>{name}</h3>
        <div style={s.infoRow}><span>📅</span><span style={s.infoVal}>{date}</span></div>
        <div style={s.infoRow}><span>📍</span><span style={s.infoVal}>{location}</span></div>
        <div style={s.tags}>
          <span style={s.tag}><StarIcon />4.9</span>
          <span style={s.tag}>Leadership</span>
          <span style={s.tag}>Global</span>
          <span style={s.tag}>Award Winning</span>

        </div>
        {!past && (
          <div style={s.btnRow}>
            {brochure && <button style={s.outBtn} onClick={() => downloadFile(brochure, brochureName)}>Brochure</button>}
            {agenda && <button style={s.outBtn} onClick={() => navigate('/newyorkagenda2026')}>Agenda</button>}
            <button style={s.primBtn} onClick={() => navigate('/awardsnomination')}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

const ConferencePage = () => (
  <div style={styles.page}>
    {CONFERENCES.map((c, i) => <ConferenceCard key={i} {...c} />)}
  </div>
);

const styles = {
  page:     { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px', padding: '60px 40px', backgroundColor: '#f4f6fa', fontFamily: "'Segoe UI', sans-serif" },
  card:     { flex: '0 0 calc(33.33% - 24px)', minWidth: '300px', maxWidth: '380px', borderRadius: '20px', backgroundColor: '#1a2744', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', overflow: 'hidden', display: 'flex', flexDirection: 'column', color: '#fff' },
  imgWrap:  { position: 'relative', height: '200px', overflow: 'hidden', flexShrink: 0 },
  img:      { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  overlay:  { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,20,50,0.10), rgba(10,20,50,0.75))' },
  bookmark: { position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.18)', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  pastBadge:{ position: 'absolute', top: 12, left: 12, background: 'rgba(211,47,47,0.85)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.5px' },
  body:     { padding: 16, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 10 },
  title:    { fontSize: 15, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.4, borderBottom: '1px solid rgba(255,255,255,0.10)', paddingBottom: 10 },
  infoRow:  { display: 'flex', alignItems: 'center', gap: 8 },
  infoVal:  { fontSize: 15, fontWeight: 700, color: '#e8edf8' },
  tags:     { display: 'flex', flexWrap: 'wrap', gap: 8 },
  tag:      { display: 'flex', alignItems: 'center', fontSize: 12, color: '#b0bbcc', background: 'rgba(255,255,255,0.10)', borderRadius: 20, padding: '4px 12px', fontWeight: 500 },
  btnRow:   { display: 'flex', gap: 10, marginTop: 'auto', paddingTop: 6 },
  outBtn:   { flex: 1, padding: '10px 0', borderRadius: 50, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' },
  primBtn:  { flex: 1, padding: '10px 0', borderRadius: 50, background: '#fff', border: 'none', color: '#1a2744', fontSize: 13, fontWeight: 700, cursor: 'pointer' },
};

export default ConferencePage;