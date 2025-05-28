import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../assets/for_wedding_image.jpg";

const steps = [
  {
    title: "1. Upload Wedding Photos",
    desc: "Drag and drop your favorite photos from your special day. We support high-quality JPEG and PNG files.",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "2. Auto-Caption with AI",
    desc: "Choose a tone (romantic, fun, journalistic), and let our AI generate heartfelt captions for each moment.",
    image:
      "https://images.unsplash.com/photo-1525396528778-026a419f1b52?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "3. Curate Your Scrapbook",
    desc: "Select your favorite images and captions, preview your scrapbook, and customize it as you wish.",
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313c4?auto=format&fit=crop&w=800&q=60",
  },
];

const ForWedding = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(34,34,60,0.55), rgba(34,34,60,0.55)), url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        pt: "100px",
        pb: 8,
        color: "#fff",
      }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
        }}>
        <Container maxWidth="md">
          <Paper
            elevation={8}
            sx={{
              bgcolor: "rgba(255,255,255,0.10)",
              borderRadius: 5,
              p: { xs: 3, md: 6 },
              mb: 4,
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
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
              Memomaker for Weddings
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.92,
                mb: 3,
                color: "secondary.contrastText",
                fontWeight: 400,
                textShadow: "0 1px 8px rgba(0,0,0,0.18)",
              }}
              paragraph>
              Celebrate your big day with personalized, AI-enhanced memories.
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              sx={{ px: 4, fontWeight: 700, fontSize: "1.1rem" }}
              onClick={() => navigate("/upload")}>
              Start Creating Your Wedding Book
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Instruction Section */}
      <Container maxWidth="lg" sx={{ mt: 4, color: "text.primary" }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={4}
          color="primary.main">
          How It Works
        </Typography>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                elevation={4}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  bgcolor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={step.image}
                  alt={step.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    color="primary.main">
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Footer */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: 8,
          mt: 8,
          textAlign: "center",
        }}>
        <Container>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Create the wedding scrapbook you’ll cherish forever.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ px: 5, fontWeight: 700, mt: 2 }}
            onClick={() => navigate("/upload")}>
            Start Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default ForWedding;
