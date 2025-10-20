import './home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ambassadorImg from '../images/WYNx Brand ambassodor.jpg'
import image from '../images/gust0.png' 
import image0 from '../images/gust.jpeg'
import image1 from '../images/gust13.png'
import image2 from '../images/gust1.jpeg'
import image3 from '../images/gust2.jpeg'
import image4 from '../images/gust3.jpeg'
import image5 from '../images/gust4.jpeg'
import image6 from '../images/gust5.jpeg'
import image7 from '../images/gust6.png'
import image8 from '../images/gust7.png'
import image9 from '../images/gust8.png'
import image10 from '../images/gust10.png'
import image11 from '../images/gust11.png'

import image12 from '../images/gallery6.jpg'  

import img from '../images/galleryn.jpg'
import img0 from '../images/galleryn0.jpg'
import img1 from '../images/galleryn1.jpg'
import img2 from '../images/galleryn2.jpg'
import img3 from '../images/galleryn3.jpg'
import img4 from '../images/galleryn4.jpg'
import img5 from '../images/galleryna5.png'
import img6 from '../images/galleryn6.jpg'
import img7 from '../images/galleryn7.png'
import img8 from '../images/galleryn8.jpg'
import img9 from '../images/galleryn9.jpg'
import img10 from '../images/galleryn10.png'
import img11 from '../images/galleryn11.jpg'
import img12 from '../images/galleryn12.jpg'
import img13 from '../images/galleryn13.jpg' 

import sepimg from '../images/sepgallery0.jpg'
import sepimg0 from '../images/sepgallery1.jpg'
import sepimg1 from '../images/sepgallery2.jpg'
import sepimg2 from '../images/sepgallery3.jpg'
import sepimg3 from '../images/sepgallery4.jpg'
import sepimg5 from '../images/sepgallery11.jpg'
import sepimg6 from '../images/sepgallery12.jpg'
import sepimg7 from '../images/sepgallery13.jpg'
import sepimg8 from '../images/sepgallery14.jpg'


import speaker1 from '../speaker images/regspeaker.jpg';
import speaker2 from '../speaker images/regspeaker1.jpg';
import speaker3 from '../speaker images/regspeaker2.jpg';
import speaker4 from '../speaker images/regspeaker3.jpg';
import speaker5 from '../speaker images/regspeaker4.jpg';
import speaker6 from '../speaker images/regspeaker5.jpg';
import speaker7 from '../speaker images/regspeaker6.jpg';
import parisspeaker from '../speaker images/Allison C. Williams.jpg';
import parisspeaker0 from '../speaker images/Anne Deatly Phd.jpg';
import parisspeaker1 from '../speaker images/Arsella Burton.jpg';
import parisspeaker2 from '../speaker images/Bruce Wren.jpg';
import parisspeaker3 from '../speaker images/Carlota De Gula Iremedio.jpg';
import parisspeaker4 from '../speaker images/Yelena Kalendareva.jpg';
import parisspeaker5 from '../speaker images/Wanna Williamson-Jackson.jpg';
import parisspeaker6 from '../speaker images/Thiru Damodharan.jpg';
import parisspeaker7 from '../speaker images/Stephani Forbes.jpg';
import parisspeaker8 from '../speaker images/Sam Sammane.jpg';
import parisspeaker9 from '../speaker images/Rudy Merouchi.jpg';
import parisspeaker10 from '../speaker images/Rasimah Jar.jpg';
import parisspeaker11 from '../speaker images/Nio Queiro.jpg';
import parisspeaker12 from '../speaker images/Christine Forment.jpg';
import parisspeaker13 from '../speaker images/Deborah S. Greenhut.jpg';
import parisspeaker14 from '../speaker images/Dr. Denise Y Wynn.jpg';
import parisspeaker15 from '../speaker images/Dr. Dimple Patel.jpg';
import parisspeaker16 from '../speaker images/Dr. Ignacio Bonasa.jpg';
import parisspeaker17 from '../speaker images/Dr. Laura Kristan Wilhelm.jpg';
import parisspeaker18 from '../speaker images/Dr. Sharon Shappley.jpg';
import parisspeaker19 from '../speaker images/Eniko Frenyo Simoes.jpg';
import parisspeaker20 from '../speaker images/Huma Nosheen Mirza.jpg';
import parisspeaker21 from '../speaker images/Jean Pael.jpg';
import parisspeaker22 from '../speaker images/Jeffrey Herbert Williams.jpg';
import parisspeaker23 from '../speaker images/Karima GUERFALI LAZZEM.jpg';
import parisspeaker24 from '../speaker images/Limor Jasinski.jpg';
import parisspeaker25 from '../speaker images/Lissette Valle.jpg';
import parisspeaker26 from '../speaker images/Nikki Langman.jpg';

import parisspeaker27 from '../speaker images/Tristina Anderson.jpg';
import parisspeaker28 from '../speaker images/Margaret Vuijk-Cieslak.jpg';
import parisspeaker29 from '../speaker images/Bente Vosteen.jpg';
import parisspeaker30 from '../speaker images/Kunio Hara.jpg';
import parisspeaker31 from '../speaker images/Dr Diana Richardson.jpg';
import parisspeaker32 from '../speaker images/Kimly Hoang-Nakata.jpg';
import parisspeaker33 from '../speaker images/Kathryn Lancioni.jpg';
import parisspeaker34 from '../speaker images/Wahida parveen.jpg';
import parisspeaker35 from '../speaker images/Barb varcl smith.jpg';
import parisspeaker36 from '../speaker images/Michelle Sweeting D.jpg';
import parisspeaker37 from '../speaker images/Ann-Marie Emmanuel.jpg';
import parisspeaker38 from '../speaker images/EnowBisong spouse Njonje Alice Bessem.jpg';
import parisspeaker39 from '../speaker images/Joanna Sroka.jpg';
import parisspeaker40 from '../speaker images/Manjinder Kau.jpg';
import parisspeaker41 from '../speaker images/Annabelle Hartnell.jpg';
import parisspeaker42 from '../speaker images/Heidy Kallion.jpg';
import parisspeaker43 from '../speaker images/Tina Collura.jpg';


import Footer from '../footer/footer';
import Events from '../Events/voicenom';
import SpeakerVideos from '../voiceofnominated/nominatedvideo';
import Navbar from '../Navbar/navbar';

const Homepage = () => {

  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const eventDate = new Date('2026-03-08T00:00:00');
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

 const speakers = [speaker1, speaker2, speaker3, speaker4, speaker5, speaker6, speaker7, parisspeaker, parisspeaker0, parisspeaker1, parisspeaker2, parisspeaker3, parisspeaker4, parisspeaker5, parisspeaker6, parisspeaker7, parisspeaker8, parisspeaker9, parisspeaker10
                   , parisspeaker11, parisspeaker12, parisspeaker13, parisspeaker14, parisspeaker15, parisspeaker16, parisspeaker17, parisspeaker18, parisspeaker19, parisspeaker20, parisspeaker21, parisspeaker22, parisspeaker23, parisspeaker24, parisspeaker25, parisspeaker26, 
                  parisspeaker27, parisspeaker28, parisspeaker29, parisspeaker30, parisspeaker31, parisspeaker32, parisspeaker33, parisspeaker34, parisspeaker35, parisspeaker36, parisspeaker37, parisspeaker38, parisspeaker39, parisspeaker40, parisspeaker41, parisspeaker42, parisspeaker43
                  ];

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


  const images = [  img, img1, sepimg2, img2, img3, sepimg1, img4, img13, img5, sepimg7, img7,img8, sepimg0, img9, sepimg8, img10, img11, img6, img12, sepimg, sepimg5, sepimg6, sepimg3,img0  ];

  return (

    <div className="home-container">
      <Navbar/>
      <div className="video-container">
        <video autoPlay loop muted>
          <source src={require('./WYNx Talks Intro.mp4' )} type="video/mp4" /> 
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
          <button className="nominate-button" onClick={() => navigate('/awardsnomination')}> Enter To Win </button>
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

   <div id="carnival">
      <Events />
    </div>

    <section className="guest-speakers">
      <div className="dot-pattern"></div>
      <div className="speakers-content">
        <p className="subtitle">Few of Our Esteemed Chief Guests</p>
        <h2 className="title">Who Have Graced the Stage</h2>
        <div className="wave-line"></div>
        <div className="speakers-grid">
          <div className="speaker-large"><img src={image} alt="Speaker 1" /></div>
          <div className="speaker-grid-small">
            {[image0, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11].map((img, i) => (
              <div className="speaker-small" key={i}><img src={img} alt={`Speaker ${i + 2}`} /></div>
            ))}
          </div>
        </div>
      </div>
    </section>

{/* ---------------------------------------------------- */}
    <section className="ambassador-section">
      <h2>Our Brand Ambassador</h2>
      <img src={ambassadorImg} alt="Brand Ambassador" className="ambassador-banner" />
    </section>

{/* ---------------------------------------------------- */}

    <div className="recognition-container">
      <div className="recognition-image">
        <img src={image12} alt="Award ceremony"  />
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
        <p className="recognition-cta">  Don't miss this opportunity to showcase your accomplishments. </p>
        <button className="nomination-button" onClick={() => navigate('/awardsnomination')}>  NOMINATIONS ARE NOW OPEN!  </button>
      </div>
    </div>


      <div id="3minvideo"> 
        <SpeakerVideos/>
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

     <div className="newevent-speakers">
      <div className="newheader">
        <h1 >Our Distinguished Speakers</h1>
        <div className="newdivider"></div>
      </div>

      <div className="speakers-scroll-container">
        <div className="speakers-scroll-track" aria-hidden="true">
          {speakers.map((speaker, index) => (
            <div className="speaker-item" key={index}>
              <img src={speaker} alt={`Speaker ${index + 1}`} />
            </div>
          ))}

          {speakers.map((speaker, index) => (
            <div className="speaker-item" key={`dup-${index}`}>
              <img src={speaker} alt={`Speaker Duplicate ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Homepage;