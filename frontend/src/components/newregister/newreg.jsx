import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    // === VALIDATION ===
    if (!formData.firstName.trim()) {
      alert('Please enter your first name.');
      return;
    }
    if (!formData.lastName.trim()) {
      alert('Please enter your last name.');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email.');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number.');
      return;
    }
    if (formData.subscribeNewsletter === '') {
      alert('Please select whether you want to subscribe to our newsletter.');
      return;
    }
    if (formData.benefitChoice === '') {
      alert('Please select what will benefit you most.');
      return;
    }
    if (formData.benefitChoice === 'other' && !formData.otherBenefit.trim()) {
      alert('Please specify your "Other" benefit.');
      return;
    }
    if (selectedWorkshops.length === 0) {
      alert('Please select at least one workshop (up to 3).');
      return;
    }
    if (selectedWorkshops.length > 3) {
      alert('You cannot select more than 3 workshops.');
      return;
    }
    if (!magazineFeatureTopic) {
      alert('Please select your favorite WINSPIRE Magazine topic.');
      return;
    }

    const submissionData = {
      ...formData,
      selectedWorkshops,
      magazineFeatureTopic
    };

    navigate('/preview', { state: { submissionData } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>

        <h1 style={styles.title}>Next Gen Women Leadership Summit 2026</h1>

        <div style={styles.introContent}>
          <div style={styles.liveInterviewBox}>
            <h2 style={styles.liveTitle}>
              🎙️ Don’t Miss the Live Interview!
            </h2>
            <p style={styles.liveText}>
              We’re bringing this feature to life with a live interview featuring incredible women. 
              They’ll share their journeys, challenges, and insights on breaking barriers in their industries. 
              Stay tuned for details!
            </p>
          </div>

          <div style={styles.magazineBox}>
            <h3 style={styles.magazineTitle}>Explore the WINSPIRE Magazine Online</h3>
            <p style={styles.magazineText}>
              This is just one of the many powerful stories featured in <strong>WINSPIRE Magazine Volumes</strong>.
            </p>
            <a
              href="https://www.winspire.live/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.exploreButton}
            >
              Explore
            </a>
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
                    style={{
                      ...styles.inputField,
                      marginTop: '8px',
                      width: '100%',
                      height: '15px'
                    }}
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

        {/* 🔻 reCAPTCHA SECTION REMOVED 🔻 */}

        <button type="button" onClick={handleSubmit} style={styles.applyButton}>
          Enter To WYNx →
        </button>
      </div>
    </div>
  );
};

// ✅ Styles (unchanged, but you may optionally remove recaptcha-related styles)
const styles = {
  container: {
    background: 'linear-gradient(135deg, #1a1a40, #2d2d6a)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    boxSizing: 'border-box'
  },

  formContainer: {
    background: 'rgba(30, 30, 70, 0.85)',
    borderRadius: '16px',
    padding: '30px',
    width: '100%',
    maxWidth: '800px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },


  title: {
    color: '#ff9900',
    fontSize: '32px',
    textAlign: 'center',
    marginBottom: '16px',
    fontWeight: '900'
  },

  introContent: {
    marginBottom: '30px',
    padding: '20px',
    borderRadius: '12px',
    background: 'rgba(255, 153, 0, 0.05)',
    border: '1px solid rgba(255, 153, 0, 0.2)',
    textAlign: 'center'
  },

  liveInterviewBox: {
    marginBottom: '20px'
  },

  liveTitle: {
    color: '#ffcc66',
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '12px',
    lineHeight: 1.3
  },

  liveText: {
    fontSize: '16px',
    lineHeight: 1.6,
    opacity: 0.9
  },

  magazineBox: {},

  magazineTitle: {
    color: '#ff9900',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px'
  },

  magazineText: {
    fontSize: '16px',
    lineHeight: 1.6,
    opacity: 0.85
  },
  exploreButton: {
    display: 'inline-block',
    padding: '12px 32px',
    backgroundColor: '#e74c3c',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },

  fieldGroup: { marginBottom: '22px' },
  fieldLabel: { color: '#ff9900', fontSize: '16px', marginBottom: '10px', fontWeight: '500' },
  nameFields: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  fieldRow: { display: 'flex', gap: '15px', marginBottom: '22px', flexWrap: 'wrap' },
  fieldColumn: { flex: '1 1 280px', minWidth: '0' },
  inputField: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '2px solid #4a4a7a',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    color: '#ffffff',
    fontSize: '16px',
    outline: 'none'
  },
  radioGroupHorizontal: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  radioOptionInline: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  benefitGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  benefitCard: {
    border: '1px solid #4a4a7a',
    borderRadius: '8px',
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    transition: 'background 0.2s ease'
  },
  benefitRadio: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  workshopGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px'
  },
workshopCard: {
  border: '1px solid #4a4a7a',
  borderRadius: '8px',
  padding: '16px', 
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
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
    accentColor: '#ff9900'
  },
checkboxLabel: {
  color: '#ffffff',
  fontSize: '15px',
  lineHeight: 1.4,
  flex: 1, // allows label to grow and wrap neatly
},
  magazineTopicGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '12px'
  },
  magazineTopicCard: {
    border: '1px solid #4a4a7a',
    borderRadius: '8px',
    padding: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    transition: 'background 0.2s ease'
  },
  magazineTopicRadio: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },

  applyButton: {
    width: '100%',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#ff9900',
    color: '#1a1a40',
    fontSize: '18px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px'
  }
};

export default JobApplicationForm;