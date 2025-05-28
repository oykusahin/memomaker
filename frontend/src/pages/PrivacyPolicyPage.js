import React from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ShieldIcon from "@mui/icons-material/Shield";
import LockIcon from "@mui/icons-material/Lock";
import InfoIcon from "@mui/icons-material/Info";
import EmailIcon from "@mui/icons-material/Email";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import heroImage from "../assets/privacy_header.jpg";

const PrivacyPolicyPage = () => {
  return (
    <Box
      sx={{
        pb: 10,
        background: "linear-gradient(135deg, #f8fafc 60%, #e3e6f3 100%)",
      }}>
      {/* Hero Section */}
      <Card
        sx={{
          borderRadius: 5,
          mb: 6,
          overflow: "hidden",
          boxShadow: 6,
          maxWidth: 900,
          mx: "auto",
        }}>
        <CardMedia
          component="img"
          height="320"
          image={heroImage}
          alt="Privacy Policy Header"
          sx={{ objectFit: "cover" }}
        />
        <CardContent
          sx={{
            background: "linear-gradient(90deg, #332D56 60%, #4E6688 100%)",
            color: "#fff",
            textAlign: "center",
            py: 4,
          }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>
            Last updated: May 2025
          </Typography>
        </CardContent>
      </Card>

      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            borderRadius: 4,
            p: { xs: 2, md: 5 },
            mb: 6,
            background: "#fff",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
          }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="primary.main"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InfoIcon color="primary" sx={{ mr: 1 }} />
              Introduction
            </Typography>
            <Typography color="text.secondary">
              At Memomaker, your privacy is our priority. This policy outlines
              how we collect, use, and protect your personal data when you use
              our app.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="primary.main"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InsertPhotoIcon color="secondary" sx={{ mr: 1 }} />
              What We Collect
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              We collect images you upload, and metadata such as upload
              timestamps. Optionally, captions you generate or input are stored
              to enhance your scrapbook experience.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="primary.main"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AutoAwesomeIcon color="secondary" sx={{ mr: 1 }} />
              How We Use Your Data
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ShieldIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Generating personalized scrapbook content" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AutoAwesomeIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Improving AI caption suggestions" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <InsertPhotoIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Supporting your ability to retrieve uploaded memories" />
              </ListItem>
            </List>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="primary.main"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LockIcon color="secondary" sx={{ mr: 1 }} />
              Data Protection
            </Typography>
            <Typography color="text.secondary">
              Your files are stored securely and never shared with third
              parties. Access is limited to necessary system functions.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              color="primary.main"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
              Your Rights
            </Typography>
            <Typography color="text.secondary">
              You can request deletion of your data anytime. We comply with GDPR
              and relevant data protection laws.
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              color="primary.main"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon color="secondary" sx={{ mr: 1 }} />
              Contact
            </Typography>
            <Typography color="text.secondary">
              For questions or concerns, please contact us at{" "}
              <Box
                component="span"
                sx={{ fontWeight: 600, color: "primary.main" }}>
                support@memomaker.app
              </Box>
              .
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;
