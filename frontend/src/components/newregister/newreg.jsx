import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroimg from "./Heroimage.png";
import Navbar from '../../Pages/NewNavbar/Navbar';
import NewFooter from '../../Pages/Footer/footer';

const JobApplicationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subscribeNewsletter: '',
    benefitChoice: '',
    otherBenefit: ''
  });

  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const [magazineFeatureTopic, setMagazineFeatureTopic] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkshopToggle = (workshopName) => {
    const isSelected = selectedWorkshops.includes(workshopName);
    let updated = isSelected
      ? selectedWorkshops.filter(w => w !== workshopName)
      : [...selectedWorkshops, workshopName];

    if (!isSelected && updated.length > 3) {
      alert("You can select up to 3 workshops only.");
      return;
    }

    setSelectedWorkshops(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName.trim()) { alert('Please enter your first name.'); return; }
    if (!formData.lastName.trim()) { alert('Please enter your last name.'); return; }
    if (!formData.email.trim()) { alert('Please enter your email.'); return; }
    if (!formData.phone.trim()) { alert('Please enter your phone number.'); return; }
    if (formData.subscribeNewsletter === '') { alert('Please select whether you want to subscribe to our newsletter.'); return; }
    if (formData.benefitChoice === '') { alert('Please select what will benefit you most.'); return; }
    if (formData.benefitChoice === 'other' && !formData.otherBenefit.trim()) { alert('Please specify your "Other" benefit.'); return; }
    if (selectedWorkshops.length === 0) { alert('Please select at least one workshop (up to 3).'); return; }
    if (selectedWorkshops.length > 3) { alert('You cannot select more than 3 workshops.'); return; }
    if (!magazineFeatureTopic) { alert('Please select your favorite WINSPIRE Magazine topic.'); return; }

    const submissionData = { ...formData, selectedWorkshops, magazineFeatureTopic };
    navigate('/preview', { state: { submissionData } });
  };

  return (
    <>
      <Navbar />
      {/* Push content below fixed navbar */}
      <div style={{ height: 68 }} />

      <div style={styles.pageRoot}>

        {/* ════ HERO SECTION ════ */}
        <section style={styles.hero}>
          <div style={styles.heroCornerTL} />
          <div style={styles.heroCornerBR} />

          <div style={styles.heroInner}>

            {/* Left — text */}
            <div style={styles.heroLeft}>
              <div style={styles.heroEyebrow}>
                <span style={styles.heroEyebrowDot} />
                REGISTRATION NOW OPEN
              </div>
              <h1 style={styles.heroTitle}>
                WYNx <span style={styles.heroAccent}>Award Winning</span> Talks
              </h1>
              <div style={styles.heroDivider} />
              <p style={styles.heroSub}>
                WYNx Talks brings together thought leaders, innovators, and award-winning professionals to inspire change and drive progress.
              </p>
              <p style={styles.heroSub2}>
                Secure your spot today and gain access to world-class networking, knowledge-sharing, and recognition opportunities.
              </p>
            </div>

            {/* Right — trophy image */}
            <div style={styles.heroRight}>
              <div style={styles.heroImgWrap}>
                <div style={styles.heroImgRing1} />
                <div style={styles.heroImgRing2} />
                <img
                  src={heroimg}
                  alt="WYNx Award Trophy"
                  style={styles.heroImg}
                />
              </div>
            </div>

          </div>
        </section>

        {/* ════ FORM SECTION — cream background ════ */}
        <div style={styles.container}>
          <div style={styles.formContainer}>

            <h1 style={styles.title}>Next Gen Women Leadership Summit 2026</h1>

            <div style={styles.introContent}>
              <div style={styles.liveInterviewBox}>
                <h2 style={styles.liveTitle}>
                  🎙️ Don't Miss the Live Interview!
                </h2>
                <p style={styles.liveText}>
                  We're bringing this feature to life with a live interview featuring incredible women.
                  They'll share their journeys, challenges, and insights on breaking barriers in their industries.
                  Stay tuned for details!
                </p>
              </div>

              <div style={styles.magazineBox}>
                <h3 style={styles.magazineTitle}>Explore the WINSPIRE Magazine Online</h3>
                <p style={styles.magazineText}>
                  This is just one of the many powerful stories featured in <strong>WINSPIRE Magazine Volumes</strong>.
                </p>
                <a href="https://www.winspire.live/"  target="_blank" rel="noopener noreferrer" style={styles.exploreButton}  >   Explore  </a>
              </div>
            </div>

            {/* Name */}
            <div style={styles.fieldGroup}>
              <div style={styles.fieldLabel}>Name</div>
              <div style={styles.nameFields}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div style={styles.fieldRow}>
              <div style={styles.fieldColumn}>
                <div style={styles.fieldLabel}>Email</div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              </div>
              <div style={styles.fieldColumn}>
                <div style={styles.fieldLabel}>Phone</div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(###) ###-####"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.inputField}
                />
              </div>
            </div>

            {/* Newsletter */}
            <div style={styles.fieldGroup}>
              <div style={styles.fieldLabel}>* Would you like to subscribe to our newsletter?</div>
              <div style={styles.radioGroupHorizontal}>
                <div style={styles.radioOptionInline}>
                  <input
                    type="radio"
                    id="subscribeYes"
                    name="subscribeNewsletter"
                    value="yes"
                    checked={formData.subscribeNewsletter === 'yes'}
                    onChange={handleRadioChange}
                    style={styles.radioInput}
                  />
                  <label htmlFor="subscribeYes" style={styles.radioLabel}>Yes</label>
                </div>
                <div style={styles.radioOptionInline}>
                  <input
                    type="radio"
                    id="subscribeNo"
                    name="subscribeNewsletter"
                    value="no"
                    checked={formData.subscribeNewsletter === 'no'}
                    onChange={handleRadioChange}
                    style={styles.radioInput}
                  />
                  <label htmlFor="subscribeNo" style={styles.radioLabel}>No</label>
                </div>
              </div>
            </div>

            {/* Benefit Choice */}
            <div style={styles.fieldGroup}>
              <div style={styles.fieldLabel}>* What will be the most benefit to you right now?</div>
              <div style={styles.benefitGrid}>
                {[
                  { value: 'industryPanels', label: 'Industry Panels' },
                  { value: 'professionalDevelopment', label: 'Professional Development' },
                  { value: 'networking', label: 'Networking' },
                  { value: 'teamBuilding', label: 'Team Building' },
                  { value: 'other', label: 'Other' }
                ].map((option) => (
                  <div key={option.value} style={styles.benefitCard}>
                    <div style={styles.benefitRadio}>
                      <input
                        type="radio"
                        id={`benefit-${option.value}`}
                        name="benefitChoice"
                        value={option.value}
                        checked={formData.benefitChoice === option.value}
                        onChange={handleRadioChange}
                        style={styles.radioInput}
                      />
                      <label htmlFor={`benefit-${option.value}`} style={styles.radioLabel}>
                        {option.label}
                      </label>
                    </div>
                    {option.value === 'other' && formData.benefitChoice === 'other' && (
                      <input
                        type="text"
                        name="otherBenefit"
                        value={formData.otherBenefit}
                        onChange={handleInputChange}
                        placeholder="Please specify"
                        style={{ ...styles.inputField, marginTop: '8px', width: '100%', height: '15px' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Workshops */}
            <div style={styles.fieldGroup}>
              <div style={styles.fieldLabel}>* Select 3 workshops you would most like to attend</div>
              <div style={styles.workshopGrid}>
                {[
                  { name: 'The State of the Market' },
                  { name: 'Dare to Live the Life You Dream Of' },
                  { name: 'Reclaim Your Confidence, Increase Your Energy, and Take Control of Your Health' },
                  { name: 'Be Seen Be Heard: Empowering your voice and elevating your presence!' },
                  { name: 'Valuing Your Worth' },
                  { name: 'Protect Your Energy, Lead Your Life' },
                  { name: 'The Transformative Power of True Leadership' },
                  { name: 'Unlocking the Joy of Being Present' }
                ].map((workshop, index) => (
                  <div key={index} style={styles.workshopCard}>
                    <div style={styles.workshopCheckboxWrapper}>
                      <input
                        type="checkbox"
                        id={`workshop-${index}`}
                        checked={selectedWorkshops.includes(workshop.name)}
                        onChange={() => handleWorkshopToggle(workshop.name)}
                        style={styles.checkboxInput}
                      />
                      <label htmlFor={`workshop-${index}`} style={styles.checkboxLabel}>
                        {workshop.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Magazine Topic */}
            <div style={styles.fieldGroup}>
              <div style={styles.fieldLabel}>
                * Feature you in WINSPIRE Magazine and what is your favourite topic?
              </div>
              <div style={styles.magazineTopicGrid}>
                {[
                  { value: 'trailblazingWomen', label: 'Trailblazing Women' },
                  { value: 'genderEquity', label: 'Gender Equity' },
                  { value: 'leadership', label: 'Leadership' },
                  { value: 'mentoring', label: 'Mentoring' },
                  { value: 'books', label: 'Books' },
                  { value: 'productsWeLove', label: 'Products We Love' }
                ].map((topic) => (
                  <div key={topic.value} style={styles.magazineTopicCard}>
                    <div style={styles.magazineTopicRadio}>
                      <input
                        type="radio"
                        id={`topic-${topic.value}`}
                        name="magazineFeatureTopic"
                        value={topic.value}
                        checked={magazineFeatureTopic === topic.value}
                        onChange={(e) => setMagazineFeatureTopic(e.target.value)}
                        style={styles.radioInput}
                      />
                      <label htmlFor={`topic-${topic.value}`} style={styles.radioLabel}>
                        {topic.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" onClick={handleSubmit} style={styles.applyButton}>
              Enter To WYNx →
            </button>

          </div>
        </div>

      </div>

      <NewFooter />
    </>
  );
};

const styles = {

  /* ─── Page root ─────────────────────────────────────── */
  pageRoot: {
    minHeight: '100vh',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },

  /* ─── Hero — dark green ─────────────────────────────── */
  hero: {
    background: '#0a1a14',
    position: 'relative',
    padding: '80px 40px 72px',
    overflow: 'hidden',
    borderBottom: '1px solid rgba(200,146,42,0.15)',
  },

  heroCornerTL: {
    position: 'absolute',
    top: 0, left: 0,
    width: '180px', height: '180px',
    borderTop: '1.5px solid rgba(200,146,42,0.2)',
    borderLeft: '1.5px solid rgba(200,146,42,0.2)',
    borderRadius: '0 0 100% 0',
    pointerEvents: 'none',
  },

  heroCornerBR: {
    position: 'absolute',
    bottom: 0, right: 0,
    width: '180px', height: '180px',
    borderBottom: '1.5px solid rgba(200,146,42,0.2)',
    borderRight: '1.5px solid rgba(200,146,42,0.2)',
    borderRadius: '100% 0 0 0',
    pointerEvents: 'none',
  },

  heroInner: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
  },

  heroLeft: { flex: '1', minWidth: 0 },

  heroEyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '3px',
    color: '#c8922a',
    textTransform: 'uppercase',
    marginBottom: '20px',
    padding: '6px 14px',
    border: '1px solid rgba(200,146,42,0.3)',
    borderRadius: '20px',
    background: 'rgba(200,146,42,0.06)',
  },

  heroEyebrowDot: {
    width: '6px', height: '6px',
    borderRadius: '50%',
    background: '#c8922a',
    display: 'inline-block',
  },

  heroTitle: {
    fontSize: 'clamp(32px, 4vw, 52px)',
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: '1.2',
    marginBottom: '20px',
    letterSpacing: '-0.5px',
  },

  heroAccent: { color: '#c8922a' },

  heroDivider: {
    width: '48px', height: '2px',
    background: '#c8922a',
    borderRadius: '2px',
    marginBottom: '24px',
    opacity: '0.7',
  },

  heroSub: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: '1.8',
    marginBottom: '12px',
    maxWidth: '480px',
  },

  heroSub2: {
    fontSize: '14px',
    color: 'rgba(200,146,42,0.7)',
    lineHeight: '1.8',
    marginBottom: '36px',
    maxWidth: '480px',
    fontStyle: 'italic',
    paddingLeft: '14px',
    borderLeft: '2px solid rgba(200,146,42,0.35)',
  },

  heroStats: { display: 'flex', alignItems: 'center', gap: '0' },

  heroStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 24px',
  },

  heroStatVal: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#c8922a',
    lineHeight: '1.1',
  },

  heroStatLbl: {
    fontSize: '11px',
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginTop: '4px',
  },

  heroStatDivider: {
    width: '1px', height: '36px',
    background: 'rgba(200,146,42,0.25)',
  },

  heroRight: {
    flex: '0 0 360px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroImgWrap: {
    position: 'relative',
    width: '300px', height: '340px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroImgRing1: {
    position: 'absolute',
    width: '300px', height: '300px',
    borderRadius: '50%',
    border: '1px solid rgba(200,146,42,0.15)',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  heroImgRing2: {
    position: 'absolute',
    width: '220px', height: '220px',
    borderRadius: '50%',
    border: '1px solid rgba(200,146,42,0.1)',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  heroImg: {
    width: '260px',
    height: 'auto',
    objectFit: 'contain',
    position: 'relative',
    zIndex: 1,
    filter: 'drop-shadow(0 20px 40px rgba(200,146,42,0.18))',
  },

  /* ─── Form section — cream background ──────────────── */
  container: {
    background: '#fdf6ee',                          /* warm cream */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '48px 20px 64px',
    boxSizing: 'border-box',
  },

  formContainer: {
    background: '#ffffff',                          /* white card on cream */
    borderRadius: '16px',
    padding: '36px',
    width: '100%',
    maxWidth: '800px',
    boxShadow: '0 8px 40px rgba(200,146,42,0.10), 0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid rgba(200,146,42,0.2)',
  },

  title: {
    color: '#c8922a',
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '16px',
    fontWeight: '900',
  },

  introContent: {
    marginBottom: '30px',
    padding: '20px',
    borderRadius: '12px',
    background: 'rgba(200,146,42,0.06)',
    border: '1px solid rgba(200,146,42,0.2)',
    textAlign: 'center',
  },

  liveInterviewBox: { marginBottom: '20px' },

  liveTitle: {
    color: '#b87d1e',                               /* deeper gold on light bg */
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '12px',
    lineHeight: 1.3,
  },

  liveText: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#3a3a3a',
  },

  magazineBox: {},

  magazineTitle: {
    color: '#c8922a',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
  },

  magazineText: {
    fontSize: '16px',
    lineHeight: 1.6,
    color: '#3a3a3a',
  },

  exploreButton: {
    display: 'inline-block',
    padding: '12px 32px',
    backgroundColor: '#c8922a',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },

  fieldGroup: { marginBottom: '22px' },
  fieldLabel: { color: '#c8922a', fontSize: '15px', marginBottom: '10px', fontWeight: '600' },
  nameFields: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  fieldRow: { display: 'flex', gap: '15px', marginBottom: '22px', flexWrap: 'wrap' },
  fieldColumn: { flex: '1 1 280px', minWidth: '0' },

  inputField: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1.5px solid rgba(200,146,42,0.35)',
    backgroundColor: '#fdf6ee',                     /* cream input bg */
    color: '#1a1a1a',                               /* dark text */
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },

  radioGroupHorizontal: { display: 'flex', gap: '20px', alignItems: 'center' },
  radioOptionInline: { display: 'flex', alignItems: 'center', gap: '8px' },
  radioInput: { accentColor: '#c8922a' },
  radioLabel: { color: '#1a1a1a', fontSize: '15px' },  /* dark text on cream */

  benefitGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  benefitCard: {
    border: '1.5px solid rgba(200,146,42,0.25)',
    borderRadius: '8px',
    padding: '12px',
    backgroundColor: '#fdf6ee',
    transition: 'background 0.2s ease',
  },
  benefitRadio: { display: 'flex', alignItems: 'center', gap: '8px' },

  workshopGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px',
  },
  workshopCard: {
    border: '1.5px solid rgba(200,146,42,0.25)',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fdf6ee',
    transition: 'background 0.2s ease',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  workshopCheckboxWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    width: '100%',
  },
  checkboxInput: {
    marginTop: '4px',
    width: '18px',
    height: '18px',
    accentColor: '#c8922a',
  },
  checkboxLabel: {
    color: '#1a1a1a',                               /* dark text on cream */
    fontSize: '15px',
    lineHeight: 1.4,
    flex: 1,
  },

  magazineTopicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px',
  },
  magazineTopicCard: {
    border: '1.5px solid rgba(200,146,42,0.25)',
    borderRadius: '8px',
    padding: '12px',
    backgroundColor: '#fdf6ee',
    transition: 'background 0.2s ease',
  },
  magazineTopicRadio: { display: 'flex', alignItems: 'center', gap: '10px' },

  applyButton: {
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#c8922a',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
    letterSpacing: '0.3px',
  },
};

export default JobApplicationForm;