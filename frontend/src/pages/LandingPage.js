import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" gutterBottom>
        Welcome to Memomaker
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate("/upload")}
      >
        Start building your memories with Memomaker
      </Button>
    </Box>
  );
};

export default LandingPage;
