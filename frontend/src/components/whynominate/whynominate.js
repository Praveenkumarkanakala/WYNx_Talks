import React from "react";
import "./whynominate.css";
import Footer from '../footer/footer';
import Navbar from "../Navbar/navbar";

const Whynominate = () => {
  return (
    <div>
      <Navbar />
      <div className="background-nominate">
        <div className="overlay-nominate">
          <h1>WHY NOMINATE</h1>
          <p>Home / Why Nominate</p>
        </div>
      </div>

      <section className="benefits-container">
      <h3 className="subtitle">Why Nominate</h3>
      <h2 className="title">Nominate Trailblazers for the First-of-Its-Kind WYNx Talks Awards</h2>
      <div className="divider"></div>
      <p className="description">
      Do you know an individual or organization breaking barriers, driving innovation, and creating transformative 
      impact in public health, mental well-being, or community leadership? Nominate them for the prestigious WYNx Talks 
      Awards—a global platform celebrating extraordinary contributions to healthier, more resilient societies. This is your
      chance to spotlight changemakers whose work inspires action and redefines possibilities. Let their story of innovation 
      and impact take center stage—submit your nomination today!
      </p>
      
      <button className="nominate-button">Enter To Win</button>
    </section>

    
      <Footer/>
    </div>
  );
};

export default Whynominate;
