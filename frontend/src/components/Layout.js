import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container
        component="main"
        sx={{
          flex: 1,
          mt: isLanding ? 0 : { xs: 8, sm: 10 }, 
          px: 0,
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};


export default Layout;
