import React from "react";
import "./gallary.css";
import Footer from '../footer/footer';
import img from '../images/galleryn.JPG'
import img0 from '../images/galleryn0.JPG'
import img1 from '../images/galleryn1.JPG'
import img2 from '../images/galleryn2.jpg'
import img3 from '../images/galleryn3.jpg'
import img4 from '../images/galleryn4.JPG'
import img5 from '../images/galleryn5.JPG'
import img6 from '../images/galleryn6.JPG'
import img7 from '../images/galleryn7.JPG'
import img8 from '../images/galleryn8.JPG'
import img9 from '../images/galleryn9.JPG'
import img10 from '../images/galleryn10.JPG'
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
