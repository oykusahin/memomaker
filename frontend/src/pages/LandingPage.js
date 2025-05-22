import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../assets/landing_image.jpg";
import StatsSection from "../components/StatsSection";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
  <Box
    sx={{
      minHeight: "100vh",
      backgroundImage: `url(${background})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      zIndex: 0,
    }}
  >
  <Box sx={{ pt: "100px", pb: 8 }}>
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        px: 3,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Memomaker
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }} paragraph>
          Turn your memories into beautiful scrapbooks using AI.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/upload")}
        >
          Start Building Your Scrapbook
        </Button>
      </Container>
    </Box>

    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <StatsSection />
      </Paper>
    </Container>
  </Box>
</Box>
  );
};

export default LandingPage;
