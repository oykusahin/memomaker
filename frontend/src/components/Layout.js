import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import weddingBackground from "../assets/for_wedding_image.jpg";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isWedding = location.pathname === "/wedding";

  // Determine background style
  const backgroundStyles = isLanding
    ? {}
    : isWedding
    ? {
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(34,34,60,0.55), rgba(34,34,60,0.55)), url(${weddingBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }
    : {
        minHeight: "100vh",
        bgcolor: "#f8fafc",
      };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={backgroundStyles}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: isLanding ? 0 : { xs: 4, sm: 5 },
          px: 0,
          py: 0,
          width: "100%",
        }}>
        {/* Remove maxWidth for full-bleed background, but keep content centered */}
        <Container
          maxWidth={isLanding ? "lg" : false}
          disableGutters={!isLanding}
          sx={{
            px: isLanding ? { xs: 2, sm: 3 } : 0,
            py: isLanding ? { xs: 2, sm: 3 } : 0,
          }}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
