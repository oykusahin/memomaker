import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useNavigate } from "react-router-dom";
import background from "../assets/landing_image.jpg"; // Your background image

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Hero Section with Background */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          px: 3,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Memomaker
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }} paragraph>
            Turn your memories into beautiful scrapbooks using AI. Upload photos, generate captions, and relive the moments.
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate("/upload")}>
            Start Building Your Scrapbook
          </Button>
        </Container>
      </Box>

      {/* Feature Cards */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
          Why Memomaker?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {[
            {
              icon: <PhotoLibraryIcon fontSize="large" color="primary" />,
              title: "Upload Effortlessly",
              desc: "Drag and drop your images to begin."
            },
            {
              icon: <EmojiObjectsIcon fontSize="large" color="primary" />,
              title: "AI Captions",
              desc: "Generate smart, romantic, or journalistic text."
            },
            {
              icon: <AccessTimeIcon fontSize="large" color="primary" />,
              title: "Save Time",
              desc: "Let AI handle the details while you relive."
            }
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  p: 4,
                  boxShadow: 3,
                  borderRadius: 3,
                  height: "100%",
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Split Section */}
      <Box sx={{ bgcolor: "#fff", py: 10 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                Memories That Tell Stories
              </Typography>
              <Typography paragraph color="text.secondary">
                Memomaker helps you capture not just photos, but moments. Our smart caption engine adds meaning to your visuals, letting your scrapbook speak for itself.
              </Typography>
              <Button variant="outlined" onClick={() => navigate("/gallery")}>
                Explore Uploaded Memories
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1504198458649-3128b932f49b"
                alt="Scrapbook Preview"
                sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer CTA */}
      <Box sx={{ bgcolor: "#000", color: "#fff", py: 8, textAlign: "center" }}>
        <Container>
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Ready to preserve your memories beautifully?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/upload")}
          >
            Start Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;