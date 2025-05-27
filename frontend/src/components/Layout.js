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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: isLanding ? 0 : { xs: 4, sm: 5 },
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 3 },
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default Layout;
