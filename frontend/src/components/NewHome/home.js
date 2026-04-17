import './home.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Events from '../Events/voicenom';
import SpeakerVideos from '../voiceofnominated/nominatedvideo';
import Navbar from '../Navbar/navbar';

import ambassadorImg from '../images/WYNx Brand ambassodor.jpg'
import awardwinning from './awardwinning.jpeg'
import parisImg from './Paris Event.jpeg'
import image12 from '../images/gallery6.jpg'  

// const guestImages = [   "gust0.png",  "gust.jpeg",  "gust13.png",  "gust1.jpeg",  "gust2.jpeg",  "gust3.jpeg",  "gust4.jpeg",
//   "gust5.jpeg",  "gust6.png",  "gust7.png",  "gust8.png",  "gust10.png",  "gust11.png"
// ].map(img => require(`../images/${img}`));

const guestImages = [   "Conferencegallery1.jpeg",  "Conferencegallery2.jpeg",  "Conferencegallery3.jpeg",  "Conferencegallery4.jpeg",  "Conferencegallery5.jpeg",  "Conferencegallery6.jpeg", 
 ].map(img => require(`../Gallary/${img}`));

const galleryImages = [   "galleryn.jpg",  "galleryn0.jpg",  "galleryn1.jpg",  "galleryn2.jpg",  "galleryn3.jpg",  "galleryn4.jpg",  "galleryna5.png", 
  "galleryn6.jpg",  "galleryn7.png",  "galleryn8.jpg",  "galleryn9.jpg",  "galleryn10.png",  "galleryn11.jpg",  "galleryn12.jpg",  "galleryn13.jpg"
].map(img => require(`../images/${img}`));  

const topImages = [ "Conferencegallery1.jpeg",  "Conferencegallery2.jpeg",  "Conferencegallery3.jpeg",  "Conferencegallery4.jpeg"
].map(img => require(`../Gallary/${img}`));

const Homepage = () => {

  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const eventDate = new Date('2026-07-20T00:00:00');
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

const speakers = [   "regspeaker.jpg",  "regspeaker1.jpg",  "regspeaker2.jpg",  "regspeaker3.jpg",  "regspeaker4.jpg",  "regspeaker5.jpg",  "regspeaker6.jpg",
  "Allison C. Williams.jpg",  "Anne Deatly Phd.jpg",  "Arsella Burton.jpg",  "Bruce Wren.jpg",  "Carlota De Gula Iremedio.jpg",  "Yelena Kalendareva.jpg",
  "Wanna Williamson-Jackson.jpg",  "Thiru Damodharan.jpg",  "Stephani Forbes.jpg",  "Sam Sammane.jpg",  "Rudy Merouchi.jpg",  "Rasimah Jar.jpg",
  "Nio Queiro.jpg",  "Christine Forment.jpg",  "Deborah S. Greenhut.jpg",  "Dr. Denise Y Wynn.jpg",  "Dr. Dimple Patel.jpg",  "Dr. Ignacio Bonasa.jpg",
  "Dr. Laura Kristan Wilhelm.jpg",  "Dr. Sharon Shappley.jpg",  "Eniko Frenyo Simoes.jpg",  "Huma Nosheen Mirza.jpg",  "Jean Pael.jpg",  "Jeffrey Herbert Williams.jpg",
  "Karima GUERFALI LAZZEM.jpg",  "Limor Jasinski.jpg",  "Lissette Valle.jpg",  "Nikki Langman.jpg",  "Tristina Anderson.jpg",  "Margaret Vuijk-Cieslak.jpg",  "Bente Vosteen.jpg",
  "Kunio Hara.jpg",  "Dr Diana Richardson.jpg",  "Kimly Hoang-Nakata.jpg",  "Kathryn Lancioni.jpg",  "Wahida parveen.jpg",  "Barb varcl smith.jpg",  "Michelle Sweeting D.jpg",
  "Ann-Marie Emmanuel.jpg",  "EnowBisong spouse Njonje Alice Bessem.jpg",  "Joanna Sroka.jpg",  "Manjinder Kau.jpg",  "Annabelle Hartnell.jpg",  "Heidy Kallion.jpg",  "Tina Collura.jpg",
  "Dr. Rita Lustgarten.jpeg",  "Steve Conway.jpeg",  "Hila Lauterbach.jpeg",  "Ellen Duffey Lueb.jpeg",  "Sabira Arefin.jpeg"
].map(img => require(`../speaker images/${img}`));

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

const images = [
  galleryImages[0],  galleryImages[2],  require('../images/sepgallery3.jpg'),  galleryImages[3],  galleryImages[4],  require('../images/sepgallery2.jpg'),
  galleryImages[5],  galleryImages[14],  galleryImages[6],  require('../images/sepgallery13.jpg'),  galleryImages[8],  galleryImages[9],  require('../images/sepgallery1.jpg'), galleryImages[10],
  require('../images/sepgallery14.jpg'),  galleryImages[11],  galleryImages[12],  galleryImages[7],  galleryImages[13],  require('../images/sepgallery0.jpg'),  require('../images/sepgallery11.jpg'),  require('../images/sepgallery12.jpg'),  require('../images/sepgallery4.jpg'),
  galleryImages[1],];

const statsData = [
  { key: "edition", label: "Edition", isEdition: true },
  { key: "attendees", label: "Attendees" },
  { key: "awards", label: "Award Categories" },
  { key: "speakers", label: "Speakers" }
];

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
        {statsData.map((item, index) => (
          <div className="stats-item" key={index}>
            <h2>
              {item.isEdition
                ? renderEdition(counts[item.key])
                : `${formatNumber(counts[item.key])}+`}
            </h2>
            <p>{item.label}</p>
            <div className="wave-line"></div>
          </div>
        ))}
      </div>

   <div id="carnival">
      <Events />
    </div>

 {/* ----------------------------------------------------- */}
<section className="paris-gallery-section">
  <h2>Paris Conclave 2026</h2>
  <img src={parisImg} alt="Paris Conference" className="paris-gallery-image" />
</section>

{/* ------------------------------------------------------- */}

    <section className="ambassador-section">
      <h2>Award Winning Talks 2026</h2>
      <img src={awardwinning} alt="Brand Ambassador" className="ambassador-banner" />
    </section>
{/* ------------------------------------------------------- */}

    <section className="guest-speakers">
      <div className="dot-pattern"></div>

      <div className="speakers-content">
        <p className="subtitle">Few of Our Esteemed Chief Guests</p>
        <h2 className="title">Who Have Graced the Stage</h2>
        <div className="wave-line"></div>

        <div className="speakers-grid">
          {guestImages.map((img, i) => (
            <div className="speaker-card" key={i}>
              <img src={img} alt={`Speaker ${i + 1}`} />
            </div>
          ))}
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

 {/* ----------------------------------------- */}

    <div className="newevent-gallery">
      <div className="newheader">
        <h4>Event</h4>
        <h1>Gallery</h1>
        <div className="newdivider"></div>
      </div>

      {/* TOP 4 */}
      {/* <div className="top-gallery-grid">
        {topImages.map((image, index) => (
          <div className="newgallery-item" key={index}>
            <img src={image} alt={`Top ${index + 1}`} />
          </div>
        ))}
      </div> */}

      {/* REST */}
      <div className="newgallery-grid">
        {images.map((image, index) => (
          <div className="newgallery-item" key={index}>
            <img src={image} alt={`Event ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>

 {/* ------------------------------------  */}

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