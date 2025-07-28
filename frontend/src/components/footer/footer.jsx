import React from "react";
import { Box, Container, Grid, Typography, Button, TextField, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faYoutube, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import wynxBackground from "../images/wynxbg.png";
import wynxFooter from "../images/wynxfooter.jpg";

const socialLinks = [
  { href: "https://facebook.com", icon: faFacebookF },
  { href: "https://twitter.com", icon: faTwitter },
  { href: "https://youtube.com", icon: faYoutube },
  { href: "https://linkedin.com", icon: faLinkedinIn },
  { href: "https://instagram.com", icon: faInstagram },
];

const footerLinks = [
  { to: "/awardcategories", label: "Categories" },
  { to: "/awardwinners", label: "Award Winner" },
  { to: "/sponsor", label: "Sponsor" },
  { to: "/terms-and-conditions", label: "Terms & Conditions" },
  { to: "/gallery", label: "Gallery" },
];

const hoverStyle = { "&:hover": { transform: "scale(1.08)" }, transition: "all 0.3s ease" };

const Partners = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: "#f5f5f5", fontFamily: "'Poppins', sans-serif" }}>
      <Box
        sx={{
          minHeight: "20vh",
          backgroundImage: `url(${wynxBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 4, md: 6 },
          position: "relative",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(2px)",
          },
        }}
      >
        <Container sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography
                sx={{
                  fontSize: { xs: 18, md: 22 },
                  fontWeight: 700,
                  mb: 3,
                  color: "white",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                For Nomination and Sponsorship
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 400, mb: 1.5, color: "white", textAlign: "center" }}
              >
                Contact WYNxTalks
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 400, mb: 1.5, color: "white", textAlign: "center" }}
              >
                Contact Number: +1 (716) 217-1471
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 16, md: 18 }, fontWeight: 400, color: "white", textAlign: "center" }}
              >
                Contact Email: contact@wynxtalks.com
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ bgcolor: "#221e40", color: "white", py: { xs: 4, md: 5 }, textAlign: "center" }}>
        <Container
          sx={{
            backgroundImage: `url(${wynxFooter})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "1.5rem",
            py: { xs: 4, md: 5 },
            px: { xs: 2, md: 4 },
            mb: 4,
            position: "relative",
            "&:before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.3)",
              backdropFilter: "blur(2px)",
              borderRadius: "1.5rem",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 22 },
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#e0e0e0",
                letterSpacing: 2.5,
                mb: 2,
              }}
            >
              Subscribe to Newsletter
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, md: 16 }, color: "#e0e0e0", fontWeight: 300, mb: 3 }}>
              Want something extra?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1.5, mt: 2 }}>
              <TextField
                placeholder="Your Email"
                variant="outlined"
                sx={{
                  maxWidth: 1500,
                  "& .MuiInputBase-root": {
                    bgcolor: "rgba(255,255,255,0.1)",
                    border: "none",
                    borderBottom: "2px solid #e0e0e0",
                    color: "white",
                    borderRadius: 1,
                  },
                  "& .MuiInputBase-input": { p: 1.2, fontSize: 14 },
                  "& .MuiInputBase-input::placeholder": { color: "#e0e0e0", opacity: 0.8 },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1.2,
                  bgcolor: "#ff007f",
                  fontSize: 14,
                  fontWeight: 600,
                  borderRadius: 8,
                  boxShadow: "0 6px 16px rgba(255,0,127,0.4)",
                  ...hoverStyle,
                  "&:hover": { bgcolor: "#d81b60", transform: "scale(1.06)" },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>
        </Container>

        <Container>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2.5, mb: 3 }}>
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                sx={{
                  color: "white",
                  ...hoverStyle,
                  "&:hover": { color: "#ff007f", transform: "scale(1.3)" },
                }}
              >
                <FontAwesomeIcon icon={social.icon} size="lg" />
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 1.5,
              mb: 3,
              fontSize: { xs: 12, md: 14 },
            }}
          >
            {footerLinks.map((link, index) => (
              <React.Fragment key={index}>
                <Link
                  href={link.to}
                  sx={{
                    color: "#e0e0e0",
                    textDecoration: "none",
                    fontWeight: 400,
                    ...hoverStyle,
                    "&:hover": { color: "#ff007f", transform: "scale(1.05)" },
                  }}
                >
                  {link.label}
                </Link>
                {index < 4 && (
                  <Typography sx={{ mx: 1, color: "#e0e0e0", fontWeight: 400 }}>•</Typography>
                )}
              </React.Fragment>
            ))}
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              color: "#e0e0e0",
              fontWeight: 300,
              letterSpacing: 0.5,
            }}
          >
            Copyright © 2024 Franchise India.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Partners;
