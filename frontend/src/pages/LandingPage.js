import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../assets/landing_image.jpg";
import StatsSection from "../components/StatsSection";
import NewsletterSignup from "../components/NewsletterSignup";
import PhotoAlbumIcon from "@mui/icons-material/PhotoAlbum";

// Sample scrapbooks data (replace with real images/links as needed)
const sampleScrapbooks = [
  {
    title: "Wedding Memories",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Family Vacation",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Graduation Day",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Baby's First Year",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "Travel Adventures",
    image:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3c5a?auto=format&fit=crop&w=400&q=80",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

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
          backgroundImage: `linear-gradient(rgba(34,34,60,0.55), rgba(34,34,60,0.55)), url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}>
        <Container maxWidth="md" sx={{ zIndex: 2, position: "relative" }}>
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
              alignItems="center"
              sx={{ width: "100%" }}>
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
      <Container
        maxWidth="lg"
        sx={{
          mt: 0,
          mb: 6,
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
            mt: -8,
          }}>
          <Typography
            variant="h4"
            fontWeight={800}
            textAlign="center"
            color="primary.main"
            sx={{
              mb: 4,
              letterSpacing: 1,
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}>
            <PhotoAlbumIcon
              sx={{ fontSize: 38, color: "secondary.main", mr: 1 }}
            />
            What We Do?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12}>
              <StatsSection />
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Sample Scrapbooks Section */}
      <Container
        maxWidth="lg"
        sx={{
          mb: 8,
          py: 2,
        }}>
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary.main"
          textAlign="center"
          sx={{ mb: 3, letterSpacing: 1 }}>
          Sample Scrapbooks
        </Typography>
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
            display: "flex",
            gap: 4,
            py: 2,
            px: 1,
            scrollbarWidth: "thin",
            scrollbarColor: "#bdbdbd #f8fafc",
          }}>
          {sampleScrapbooks.map((book, idx) => (
            <Paper
              key={idx}
              elevation={4}
              sx={{
                minWidth: 260,
                maxWidth: 280,
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 4px 24px 0 rgba(31,38,135,0.10)",
                bgcolor: "#fff",
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.18s, box-shadow 0.18s",
                "&:hover": {
                  transform: "translateY(-6px) scale(1.03)",
                  boxShadow: "0 12px 40px 0 rgba(31,38,135,0.18)",
                },
              }}>
              <Box
                component="img"
                src={book.image}
                alt={book.title}
                sx={{
                  width: "100%",
                  height: 180,
                  objectFit: "cover",
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              />
              <Box sx={{ p: 2, width: "100%", textAlign: "center" }}>
                <Typography variant="h6" fontWeight={700} color="primary.main">
                  {book.title}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
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
