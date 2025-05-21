import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container component="main" sx={{ flex: 1, mt: { xs: 8, sm: 10 } }}>
        {children}
      </Container>

      <Footer />
    </Box>
  );
};

export default Layout;
