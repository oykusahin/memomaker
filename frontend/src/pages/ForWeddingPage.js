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
import {
  AssignmentTurnedIn,
  Link as LinkIcon,
  GroupAdd,
  AutoFixHigh,
} from "@mui/icons-material";

const steps = [
  {
    title: "1. Fill out the Form and Receive a Unique Link",
    desc: "Drag and drop your favorite photos from your special day. We support high-quality JPEG and PNG files.",
    icon: <AssignmentTurnedIn sx={{ fontSize: 56, color: "primary.main" }} />,
  },
  {
    title: "2. Share the Link With Your Guests",
    desc: "Choose a tone (romantic, fun, journalistic), and let our AI generate heartfelt captions for each moment.",
    icon: <LinkIcon sx={{ fontSize: 56, color: "primary.main" }} />,
  },
  {
    title: "3. Your Guests Can Add Their Own Images",
    desc: "Select your favorite images and captions, preview your scrapbook, and customize it as you wish.",
    icon: <GroupAdd sx={{ fontSize: 56, color: "primary.main" }} />,
  },
  {
    title: "4. Our AI Based System Will Clean Up the Images for Your Scrapbook",
    desc: "Select your favorite images and captions, preview your scrapbook, and customize it as you wish.",
    icon: <AutoFixHigh sx={{ fontSize: 56, color: "primary.main" }} />,
  },
];

const ForWedding = () => {
  const navigate = useNavigate();
  const theme = useTheme();

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
              bgcolor: "rgba(255,255,255,0.18)",
              borderRadius: 5,
              p: { xs: 3, md: 6 },
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "inline-block",
              textAlign: "center",
            }}>
            <Typography
              variant="h2"
              fontWeight={800}
              gutterBottom
              sx={{
                letterSpacing: 1,
                color: "#fff",
                textShadow: "0 2px 16px rgba(0,0,0,0.28)",
              }}>
              Memomaker for Weddings
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.92,
                mb: 3,
                color: "#fff",
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
        {/* Optional: Add a subtle overlay for better contrast */}
        {/* <Box sx={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          bgcolor: "rgba(34,34,60,0.55)",
          zIndex: 1,
        }} /> */}
      </Box>

      {/* Instruction Section as floating card */}
      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: -10, md: -14 },
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
          }}>
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight={700}
            mb={4}
            color="primary.main">
            How It Works?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {steps.map((step, index) => (
              <Grid
                item
                xs={12}
                sm={8}
                md={4}
                key={index}
                sx={{ display: "flex" }}>
                <Card
                  elevation={8}
                  sx={{
                    height: "100%",
                    borderRadius: 5,
                    overflow: "hidden",
                    bgcolor: "rgba(255,255,255,0.92)",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 6px 32px 0 rgba(31,38,135,0.12)",
                    border: "1px solid rgba(34,34,60,0.08)",
                    transition: "transform 0.18s, box-shadow 0.18s",
                    "&:hover": {
                      transform: "translateY(-6px) scale(1.03)",
                      boxShadow: "0 12px 40px 0 rgba(31,38,135,0.18)",
                    },
                    mx: "auto",
                    minWidth: 0,
                    maxWidth: 350,
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      pt: 3,
                    }}>
                    {step.icon}
                  </Box>
                  <CardContent sx={{ flexGrow: 1, px: 3, py: 2 }}>
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
        </Paper>
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
