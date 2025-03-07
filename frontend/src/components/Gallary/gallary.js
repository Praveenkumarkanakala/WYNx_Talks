import React from "react";
import "./gallary.css";
import Footer from '../footer/footer';
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
import Navbar from "../Navbar/navbar";
// import img14 from '../images/gallery13.jpg'

const BackgroundWithForm = () => {

    const images = [  img, img0, img1,img2, img3, img4,img5, img7,img8, img9, img10,img11, img6, img12, img13   ];

  return (
    <div>
      <Navbar />
      <div className="gallery-container">
        <div className="overlay-gallery">
          <h1>EVENT GALLERY</h1>
          <p>Home / Event Gallery</p>
        </div>
      </div>
      <div className="event-gallery">
      <div className="header">
        <h4>Previous Moments</h4>
        <h1>Event Gallery</h1>
        <div className="divider"></div>
      </div>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div className="gallery-item" key={index}>
            <img src={image} alt={`Event ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default BackgroundWithForm;
