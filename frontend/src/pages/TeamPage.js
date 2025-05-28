import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  Paper,
  Stack,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import heroImage from "../assets/team.jpg"; // You can use a team or hero image here

const team = [
  {
    name: "Öykü Şahin",
    role: "Founder & AI Engineer",
    image: "/images/oyku.jpg",
  },
  {
    name: "Jane Doe",
    role: "Frontend Developer",
    image: "/images/jane.jpg",
  },
  {
    name: "John Smith",
    role: "Backend Developer",
    image: "/images/john.jpg",
  },
];

const TeamPage = () => {
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
        <Box sx={{ position: "relative" }}>
          <img
            src={heroImage}
            alt="Team Header"
            style={{
              width: "100%",
              height: 260,
              objectFit: "cover",
              display: "block",
              filter: "brightness(0.85)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(51,45,86,0.45)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              textAlign: "center",
              px: 2,
            }}>
            <GroupIcon sx={{ fontSize: 48, mb: 1, color: "secondary.light" }} />
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Meet the Team
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.92, fontWeight: 400 }}>
              We are a passionate group of engineers and creatives working
              together to build Memomaker — your AI-powered memory companion.
            </Typography>
          </Box>
        </Box>
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
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary.main"
            textAlign="center"
            gutterBottom
            sx={{ mb: 4, letterSpacing: 1 }}>
            Our Core Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    textAlign: "center",
                    py: 5,
                    px: 3,
                    borderRadius: 4,
                    boxShadow: 2,
                    bgcolor: "#f8fafc",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <Avatar
                    alt={member.name}
                    src={member.image}
                    sx={{
                      width: 100,
                      height: 100,
                      margin: "auto",
                      mb: 2,
                      boxShadow: 3,
                      border: "3px solid #4E6688",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      color="primary.main"
                      gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 1 }}>
                      {member.role}
                    </Typography>
                  </CardContent>
                  <AutoAwesomeIcon
                    color="secondary"
                    sx={{ mt: 2, fontSize: 32 }}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default TeamPage;
