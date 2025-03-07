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
          // { title: 'Successpreneur of the Year - FMCG', recipient: 'Mr. S.M. Surendhiran ; CEO ; ARR MUKHWAS (OPC) PVT LTD' },
          // { title: 'Emerging Consulting Company of the Year', recipient: 'Belief Systems' },
          // { title: 'Successpreneur of the Year - Drone Technology', recipient: 'Mr. Paras Jain ; Founder & CEO ; Indo Wings' },
          // { title: 'Successpreneur of the Year - Car Care', recipient: 'Dr. Karthickkumar Chinnaraj ; Founder & CEO ; 5k Car Care' },
          // { title: 'Emerging Retail Pharma Business of the Year', recipient: 'QnQ Healthcare Pvt Ltd' },
          // { title: 'Successpreneur of the Year - Ayurvedic Beauty & Wellness', recipient: 'Mr. Sri P R Krishnakumar ; Co founder ; The Ayurvedic Trust' },
          // { title: 'Successpreneur of the Year- Smart Restroom Services', recipient: 'Mr. Kaliappan.K ; Founder & Managing Director ; Sprint6 Specialized Services Pvt Ltd' },
          
          // { title: 'Successpreneur of the Year - Online Fashion', recipient: 'Mr. Puneet Bajaj ; CEO ; Mintobay' },
          // { title: 'Successpreneur of the Year - Network Solution Provider', recipient: 'Mr. K.Balachandar ; Head Operation ; KR Info Solutions' },
          // { title: 'Successpreneur of the Year- Nutraceuticals Raw material Provider', recipient: 'Ms.Sreenija Narayanan ; Managing Partner ; S2M Nutraceuticals' },
          // { title: 'Successpreneur of the Year- Fresh Produce (Exports & Imports)', recipient: 'Mr. Muhammed Farhaan ; VP ; Al Farusia Imports and Exports' },
          // { title: 'Upcoming Successpreneur of the Year - Business Consulting', recipient: 'Mr. Balaji Seshadri ; CEO ; Belief Systems' },
          // { title: 'Successpreneur of the Year- Mens Salon', recipient: 'Mr . Darren Rodrigues & Mr. Mohammed Tawfiq ; Founders ; McKingstown' },
          // { title: 'Successpreneur of the Year- AutmotiveTraining Business', recipient: 'Mr. Selvakumar S Managing Director ;CarsOnly Services Pvt Ltd' },
          // { title: 'Successpreneur of the Year - Healthcare Business', recipient: 'Dr. N. Gyanaprakasam ; MD ; QnQ Healthcare Pvt Ltd' },
          // { title: 'Successpreneur of the Year- Facility Management', recipient: 'Mr. Murugraj Swaminathan Founder & CEO & Ms. Malarvizhi Ponnambalam Co founder & COO ; Integra Facility Management' },

          // { title: 'Successpreneur of the Year-Online Marketplace', recipient: 'Mr. Vijay Kishore Kandukuri ; Chairman ; Bidfe' },
          // { title: 'Successpreneur of the Year- D2C Brand of South India', recipient: 'Mr. Santhosh Balasundaram ; CEO ; Shadow Etail' },
          // { title: 'Successpreneur of the Year - Craft business', recipient: 'Clinkwagon' },
          // { title: 'Successpreneur of the Year - Fashion Accessory Store', recipient: 'Difa' },
          // { title: 'Successpreneur of the Year - Supermarket Consultancy', recipient: 'Hawwa Consultant' },

        ],
        '2023': [
              
        //   { title: 'Most Impactful Bootcamp of the Year- Full Stack Developer Program', recipient: 'TalentSprint Private Limited' },
        //   { title: 'Growing junior colleges of the year- Telangana and Andhra Pradesh', recipient: 'Resonance' },
        //   { title: 'Successpreneur of the Year- Human Resources', recipient: 'Dr. Venugopal Rao Chikkala, CEO, Verch Consulting LLP' },
        //   { title: 'Social Entrepreneur of the year', recipient: 'Dr. Rumana Sinha Sehgal, Founder, Serendipity' },
        //   { title: 'Successpreneur of the Year- Supermarket', recipient: 'Red Rose Mart' },
        //   { title: 'Edtech Business of the year- Analytics', recipient: 'Imarticus Learning' },
        //   { title: 'Emerging Business of the year - Digital Marekting', recipient: 'AdCounty Media' },
        //   { title: 'Successpreneur of the Year- Furniture Business', recipient: 'Mr. Raghunandan Saraf, Founder & CEO, Saraf Furniture' },
        //   { title: 'Successpreneur of the Year- Corrugated Paper Manufacturer', recipient: 'Mr. Aman Kedia, CEO. M K Paper Mills' },
        //   { title: 'Successpreneur of the Year- Hospitality Consultant', recipient: 'Chef Kiran Joshi, Founder & Ceo, Dattatray hospitality consultancy services' },
        //   { title: 'Emerging Pharmaceutical Company of the year', recipient: 'SUNESTA LIFE SCIENCES' },
        //   { title: 'Successpreneur of the Year- Training and Education', recipient: 'Mr. Mahesh Babu Channa, Founder ,SocialPrachar' },
        //   { title: 'Emerging Corporate training & Recruitment Business of the year', recipient: 'Shine NexGen Pvt. Ltd' },
        //   { title: 'Successpreneur of the Year- Social Services', recipient: 'Mr. Rohan Raj Kulkarni , Founder, Rohan Kulkarni Foundation' },
        //   { title: 'Successpreneur of the Year- Tech', recipient: 'Pratyusha Vemuri Venkata, Founder and CEO, Kavach Digital Security' },
        //   { title: 'Resilient Entrepreneur of the year', recipient: 'Suresh Katta, Founder, Deepas Reading Room' },
        //   { title: 'Successpreneur of the Year - Organic Products', recipient: 'Bhatgavathi Hari Babu , Promoter & Ceo, Teja Organics' },
        //   { title: 'Successpreneur of the Year- B2B Services', recipient: 'Mr.Manoj Sreeram, Founder, Uncommon Design' },
        //   { title: 'Successpreneur of the Year- QSR', recipient: 'Mr. Koushik Reddy Krishnammagari,Founder, Burger Division' },
        //   { title: 'Fastest growing Successpreneur of the Year', recipient: 'Laxmikanth, Founder, Naaz Mandi' },
        //   { title: 'Successpreneur of the Year- Emerging Bakrey', recipient: 'Irfan, Director, Subhan Bakery' },
        //   { title: 'Successpreneur of the Year- Pet Care', recipient: 'Amrutha Varshini Nalla, Founder, DoggyVille' },
        //   { title: 'Successpreneur of the Year- Franchise Gifting Business', recipient: 'Durgaprasad K ,Founder & CEO, Digi Prinfinity Pvt Ltd' },
        //   { title: 'Successpreneur of the Year- Healthcare, Beauty and Wellness', recipient: 'Ms. Srilaxmi Reddy,Founder, Sparkles Cosmetic Care' },
        //   { title: 'Entrepreneur of the Year', recipient: 'Mr.Charan Reddy, Founder, Roman Island' },
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
