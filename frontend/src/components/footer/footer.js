import React from 'react';
import './footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import logo1 from "../images/newlogo.webp"
import logo2 from "../images/newlogo1.jpg"
import logo3 from "../images/newlogo2.jpg"
import logo4 from "../images/newlogo3.jpg"
import logo5 from "../images/newlogo4.jpg"
import logo6 from "../images/newlogo5.jpg"
import logo7 from "../images/newlogo6.jpg"
import logo8 from "../images/newlogo7.jpg"
import logo9 from "../images/newlogo8.webp"

const Partners = () => {
  const navigate = useNavigate();
  const partners = [
    { logo: logo1, alt: 'TV9 Digital' },
    {  logo: logo2, alt: 'Telangana Association' },
    { logo: logo3, alt: 'Franchise India' },
    {  logo: logo4, alt: 'Francorp' },
    {  logo: logo5, alt: 'Franchise India Portal' },
    { logo: logo6, alt: 'The Franchising World' },
    {  logo: logo8, alt: 'Partner portal' },
    {  logo: logo9, alt: 'Partner portal' },
    { logo: logo7, alt: 'The Franchising World' },
  ];

  return (
    <div>
      <div className="partners-container">
        <h2 className="partners-title">Our</h2>
        <h1 className="partners-subtitle">Partners</h1>
        <div className="partners-divider">~~~~~</div>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-section">
              {partner.category === 'Partner Portal' ? (
                <div className="portal-grid">
                  {partner.logos.map((logo, logoIndex) => (
                    <div key={logoIndex} className="partner-item">
                      <h3 className="partner-category">{partner.category}</h3>
                      <img src={logo} alt={`Logo ${logoIndex}`} className="partner-logo" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <h3 className="partner-category">{partner.category}</h3>
                  <img src={partner.logo} alt={partner.alt} className="partner-logo" />
                </>
              )}
            </div>
          ))}
        </div>
        <button type="submit" className="become-button" onClick={() => navigate('/sponsor')}>BECOME A SPONSOR</button>

      </div>

      <div className="newsletter-container">
        <div className="contact-grid">
          <div className="contact-column">
            <h2>For Nomination and Sponsorship</h2>
            <div className="contact-details">
              
              <p className="name">Dr Prasad Varma</p>
              
            </div>
            <p className="phone">+91 9121794421</p> 
            
            <p className="email">dr.prasadkovviru@gmail.com </p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="newsletter">
          <h4>SUBSCRIBE TO NEWSLETTER</h4>
          <h2>Want something extra?</h2>
          <div className="subscribe-form">
            <input type="email" placeholder="Your Email" />
            <button>SUBSCRIBE</button>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
          <div className="footer-links">
            <a href="/categories">Categories</a>
            <span>•</span>
            <a href="/award-winner">Award Winner</a>
            <span>•</span>
            <a href="/sponsor">Sponsor</a>
            <span>•</span>
            <a href="/terms-and-conditions">Terms & Conditions</a>
            <span>•</span>
            <a href="/gallery">Gallery</a>
          </div>
          <p>Copyright © 2024 Franchise India.</p>
        </div>
      </div>

    </div>
  );
};

export default Partners;



