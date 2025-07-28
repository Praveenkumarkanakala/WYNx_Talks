import React, {useState} from "react";
import "./winner.css";
import Footer from '../footer/footer';
import Navbar from "../Navbar/navbar";

const Awardwinners = () => {
    const [selectedYear, setSelectedYear] = useState('2024');
    const awards = {
        '2024': [   ],
        '2023': [   ],
      };

    return (
    <div>
      <Navbar />
      <div className="winner-container">
        <div className="overlay-winner">
          <h1> AWARD WINNERS</h1>
          <p>Home / Award Winners</p>
        </div>
      </div>



      <div className="awards-page">
      <div className="year-toggle">
        <button
          className={selectedYear === '2024' ? 'active' : ''}
          onClick={() => setSelectedYear('2024')}
        >
          2024
        </button>
        <button
          className={selectedYear === '2023' ? 'active' : ''}
          onClick={() => setSelectedYear('2023')}
        >
          2023
        </button>
      </div>
      <h1>Anticipating Excellence: Awaiting the Announcement of Award Winners</h1>
      <div className="awards-list">
        {awards[selectedYear].map((award, index) => (
          <div key={index} className="award-item">
            <div className="award-title">{award.title}</div>
            <div className="award-recipient">{award.recipient}</div>
          </div>
        ))}
      </div>
    </div>

    <Footer/>
    </div>
);
};

export default Awardwinners;