// src/pages/PrivacyPolicy.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import heroImage from "../assets/privacy_header.jpg"; // Replace with your image

const PrivacyPolicyPage = () => {
  return (
    <Box sx={{ pb: 10 }}>
      {/* Hero Section */}
      <Card sx={{ borderRadius: 4, mb: 6 }}>
        <CardMedia
          component="img"
          height="400"
          image={heroImage}
          alt="Privacy Policy Header"
          sx={{ objectFit: "cover" }}
        />
      </Card>

      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Last updated: May 2025
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Introduction
        </Typography>
        <Typography paragraph>
          At Memomaker, your privacy is our priority. This policy outlines how
          we collect, use, and protect your personal data when you use our app.
        </Typography>

        <Typography variant="h5" fontWeight={600} mt={6} gutterBottom>
          What We Collect
        </Typography>
        <Typography paragraph>
          We collect images you upload, and metadata such as upload timestamps.
          Optionally, captions you generate or input are stored to enhance your
          scrapbook experience.
        </Typography>

        <Typography variant="h5" fontWeight={600} mt={6} gutterBottom>
          How We Use Your Data
        </Typography>
        <Typography paragraph>Data is used strictly for:</Typography>
        <ul>
          <li>
            <Typography>Generating personalized scrapbook content</Typography>
          </li>
          <li>
            <Typography>Improving AI caption suggestions</Typography>
          </li>
          <li>
            <Typography>
              Supporting your ability to retrieve uploaded memories
            </Typography>
          </li>
        </ul>

        <Typography variant="h5" fontWeight={600} mt={6} gutterBottom>
          Data Protection
        </Typography>
        <Typography paragraph>
          Your files are stored securely and never shared with third parties.
          Access is limited to necessary system functions.
        </Typography>

        <Typography variant="h5" fontWeight={600} mt={6} gutterBottom>
          Your Rights
        </Typography>
        <Typography paragraph>
          You can request deletion of your data anytime. We comply with GDPR and
          relevant data protection laws.
        </Typography>

        <Typography variant="h5" fontWeight={600} mt={6} gutterBottom>
          Contact
        </Typography>
        <Typography paragraph>
          For questions or concerns, please contact us at support@memomaker.app.
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;
