// src/pages/AboutUs.js
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
} from "@mui/material";

import our_story from "../assets/our_story.png";

const AboutUsPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: 10,
          textAlign: "center",
          backgroundColor: "#f4f5f7",
        }}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Get to Know Us
          </Typography>
          <Typography variant="h6" color="text.secondary">
            We’re a creative team dedicated to helping people turn moments into
            memories through AI.
          </Typography>
        </Container>
      </Box>

      {/* Story Grid */}
      <Container sx={{ py: 10 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card elevation={0}>
              <CardMedia
                component="img"
                image={our_story}
                alt="Our Story"
                sx={{ borderRadius: 2 }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" fontWeight={600} gutterBottom>
                Our Story
              </Typography>
              <Typography color="text.secondary" paragraph>
                Memomaker was founded with one simple goal: help people preserve
                their memories in the most meaningful way using cutting-edge AI.
              </Typography>
              <Typography color="text.secondary" paragraph>
                From weddings to daily moments, we believe every image deserves
                a story. That’s why we created a tool that writes it for you.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ py: 10, backgroundColor: "#fafafa" }}>
        <Container>
          <Typography
            variant="h4"
            fontWeight={600}
            textAlign="center"
            gutterBottom>
            Our Core Values
          </Typography>
          <Grid container spacing={4} mt={4}>
            {["Empathy", "Innovation", "Simplicity"].map((value, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card elevation={2} sx={{ p: 3, textAlign: "center" }}>
                  <Typography variant="h6" fontWeight={600}>
                    {value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
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
          py: 10,
          textAlign: "center",
          backgroundColor: "#000",
          color: "#fff",
        }}>
        <Container>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Join us on our journey.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUsPage;
