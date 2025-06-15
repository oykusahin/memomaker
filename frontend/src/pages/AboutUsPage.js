import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import our_story from "../assets/our_story.jpeg";

const coreValues = [
  {
    icon: <FavoriteIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />,
    title: "Empathy",
    desc: "We put people first, designing every feature to help you cherish and share your memories with meaning.",
  },
  {
    icon: <EmojiObjectsIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />,
    title: "Innovation",
    desc: "We harness the latest AI to make storytelling effortless, creative, and magical for everyone.",
  },
  {
    icon: <AutoAwesomeIcon color="secondary" sx={{ fontSize: 40, mb: 1 }} />,
    title: "Simplicity",
    desc: "We believe in intuitive, beautiful design—so you can focus on your moments, not the technology.",
  },
];

const AboutUsPage = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>
      {/* Hero Section with background image */}
      <Box
        sx={{
          position: "relative",
          minHeight: "75vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(rgba(34,34,60,0.55), rgba(34,34,60,0.55)), url(${our_story})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}>
        <Container
          maxWidth="md"
          sx={{
            zIndex: 2,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}>
          <Paper
            elevation={8}
            sx={{
              bgcolor: "rgba(255,255,255,0.13)",
              borderRadius: 5,
              p: { xs: 3, md: 6 },
              mb: 4,
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: 600,
              mx: "auto",
            }}>
            <Typography
              variant="h2"
              fontWeight={800}
              gutterBottom
              sx={{
                letterSpacing: 1,
                color: "#fff",
                textShadow: "0 2px 16px rgba(0,0,0,0.18)",
              }}>
              Get to Know Us
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.92,
                mb: 3,
                color: "#fff",
                fontWeight: 400,
                textShadow: "0 1px 8px rgba(0,0,0,0.18)",
                maxWidth: 600,
                mx: "auto",
              }}>
              We’re a creative team dedicated to helping people turn moments
              into memories through AI.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: -10, md: -14 },
          mb: 1, // Reduce bottom margin to remove unnecessary space
          position: "relative",
          zIndex: 3,
        }}>
        <Paper
          elevation={12}
          sx={{
            borderRadius: 6,
            p: { xs: 3, md: 6 },
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
            bgcolor: "#fff",
            mx: "auto",
            maxWidth: "100%",
          }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  gutterBottom
                  color="primary.main">
                  Our Story
                </Typography>
                <Typography
                  color="text.secondary"
                  paragraph
                  sx={{ fontSize: "1.1rem" }}>
                  Memomaker was founded with one simple goal: help people
                  preserve their memories in the most meaningful way using
                  cutting-edge AI.
                </Typography>
                <Typography
                  color="text.secondary"
                  paragraph
                  sx={{ fontSize: "1.1rem" }}>
                  From weddings to daily moments, we believe every image
                  deserves a story. That’s why we created a tool that writes it
                  for you—so you can focus on living, not just remembering.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Core Values Section */}
      <Container maxWidth="lg" sx={{ py: { mt: 1, xs: 6, md: 10 } }}>
        <Paper
          elevation={12}
          sx={{
            borderRadius: 6,
            p: { xs: 3, md: 6 },
            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
            bgcolor: "#fff",
            mx: "auto",
            maxWidth: "100%",
          }}>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
            color="primary.main"
            sx={{ mb: 4, letterSpacing: 1 }}>
            Our Core Values
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              width: "100%",
            }}>
            {coreValues.map((value, idx) => (
              <Paper
                key={idx}
                elevation={3}
                sx={{
                  width: { xs: "100%", sm: 500, md: 600 },
                  maxWidth: "100%",
                  minHeight: 180,
                  mx: "auto",
                  mb: 0,
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  bgcolor: "#f8fafc",
                  boxShadow: "0 4px 24px 0 rgba(31,38,135,0.10)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 2,
                }}>
                <Box sx={{ mb: 1 }}>{value.icon}</Box>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.desc}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: { xs: 8, md: 10 },
          textAlign: "center",
        }}>
        <Container>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Join us on our journey.
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
            Start building your own AI-powered memory book today.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 5, fontWeight: 700 }}
              href="/upload">
              Get Started
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{
                px: 5,
                fontWeight: 600,
                borderColor: "#fff",
                color: "#fff",
              }}
              href="/">
              Back to Home
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUsPage;
