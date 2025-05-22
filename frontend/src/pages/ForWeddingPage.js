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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../assets/for_wedding_image.jpg";

const ForWedding = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        pt: "100px",
        pb: 8,
        color: "#fff",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Memomaker for Weddings
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }} paragraph>
            Celebrate your big day with personalized, AI-enhanced memories.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/upload")}
          >
            Start Creating Your Wedding Book
          </Button>
        </Container>
      </Box>

      {/* Instruction Section */}
      <Container maxWidth="lg" sx={{ mt: 4, color: "text.primary" }}>
        <Typography variant="h4" textAlign="center" fontWeight={600} mb={4}>
          How It Works
        </Typography>

        <Grid container spacing={4}>
          {[
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
          ].map((step, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ height: "100%", borderRadius: 3, overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={step.image}
                  alt={step.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {step.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Footer */}
      <Box sx={{ bgcolor: "#000", color: "#fff", py: 8, mt: 8, textAlign: "center" }}>
        <Container>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Create the wedding scrapbook you’ll cherish forever.
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate("/upload")}>
            Start Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default ForWedding;
