import React, {useState} from "react";
import "./winner.css";
import Footer from '../footer/footer';
import Navbar from "../Navbar/navbar";



const Awardwinners = () => {

    const [selectedYear, setSelectedYear] = useState('2024');

    const awards = {
        '2024': [
          // { title: 'Successpreneur of the Year- Web Solution', recipient: 'Mr. Mithilesh Kumar Gupta ; Co Founder ; v2Web Hosting Pvt Ltd' },
          // { title: 'Upcoming Women Successpreneur of the Year', recipient: 'Ms. Yamini Vemuri TC ; Founder & CEO ; Deva Raya Industries Pvt Ltd' },
          // { title: 'Successpreneur of the Year- Facility Management', recipient: 'Mr. Murugraj Swaminathan Founder & CEO & Ms. Malarvizhi Ponnambalam Co founder & COO ; Integra Facility Management' },

          // { title: 'Successpreneur of the Year-Online Marketplace', recipient: 'Mr. Vijay Kishore Kandukuri ; Chairman ; Bidfe' },
          // { title: 'Successpreneur of the Year- D2C Brand of South India', recipient: 'Mr. Santhosh Balasundaram ; CEO ; Shadow Etail' },
          // { title: 'Successpreneur of the Year - Supermarket Consultancy', recipient: 'Hawwa Consultant' },

        ],
        '2023': [
              
        //   { title: 'Most Impactful Bootcamp of the Year- Full Stack Developer Program', recipient: 'TalentSprint Private Limited' },
        //   { title: 'Growing junior colleges of the year- Telangana and Andhra Pradesh', recipient: 'Resonance' },
        //   { title: 'Successpreneur of the Year- Furniture Business', recipient: 'Mr. Raghunandan Saraf, Founder & CEO, Saraf Furniture' },
        //   { title: 'Successpreneur of the Year- Corrugated Paper Manufacturer', recipient: 'Mr. Aman Kedia, CEO. M K Paper Mills' },
        //   { title: 'Successpreneur of the Year- Hospitality Consultant', recipient: 'Chef Kiran Joshi, Founder & Ceo, Dattatray hospitality consultancy services' },
        //   { title: 'Successpreneur of the Year- Music School Chain', recipient: 'Philip Sanjeeva Rao, Director, PHILIPS SCHOOL OF MUSIC' },
          
         ],
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
