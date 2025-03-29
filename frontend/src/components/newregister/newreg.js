import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newreg.css';
import summitImage from '../images/education.jpg';

const LeadershipSummit = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      if (type === 'checkbox') {
        const existingValues = prevData[name] || [];
        return {
          ...prevData,
          [name]: checked
            ? [...existingValues, value]
            : existingValues.filter((v) => v !== value),
        };
      }
      return { ...prevData, [name]: type === 'radio' ? value : value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate workshop selection
    const selectedWorkshops = formData.workshops || [];
    if (selectedWorkshops.length !== 3) {
      alert('Please select exactly 3 workshops.');
      return;
    }
  
    // Validate 'other' benefit input
    if (formData.benefit === 'other' && !formData['benefit-other']) {
      alert('Please specify your other benefit.');
      return;
    }
  
    // Navigate to the preview page with form data
    navigate('/preview', { state: { formData } });
  };

  return (
    <div className="summit-container">
      <header className="summit-header">
        <h1>WIN A Ticket to the Leadership Summit: Women in Finance, Insurance & Super</h1>
      </header>
      <div className="summit-main">
        <section className="summit-info">
          <div>
            <h3>LEADERSHIP SUMMIT <br />WOMEN IN FINANCE</h3>
            <h3>INSURANCE & SUPER</h3>
          </div>
          <img src={summitImage} alt="Leadership Summit" />
        </section>
        <section className="summit-details">
          <h2>Don’t Miss the Live Interview!</h2>
          <p>We’re bringing this feature to life with a live interview featuring incredible women. They’ll share their journeys, challenges, and insights on breaking barriers in their industries. Stay tuned for details!</p>
          <h2>Explore the WINSPIRE Magazine Online</h2>
          <h2>This is just one of the many powerful stories featured in WINSPIRE Magazine Volumes.</h2>
          <div className="enter-to-win">
            <button>Learn More</button>
          </div>
        </section>
        <section className="summit-form">
          <h2>Enter to Win</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">* First Name:</label>
                <input type="text" id="firstName" name="firstName" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">* Last Name:</label>
                <input type="text" id="lastName" name="lastName" required onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">* Email:</label>
                <p>The winner will be contacted by email.</p>
                <input type="email" id="email" name="email" required onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">* Phone Number:</label>
                <p>The winner will be contacted by phone.</p>
                <input type="tel" id="phone" name="phone" required onChange={handleChange} />
              </div>
            </div>
            <div className="social-newsletter-row">
              <div className="form-group">
                <label>* Would you like to subscribe to our newsletter?</label>
                <div className="form-row">
                  <label>
                    <input type="radio" name="newsletter" value="yes" onChange={handleChange} /> Yes
                  </label>
                  <label>
                    <input type="radio" name="newsletter" value="no" onChange={handleChange} /> No
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>* What will be the most benefit to you right now?</label>
              <div className="benefit-options">
                {["industry-panels", "professional-development", "networking", "team-building", "other"].map((val, i) => (
                  <label key={i}>
                    <input type="radio" name="benefit" value={val} required onChange={handleChange} />
                    {val.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    {val === "other" && <input type="text" name="benefit-other" onChange={handleChange} />}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-container">
              <label>* Select 3 workshops you would most like to attend</label>
              <div className="checkbox-group">
                {["The State of the Market", "From Fraud to Fabulous", "Reclaim Your Confidence, Increase Your Energy, and Take Control of Your Health", "Be Seen Be Heard: Empowering your voice and elevating your presence!", "Valuing Your Worth"].map((val, i) => (
                  <label key={i} className="checkbox-label">
                    <input type="checkbox" name="workshops" value={val} onChange={handleChange} />
                    {val}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>* Feature you in WINSPIRE Magazine and what is your favourite topic?</label>
              <div className="benefit-options">
              {["Trailblazing Women", "Gender Equity", "Leadership", "Mentoring", "Books", "Products We Love"].map((val, i) => (
                  <label key={i}>
                    <input type="radio" name="featureTopic" value={val} required onChange={handleChange} />
                    {val.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                ))}
              </div>
            </div>
            <button className="enterbutton" type="submit">Enter To Win</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LeadershipSummit;