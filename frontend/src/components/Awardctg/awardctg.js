import React from "react";
import "./awardctg.css";
import Footer from '../footer/footer';
import Navbar from "../Navbar/navbar";



const Awardcategory = () => {
    return (
        <div>
          <Navbar />
      <div className="award-container">
        <div className="overlay-award">
          <h1> AWARD CATEGORIES</h1>
          <p>Home / Award Categories</p>
        </div>
      </div>

      <div className="award-categories">
  <h1>Award Categories</h1>
  <h2>Small Businesses, Start-ups, and Entrepreneurs</h2>
  <hr className="divider" />

  <div className="categories-container">
    {/* Left Column */}
    <div className="awards-column">
      <ul className="awards-list">
        <li><strong>Champion of Resilient Leadership</strong></li>
        <li>Crisis Management & Adaptability </li>
        <li>Emotional Intelligence & Mental Toughness</li>
        <li>Transformational & Visionary Leadership</li>

        <li><strong>Innovator in Workplace Wellness Strategies</strong></li>
        <li>Integrating Mental Health into Corporate Policies</li><br/>
        <li>Holistic Approaches to Employee Well-Being</li>
        <li>Leveraging Technology for Workplace Wellness</li>
        <li>Creating Sustainable Work-Life Balance Programs</li>

        <li><strong>Pioneering People-First Leadership</strong></li>
        <li>Empathy-Driven Decision Making</li>
        <li>Cultivating High-Trust Work Environments</li>
        <li>Balancing Productivity with Well-Being</li>
        <li>Empowering Teams Through Active Listening</li>

        <li><strong>Trailblazer in Stress and Burnout Prevention</strong></li>
        <li>Recognizing Early Signs of Workplace Burnout </li>
        <li>Proactive Strategies for Stress Management  </li>
        <li>Building a Culture of Psychological Safety </li>
        <li>Redefining Success Without Overworking</li>

        <li><strong>Visionary in Leadership and Mental Health Advocacy</strong></li>
        <li>Championing Mental Health in Executive Leadership</li>
        <li>Breaking Stigmas Around Workplace Mental Health   </li>
        <li>Encouraging Open Conversations About Well-Being   </li>
       </ul>
    </div>

    {/* Right Column */}
    <div className="awards-column">
      <ul className="awards-list">
        <li><strong>Architect of Inclusive Leadership Cultures</strong></li>
        <li>Diversity, Equity, and Inclusion in Leadership </li>
        <li> Fostering a Sense of Belonging in Teams</li>
        <li>Inclusive Decision-Making for Organizational Growth</li>
        <li>Leading with Cultural Intelligence</li>

        <li><strong>Digital Transformation in Mental Health Leadership</strong></li>
        <li> AI and Technology in Mental Health Support</li>
        <li>Data-Driven Insights for Employee Well-Being </li>
        <li> Remote Work and Digital Wellness Strategies </li>
        <li> Leveraging Apps and Platforms for Mental Health </li>


        <li><strong>Sustainability Champion in Workplace Wellness</strong></li>
        <li>Long-Term Well-Being Programs for Employees</li>
        <li>Eco-Friendly Work Environments and Mental Health </li>
        <li>Sustainable Productivity Without Burnout</li>
        <li>Creating Wellness-Focused Leadership Models</li>

        <li><strong>Collaborative Excellence in Mental Health Solutions</strong></li>
        <li>Cross-Industry Partnerships for Mental Health </li>
        <li>Team-Based Approaches to Employee Support </li>
        <li> Leveraging Community Resources for Workplace Wellness</li>
        <li>Encouraging Peer Support Networks </li>

        <li><strong>Next-Gen Leadership Advocate</strong></li>
        <li> Developing Future Leaders with Emotional Intelligence</li>
        <li>Bridging the Gap Between Generations in Leadership </li>
        <li> Embracing Change and Innovation in Leadership</li>
        <li> Redefining Leadership for a Dynamic Workforce</li>

      </ul>
    </div>
  </div>

  <div className="nominate-btn-container">
    <a href="/newreg" className="btn">Enter To Win</a>
  </div>
</div>

    <Footer/>
    </div>
  );
};

export default Awardcategory;
