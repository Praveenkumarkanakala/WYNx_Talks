import React from "react";
import Navbar from "../../Pages/NewNavbar/Navbar";
import NewFooter from "../../Pages/Footer/footer";
import "./gallery.css";

import heroImg from "../../Pages/Landingpage/Heroimage.png"; 

/* ---------- TOP 6 IMAGES ---------- */
import top1 from "./Conferencegallery1.jpeg";
import top2 from "./Conferencegallery2.jpeg";
import top3 from "./Conferencegallery3.jpeg";
import top4 from "./Conferencegallery4.jpeg";
import top5 from "./Conferencegallery5.jpeg";
import top6 from "./Conferencegallery6.jpeg";

/* ---------- EXISTING IMAGES ---------- */
const galleryImages = [
  "galleryn.jpg","galleryn0.jpg","galleryn1.jpg","galleryn2.jpg",
  "galleryn3.jpg","galleryn4.jpg","galleryn5.jpg","galleryn6.jpg",
  "galleryn7.png","galleryn8.jpg","galleryn9.jpg", "galleryn11.jpg",
  "galleryn12.jpg","galleryn13.jpg" ].map(img => require(`../images/${img}`));

const sepImages = [
  "sepgallery.jpg","sepgallery6.jpg","sepgallery7.jpg",
  "sepgallery8.jpg","sepgallery9.jpg","sepgallery10.jpg",
  "sepgallery11.jpg" ].map(img => require(`./${img}`));

const topImages = [top1, top2, top3, top4, top5, top6];

const images = [
  ...sepImages,
  galleryImages[0], galleryImages[1], galleryImages[2], galleryImages[3],
  galleryImages[4], galleryImages[5], galleryImages[8], galleryImages[9],
  galleryImages[10], galleryImages[11], galleryImages[7],
  galleryImages[12], galleryImages[13]
];

export default function Gallery() {
  return (
    <div className="gal-root">
      <Navbar />
      <div style={{ height: 68 }} />

      {/* ════ HERO ════ */}
      <section className="gal-hero">
        <div className="gal-glow gal-glow-1" />
        <div className="gal-glow gal-glow-2" />
        <div className="gal-glow gal-glow-3" />

        {/* LEFT */}
        <div className="gal-hero-left">
          <h1 className="gal-hero-title gal-anim gal-a2">
            Our <span className="gal-accent">Event </span> Gallery
          </h1>
          <p className="gal-hero-sub gal-anim gal-a3">
            Relive the energy, connections, and defining moments from our
            world-class conferences — captured from the stage and beyond.
          </p>
          <div className="gal-stats gal-anim gal-a4">
            {[["500+","Photos"],["30+","Events"],["120+","Awards"],["50K+","Attendees"]]
              .map(([val, lbl], i, a) => (
                <div key={lbl} style={{ display:"flex", alignItems:"center" }}>
                  <div className="gal-stat">
                    <span className="gal-stat-val">{val}</span>
                    <span className="gal-stat-lbl">{lbl}</span>
                  </div>
                  {i < a.length - 1 && <div className="gal-stat-div" />}
                </div>
              ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="gal-hero-right">
          <div className="gal-dot-grid" />
          <div className="gal-orbit-wrap">
            <div className="gal-ring gal-ring-1" />
            <div className="gal-ring gal-ring-2" />
            <div className="gal-ring gal-ring-3" />
            <div className="gal-ground-glow" />
            <img
              src={heroImg}
              alt="WYNx Event"
              className="gal-hero-img"
            />
          </div>
        </div>
      </section>

      {/* ════ GALLERY ════ */}
      <section className="gal-section">
        <div className="gal-container">
          {/* <div className="gal-eyebrow">Highlights from WYNx Talks</div> */}
          <h2 className="gal-section-title">
            Highlights from  <span className="gal-accent">WYNx Talks</span>
          </h2>
          <div className="gal-divider" />
          <p className="gal-section-sub">
            Award-winning moments, breakthrough conversations, and the faces
            that define the WYNx movement.
          </p>

          {/* Top 6 — 2 per row */}
          <div className="gal-top-grid">
            {topImages.map((img, i) => (
              <div className="gal-img-item gal-img-top" key={i}>
                <img src={img} alt={`Conference ${i + 1}`} />
              </div>
            ))}
          </div>

          {/* Remaining — 4 per row */}
          <div className="gal-main-grid">
            {images.map((img, i) => (
              <div className="gal-img-item gal-img-main" key={i}>
                <img src={img} alt={`Event ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewFooter />
    </div>
  );
}