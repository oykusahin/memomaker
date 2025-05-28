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
} from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import our_story from "../assets/our_story.png";

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
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          textAlign: "center",
          background: "linear-gradient(135deg, #f4f5f7 60%, #e3e6f3 100%)",
        }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            fontWeight={800}
            gutterBottom
            sx={{
              letterSpacing: 1,
              color: "primary.main",
              textShadow: "0 2px 16px rgba(0,0,0,0.08)",
            }}>
            Get to Know Us
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", opacity: 0.92 }}>
            We’re a creative team dedicated to helping people turn moments into
            memories through AI.
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container sx={{ py: { xs: 4, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Card elevation={10} sx={{ borderRadius: 4, overflow: "hidden" }}>
              <CardMedia
                component="img"
                image={our_story}
                alt="Our Story"
                sx={{ minHeight: 320, objectFit: "cover" }}
              />
            </Card>
          </Grid>
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
                Memomaker was founded with one simple goal: help people preserve
                their memories in the most meaningful way using cutting-edge AI.
              </Typography>
              <Typography
                color="text.secondary"
                paragraph
                sx={{ fontSize: "1.1rem" }}>
                From weddings to daily moments, we believe every image deserves
                a story. That’s why we created a tool that writes it for you—so
                you can focus on living, not just remembering.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Core Values Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#fafafa" }}>
        <Container>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            gutterBottom
            color="primary.main">
            Our Core Values
          </Typography>
          <Grid container spacing={4} mt={2}>
            {coreValues.map((value, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card
                  elevation={3}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    height: "100%",
                    bgcolor: "#fff",
                  }}>
                  <Box>{value.icon}</Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          textAlign: "center",
          background: "linear-gradient(90deg, #332D56 60%, #4E6688 100%)",
          color: "#fff",
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
