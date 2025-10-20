import React, { useState, useEffect } from 'react';
import './navbar.css';
import logo from './WYNx_logo.png';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${scrollPosition > 50 ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/"> <img src={logo} alt="Logo" /> </a>
        </div>
        
        <button  className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle mobile menu"  aria-expanded={isMobileMenuOpen}  >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><a href="/">HOME</a></li>
           <li className="dropdown">
            <a href="#award">NOMINATIONS <i className="fa fa-angle-down"></i></a>
            <ul className="dropdown-menu">
              <li><a href="/awardsnomination">Nominate Now</a></li>
              <li><a href="/whynominate">Why Nominate</a></li>
              <li><a href="#3minvideo">3 min videos</a></li>
            </ul>
          </li>
          <li><a href="#carnival">CARNIVAL CONCLAVE</a></li>
          <li className="dropdown">
            <a href="#award">AWARD <i className="fa fa-angle-down"></i></a>
            <ul className="dropdown-menu">
              <li><a href="/awardcategories">Award Categories</a></li>
              <li><a href="/awardwinners">Award Winners </a></li>
            </ul>
          </li>
          <li><a href="/sponsor">SPONSOR</a></li>
          <li><a href="/gallery">GALLERY</a></li>
          <li className="dropdown">
          <a href="#previous">OUR 𝐀DD-𝐎NS</a>
          <ul className="dropdown-menu">
            {[
              { name: 'WINSPIRE', link: ' https://www.winspire.live/' },
              { name: 'FRENCH CHRONICLES', link: 'https://www.french-chronicles.com/latestnews' }
            ].map((item) => (
              <li key={item.name}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 