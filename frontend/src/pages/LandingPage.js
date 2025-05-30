import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../assets/landing_image.jpg";
import StatsSection from "../components/StatsSection";
import NewsletterSignup from "../components/NewsletterSignup";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(34,34,60,0.55), rgba(34,34,60,0.55)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        position: "relative",
        zIndex: 0,
        display: "flex",
        flexDirection: "column",
      }}>
      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          px: 3,
          pt: { xs: 8, md: 12 },
          pb: { xs: 4, md: 8 },
        }}>
        <Container maxWidth="md">
          <Paper
            elevation={8}
            sx={{
              bgcolor: "rgba(255,255,255,0.07)",
              borderRadius: 5,
              p: { xs: 3, md: 6 },
              mb: 4,
              backdropFilter: "blur(6px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "inline-block",
            }}>
            <Typography
              variant="h2"
              fontWeight={800}
              gutterBottom
              sx={{
                letterSpacing: 1,
                color: "primary.contrastText",
                textShadow: "0 2px 16px rgba(0,0,0,0.18)",
              }}>
              Memomaker
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.92,
                mb: 3,
                color: "secondary.contrastText",
                fontWeight: 400,
                textShadow: "0 1px 8px rgba(0,0,0,0.18)",
              }}>
              Turn your memories into beautiful, AI-powered scrapbooks.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              alignItems="center">
              <Button
                variant="contained"
                size="large"
                color="primary"
                sx={{ px: 4, fontWeight: 700, fontSize: "1.1rem" }}
                onClick={() => navigate("/upload")}>
                Start Building Your Scrapbook
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="secondary"
                sx={{ px: 4, fontWeight: 600, borderWidth: 2 }}
                onClick={() => navigate("/about")}>
                Learn More
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 }, mb: 6 }}>
        <StatsSection />
      </Container>
      <NewsletterSignup />
      {/* Call to Action Footer */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: { xs: 4, md: 6 },
          textAlign: "center",
        }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Ready to create your memory book?
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 2, px: 5, fontWeight: 700 }}
          onClick={() => navigate("/upload")}>
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
