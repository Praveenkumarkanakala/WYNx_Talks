import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import Footer from "../footer/footer";
import Navbar from "../Navbar/navbar";
import wynxBackground from "../images/wynxbgn.jpg";

const Whynominate = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Navbar />
      <Box sx={{ position: "relative", width: "100%", height: "70vh", backgroundImage: `url(${wynxBackground})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ position: "absolute", color: "white", textAlign: "center", p: { xs: 2, md: 5 }, borderRadius: 1, width: "90%", maxWidth: 600 }}>
          <Typography variant="h1" sx={{ color: "white", fontSize: { xs: "2rem", md: "2.5rem" }, fontWeight: "bold", mb: 1 }}>WHY NOMINATE</Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}>Home / Why Nominate</Typography>
        </Box>
      </Box>
      <Container sx={{ py: { xs: 4, md: 8 }, textAlign: "center", bgcolor: "#fff", color: "#4a4a4a", fontFamily: "Arial, sans-serif" }}>
        <Typography variant="subtitle1" sx={{ fontSize: "1rem", color: "#4a148c", mb: 1 }}>Why Nominate</Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, color: "#4a148c", mb: 2 }}>Nominate Trailblazers for the First-of-Its-Kind WYNx Talks Awards</Typography>
        <Box sx={{ width: 50, height: 3, bgcolor: "#4a148c", mx: "auto", mb: 3 }} />
        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, lineHeight: 1.8, textAlign: "left", mx: "auto", maxWidth: "80%", mb: 3 }}>
        Do you know an individual or organization breaking barriers, driving innovation, and creating transformative impact in public health, mental well-being, or community leadership? Nominate them for the prestigious WYNx Talks Awards—a global platform celebrating extraordinary contributions to healthier, more resilient societies. This is your chance to spotlight changemakers whose work inspires action and redefines possibilities. Let their story of innovation and impact take center stage—submit your nomination today!
        </Typography>
        <Button onClick={() => navigate("/awardsnomination")} sx={{ bgcolor: "#ff0077", color: "#fff", fontSize: { xs: "0.9rem", md: "1rem" }, p: { xs: "0.5rem 1rem", md: "0.75rem 1.5rem" }, borderRadius: "5px", transition: "background-color 0.3s ease", "&:hover": { bgcolor: "#e60068" } }}>Enter To Win</Button>
      </Container>
      <Footer />
    </Box>
  );
};

export default Whynominate;
