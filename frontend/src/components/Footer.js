// src/components/Footer.js
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ py: 3, textAlign: "center", bgcolor: "#f5f5f5" }}>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Memomaker. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
