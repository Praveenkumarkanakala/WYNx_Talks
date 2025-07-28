import React from "react";
import { Box, Container, Grid, Typography, styled } from "@mui/material";
import Navbar from "../Navbar/navbar";
import Footer from "../footer/footer";
import img from "../images/galleryn.jpg";
import img0 from "../images/galleryn0.jpg";
import img1 from "../images/galleryn1.jpg";
import img2 from "../images/galleryn2.jpg";
import img3 from "../images/galleryn3.jpg";
import img4 from "../images/galleryn4.jpg";
import img5 from "../images/galleryn5.jpg";
import img6 from "../images/galleryn6.jpg";
import img7 from "../images/galleryn7.png";
import img8 from "../images/galleryn8.jpg";
import img9 from "../images/galleryn9.jpg";
import img10 from "../images/galleryn10.png";
import img11 from "../images/galleryn11.jpg";
import img12 from "../images/galleryn12.jpg";
import img13 from "../images/galleryn13.jpg";
import wynxBackground from "../images/wynxbgn.jpg";

const images = [
  img, img0, img1, img2, img3, img4, img5, img7, img8, img9, img10, img11, img6, img12, img13
];

const HeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "70vh",
  backgroundImage: `url(${wynxBackground})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("lg")]: { height: "60vh" },
  [theme.breakpoints.down("md")]: { height: "50vh" },
  [theme.breakpoints.down("sm")]: { height: "40vh" },
}));

const Overlay = styled(Box)(({ theme }) => ({
  color: "white",
  textAlign: "center",
  padding: theme.spacing(2.5),
  borderRadius: 10,
  width: "90%",
  maxWidth: 600,
  [theme.breakpoints.down("sm")]: { padding: theme.spacing(2) },
}));

const GalleryItem = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  height: 250,
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: theme.shadows[10],
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));

const Gallery = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <HeroSection>
        <Overlay>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.2rem", lg: "2.4rem" },
              color: "white",
              fontWeight: "bold",
            }}
          >
            EVENT GALLERY
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem" },
              mt: 1,
              color: "white",
            }}
          >
            Home / Event Gallery
          </Typography>
        </Overlay>
      </HeroSection>
      <Container sx={{ py: 5, textAlign: "center" }}>
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: { xs: 16, md: 18 }, color: "grey.600", mb: 1, fontWeight: 500 }}
          >
            Previous Moments
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 28, md: 36 },
              color: "#5a2d82",
              mb: 2,
              fontWeight: "bold",
            }}
          >
            Event Gallery
          </Typography>
          <Box
            sx={{
              width: { xs: 40, md: 60 },
              height: { xs: 3, md: 4 },
              bgcolor: "#5a2d82",
              mx: "auto",
              mb: 5,
              borderRadius: 2,
            }}
          />
        </Box>
        <Grid container spacing={{ xs: 1, md: 2 }}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <GalleryItem>
                <img src={image} alt={`Event ${index + 1}`} />
              </GalleryItem>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default Gallery;




