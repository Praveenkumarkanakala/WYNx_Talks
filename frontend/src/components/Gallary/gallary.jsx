import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";
import wynxBackground from "../images/wynxbgn.jpg";

/* ---------- TOP 4 IMAGES ---------- */
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
  "galleryn7.png","galleryn8.jpg","galleryn9.jpg","galleryn10.png",
  "galleryn11.jpg","galleryn12.jpg","galleryn13.jpg"
].map(img => require(`../images/${img}`));

const sepImages = [
  "sepgallery.jpg","sepgallery6.jpg","sepgallery7.jpg",
  "sepgallery8.jpg","sepgallery9.jpg","sepgallery10.jpg",
  "sepgallery11.jpg"
].map(img => require(`./${img}`));
/* ---------- ARRAYS ---------- */
const topImages = [top1, top2, top3, top4, top5, top6];

const images = [  ...sepImages,  galleryImages[0],  galleryImages[1],  galleryImages[2],  galleryImages[3],  galleryImages[4],  galleryImages[5],
  galleryImages[8],  galleryImages[9],  galleryImages[10],  galleryImages[11],  galleryImages[7],  galleryImages[12],  galleryImages[13]
];

/* ---------- STYLES ---------- */
const HeroSection = styled(Box)({
  height: "60vh",
  background: `url(${wynxBackground}) center/cover`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const GalleryItem = styled(Box)(({ top }) => ({
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  height: top ? 300 : 250,   // slightly taller for top images

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: top ? "top center" : "center",  // 👈 key fix
    transition: ".3s",
  },

  "&:hover img": {
    transform: "scale(1.05)",
  },
}));

/* ---------- COMPONENT ---------- */
const Gallery = () => (
  <Box>
    <Navbar />

    <HeroSection>
      <Box textAlign="center" color="white">
        <Typography variant="h4" fontWeight="bold">
          EVENT GALLERY
        </Typography>
        <Typography>Home / Event Gallery</Typography>
      </Box>
    </HeroSection>

    <Container sx={{ py: 5, textAlign: "center" }}>
      <Typography color="gray">Previous Moments</Typography>
      <Typography variant="h4" fontWeight="bold" color="#5a2d82">
        Past Conference Gallery
      </Typography>

      {/* -------- FIRST 4 IMAGES (2 PER ROW) -------- */}
      <Grid container spacing={2} mt={3} mb={2}>
        {topImages.map((img, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <GalleryItem top>
              <img src={img} alt={`Top ${i}`} />
            </GalleryItem>
          </Grid>
        ))}
      </Grid>

      {/* -------- REMAINING IMAGES -------- */}
      <Grid container spacing={2}>
        {images.map((img, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <GalleryItem>
              <img src={img} alt={`Event ${i}`} />
            </GalleryItem>
          </Grid>
        ))}
      </Grid>
    </Container>

    <Footer />
  </Box>
);

export default Gallery;