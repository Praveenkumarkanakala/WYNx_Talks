import './home.css';
import React, { useState, useEffect } from 'react';
// import { MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import image from '../images/ngust8.webp' 
import image0 from '../images/gust.jpg'
import image1 from '../images/gust1.jpg'
import image2 from '../images/gust0.jpg'
import image3 from '../images/gust8.jpg'
import image4 from '../images/gust4.jpg'
import image5 from '../images/gust5.jpg'
import image6 from '../images/gust6.jpg'
import image7 from '../images/gust7.jpg'
import image8 from '../images/gust0.jpg'
import image9 from '../images/gust9.jpg'
import image10 from '../images/gust10.png'
import image11 from '../images/gust11.png'
import image12 from '../images/gallery6.jpg'  

import newbs from '../images/health.jpg'
import newbs1 from '../images/finance.jpg'
import newbs2 from '../images/education.jpg'
import newbs3 from '../images/newbs15.jpg'
import newbs4 from "../images/newbs2.jpg"
import newbs5 from "../images/newbs3.jpg"
import newbs6 from "../images/tourism.jpg"
import newbs7 from "../images/newbs13.jpg"
import newbs8 from "../images/electric.jpg"
import newbs9 from "../images/jems.jpg"
import newbs10 from "../images/startup.webp"
import newbs11 from "../images/realestate.jpg"


import newimg from '../images/wnrb.png'
import newimg1 from '../images/wnrb0.png'
import newimg2 from '../images/wnrb1.png'
import newimg3 from '../images/wnrb2.png'
import newimg4 from '../images/wnrb3.png'
import newimg5 from '../images/wnrb4.png'
import newimg6 from '../images/wnrb5.png'
import newimg7 from '../images/wnrb6.png'
import newimg8 from '../images/wnrb7.png'
import newimg9 from '../images/wnrb8.png'
import newimg10 from '../images/wnrb9.png'
import newimg11 from '../images/wnrb10.jpg'
import newimg12 from '../images/wnrb11.png'
import newimg13 from '../images/wnrb12.png'
import newimg14 from '../images/wnrb13.png'
import newimg15 from '../images/wnrb14.png'
import newimg16 from '../images/wnrb15.png'
import newimg17 from '../images/wnrb16.png' 


import img from '../images/galleryn.jpg'
import img0 from '../images/galleryn0.jpg'
import img1 from '../images/galleryn1.jpg'
import img2 from '../images/galleryn2.jpg'
import img3 from '../images/galleryn3.jpg'
import img4 from '../images/galleryn4.jpg'
import img5 from '../images/galleryn5.jpg'
import img6 from '../images/galleryn6.jpg'
import img7 from '../images/galleryn7.jpg'
import img8 from '../images/galleryn8.jpg'
import img9 from '../images/galleryn9.jpg'
import img10 from '../images/galleryn10.jpg'
import img11 from '../images/galleryn11.jpg'
import img12 from '../images/galleryn12.jpg'
import img13 from '../images/galleryn13.jpg' 

import Footer from '../footer/footer';
import Navbar from '../Navbar/navbar';


const Homepage = () => {

  const navigate = useNavigate();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const eventDate = new Date('2025-03-08T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = eventDate - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  const [counts, setCounts] = useState({
    edition: 0,
    attendees: 0,
    awards: 0,
    speakers: 0
  });

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const duration = 4000; 
    const steps = 60; 
    const interval = duration / steps;
    const pauseDuration = 3000;
    
    const maxValues = {
      edition: 5,
      attendees: 1500,
      awards: 50,
      speakers: 50
    };

    const timer = setInterval(() => {
      if (isPaused) return;

      setCounts(prev => {
        const allAtMax = 
          prev.edition >= maxValues.edition &&
          prev.attendees >= maxValues.attendees &&
          prev.awards >= maxValues.awards &&
          prev.speakers >= maxValues.speakers;

        if (allAtMax) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setCounts({
              edition: 0,
              attendees: 0,
              awards: 0,
              speakers: 0
            });
          }, pauseDuration);
          return prev;
        }

        return {
          edition: prev.edition >= maxValues.edition ? maxValues.edition : prev.edition + maxValues.edition / steps,
          attendees: prev.attendees >= maxValues.attendees ? maxValues.attendees : prev.attendees + maxValues.attendees / steps,
          awards: prev.awards >= maxValues.awards ? maxValues.awards : prev.awards + maxValues.awards / steps,
          speakers: prev.speakers >= maxValues.speakers ? maxValues.speakers : prev.speakers + maxValues.speakers / steps
        };
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused]);

  const formatNumber = (num) => Math.floor(num).toLocaleString();

  const renderEdition = (number) => {
    return (
      <div className="edition-number">
        <span className="number">{formatNumber(number)}</span>
        <span className="suffix">th</span>
      </div>
    );
  };

  const categories = [
    { id: 1, title: 'Health & Beauty',image: newbs },
    {  id: 2,   title: 'Financial Services',  image: newbs1 },
    {  id: 3,  title: 'Education',  image: newbs2 },
    { id: 4, title: 'Chemicals & Petrochemicals', image: newbs3 },
    {  id: 5,title: 'Automobile', image: newbs4 },
    { id: 6,  title: 'IT & Telecom', image: newbs5 },
    { id: 7, title: 'Retail', image: newbs7 },
    { id: 8, title: 'Tourism & Hospitality', image: newbs6 },
    { id: 9,  title: 'Gems & Jewellery', image: newbs9 },
    { id: 10, title: 'Startups', image: newbs10 },
    { id: 11, title: 'Electric Vehicle',  image: newbs8 },
    { id: 12,  title: 'Real Estate',  image: newbs11 },
   
  ];

  const brands = [
    { name: "BDP Energy", logo: newimg },
    { name: "General Technologies", logo: newimg1 },
    { name: "GoMechanic", logo: newimg2 },
    { name: "SSA Finserv", logo: newimg3  },
    { name: "Testbook", logo: newimg4  },
    { name: "Tadipatri Biryani", logo: newimg5 },
    { name: "QnQ Healthcare", logo: newimg6 },
    { name: "5K Car Care", logo: newimg7 },
    { name: "IndoWings", logo: newimg8 },
    { name: "ARR", logo: newimg9 },
    { name: "Sprint6", logo: newimg10 },
    { name: "McKingstown", logo: newimg11 },
    { name: "Belief Systems", logo: newimg12 },
    { name: "S2M Nutraceuticals", logo: newimg13 },
    { name: "InteGra", logo: newimg14 },
    { name: "Al Farisya", logo: newimg15 },
    { name: "InteGra", logo: newimg16 },
    { name: "Al Farisya", logo: newimg17 },

  ];

  const images = [  img, img0, img1,  img2, img3, img4,  img5, img7,img8,  img9, img10, img11, img6, img12, img13  ];

  return (

    <div className="home-container">
      <Navbar/>
      <div className="video-container">
        <video autoPlay loop muted>
          <source src={require('./WYNx Talks Intro.mp4')} type="video/mp4" /> 
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="countdown-wrapper">
          <div className="countdown-container">
            <div className="countdown-block">
              <div className="time-value">
                <span>{String(timeLeft.days).padStart(2, '0')}</span>
              </div>
              <span className="time-label">DAYS</span>
            </div>

            <div className="time-separator">:</div>

            <div className="countdown-block">
              <div className="time-value">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              </div>
              <span className="time-label">HOURS</span>
            </div>

            <div className="time-separator">:</div>

            <div className="countdown-block">
              <div className="time-value">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
              </div>
              <span className="time-label">MINUTES</span>
            </div>

            <div className="time-separator">:</div>

            <div className="countdown-block">
              <div className="time-value">
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
              <span className="time-label">SECONDS</span>
            </div>
          </div>
          </div>
       
      <div className="main-content">
        <div className="text-content">
          <div className="hashtags">
            <span>#WYNxTalksAwards</span>
            <span>#Entrepreneurship</span>
            <span>#MSMEs</span>
          </div>

          <h1>WYNx Talks: Addressing Public and Community Health Challenges</h1>
          <div className="wave-decoration">〰️</div>

          <p className="wynxcategories">
            Welcome to WYNx Talks—a transformative series of global conferences designed to spark meaningful discussions 
            and tackle some of the most pressing health issues facing communities today. These events bring together public health advocates, 
            community leaders, healthcare professionals, and experts across various fields to address the challenges and opportunities in creating healthier,
            more resilient societies.
          </p>

          <button className="nominate-button" onClick={() => navigate('/newreg')}>
          Enter To Win
        </button>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>A Platform for Collective Action and Community Engagement</h3>
            <p>Gain unparalleled visibility and credibility for your brand.</p>
            <span className="feature-number">01</span>
          </div>

          <div className="feature-card">
            <h3>Driving Collaboration and Innovation in Health Solutions</h3>
            <p>Connect with industry leaders and potential partners.</p>
            <span className="feature-number">02</span>
          </div>

          <div className="feature-card">
            <h3>Shaping the Future of Public Health</h3>
            <p>Be part of a community that celebrates entrepreneurial success.</p>
            <span className="feature-number">03</span>
          </div>

          <div className="feature-card">
            <h3>Creating a Healthier, More Resilient World</h3>
            <p>Engage with industry luminaries to explore strategies for business growth.</p>
            <span className="feature-number">04</span>
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div className="stats-item">
          <h2>{renderEdition(counts.edition)}</h2>
          <p>Edition</p>
          <div className="wave-line"></div>
        </div>
        
        <div className="stats-item">
          <h2>{formatNumber(counts.attendees)}+</h2>
          <p>Attendees</p>
          <div className="wave-line"></div>
        </div>
        
        <div className="stats-item">
          <h2>{formatNumber(counts.awards)}+</h2>
          <p>Award Categories</p>
          <div className="wave-line"></div>
        </div>
        
        <div className="stats-item">
          <h2>{formatNumber(counts.speakers)}+</h2>
          <p>Speakers</p>
          <div className="wave-line"></div>
        </div>
    </div>

    <section className="guest-speakers">
      <div className="dot-pattern"></div>
      
      <div className="speakers-content">
        <p className="subtitle">Few of Our Esteemed Chief Guests</p>
        <h2 className="title">Who Have Graced the Stage</h2>
        <div className="wave-line"></div>
        
        <div className="speakers-grid">
          <div className="speaker-large">
            <img src={image} alt="Speaker 1" />
          </div>
          
          <div className="speaker-grid-small">
            <div className="speaker-small">
              <img src={image0} alt="Speaker 2" />
            </div>
            <div className="speaker-small">
              <img src={image1} alt="Speaker 3" />
            </div>
            <div className="speaker-small">
              <img src={image2} alt="Speaker 4" />
            </div>
            <div className="speaker-small">
              <img src={image3} alt="Speaker 5" />
            </div>
            <div className="speaker-small">
              <img src={image4} alt="Speaker 6" />
            </div>
            <div className="speaker-small">
              <img src={image5} alt="Speaker 7" />
            </div>
            <div className="speaker-small">
              <img src={image6} alt="Speaker 8" />
            </div>
            <div className="speaker-small">
              <img src={image7} alt="Speaker 9" />
            </div>
            <div className="speaker-small">
              <img src={image8} alt="Speaker 10" />
            </div>
            <div className="speaker-small">
              <img src={image9} alt="Speaker 11" />
            </div>
            <div className="speaker-small">
              <img src={image10} alt="Speaker 12" />
            </div>
            <div className="speaker-small">
              <img src={image11} alt="Speaker 13" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="recognition-container">
      <div className="recognition-image">
        <img 
          src={image12}
          alt="Award ceremony" 
        />
      </div>
      
      <div className="recognition-content">
        <h2>Be a Catalyst for Change at WYNx Talks Awards</h2>
        
        <p className="recognition-description">
          Celebrate excellence and inspire transformation at the prestigious WYNx Talks Awards.
          This global platform honors visionary leaders, innovators, and changemakers who have made significant contributions to health,
          community well-being, and leadership. As a nominee or awardee, you will gain unparalleled recognition, connect with a distinguished network of experts,
          and showcase your groundbreaking work to a global audience. The WYNx Talks Awards are more than an accolade—they are a celebration of impact, innovation,
          and the power to drive meaningful change. Step forward, be recognized, and amplify your legacy of transformation.
        </p>
        
        <p className="recognition-cta">
          Don't miss this opportunity to showcase your accomplishments.
        </p>
        
        <button className="nomination-button" onClick={() => navigate('/newreg')}>
           NOMINATIONS ARE NOW OPEN!
        </button>
      </div>
    </div>

    <section className="categories-section">
      <p className="categories-subtitle">Explore the award categories</p>
      <h2 className="categories-title">
        Small Businesses, Start-ups and Entrepreneurs
      </h2>
      
      <div className="wave-line"></div>
      
      <div className="categories-container">
        <div className="categories-scroll">
          {categories.map(category => (
            <div key={category.id} className="category-item">
              <div className="category-image">
                <img 
                  src={category.image} 
                  alt={category.title}
                />
              </div>
              <h3>{category.title}</h3>
            </div>
          ))}
          {categories.map(category => (
            <div key={`${category.id}-duplicate`} className="category-item">
              <div className="category-image">
                <img 
                  src={category.image} 
                  alt={category.title}
                />
              </div>
              <h3>{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    <div className="winner-brands-container">
      <h2 className="pasttitle">Past</h2>
      <h3 className="pastsubtitle">Winner Brands</h3>
      <div className="brands-grid">
        {brands.map((brand, index) => (
          <div className="brand-item" key={index}>
            <img src={brand.logo} alt={brand.name} className="brand-logo" />
          </div>
        ))}
      </div>
      <button className="nominate-newbutton" onClick={() => navigate('/newreg')}>
        Enter To Win
      </button>
    </div>

    <div className="newevent-gallery">
          <div className="newheader">
            <h4>Event</h4>
            <h1> Gallery</h1>
            <div className="newdivider"></div>
          </div>
          <div className="newgallery-grid">
            {images.map((image, index) => (
              <div className="newgallery-item" key={index}>
                <img src={image} alt={`Event ${index + 1}`} />
              </div>
            ))}
          </div>
     </div>
    <Footer/>
    </div>
  );
};

export default Homepage;