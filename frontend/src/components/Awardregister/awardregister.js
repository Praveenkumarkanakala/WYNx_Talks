
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './awardregister.css';
import summitImage from '../images/education.jpg';

const LeadershipSummit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const billingDetails = {
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      address: { line1: "123 Street", city: "City", state: "State", postal_code: "12345", country: "US" }
    };
  
    try {
      const response = await fetch('https://wynxtalks.com/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 999, billingDetails }),
      });
  
      const data = await response.json();
      if (data.clientSecret) {
        navigate(`/checkout?clientSecret=${data.clientSecret}`);
      } else {
        alert('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error processing payment. Try again.');
    } finally {
      setLoading(false);
    }
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
          <p>We’re bringing this feature to life with a live interview featuring you as incredible women.</p>
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
                  <label><input type="radio" name="newsletter" value="yes" /> Yes</label>
                  <label><input type="radio" name="newsletter" value="no" /> No</label>
                </div>
              </div>
              <div className="form-group">
                <label>Like our Facebook Page to get the latest news and offers:</label>
              
              </div>
            </div>

            <div className="form-group">
              <label>* What will be the most benefit to you right now?</label>
              <div className="benefit-options">
                {["industry-panels", "professional-development", "networking", "team-building", "other"].map((val, i) => (
                  <label key={i}>
                    <input type="radio" name="benefit" value={val} required />
                    {val.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    {val === "other" && <input type="text" name="benefit-other" />}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-container">
              <label>* Select 3 workshops you would most like to talk</label>
              <div className="checkbox-group">
                {["The State of the Market", "Reclaim Your Confidence, Increase Your Energy, and Take Control of Your Health", "Be Seen Be Heard: Empowering your voice and elevating your presence!", "Valuing Your Worth"].map((val, i) => (
                  <label key={i} className="checkbox-label">
                    <input type="checkbox" name="magazineTopic" value={val} required />
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
                    <input type="radio" name="benefit" value={val} required onChange={handleChange} />
                    {val.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="enterbutton" disabled={loading}>
              {loading ? 'Processing...' : 'Enter To Win'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
 
export default LeadershipSummit;
