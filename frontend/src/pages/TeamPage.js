// src/pages/TeamPage.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";

const team = [
  {
    name: "Öykü Şahin",
    role: "Founder & AI Engineer",
    image: "/images/oyku.jpg", // replace with your image path or external URL
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
    <Box sx={{ py: 10 }}>
      <Container>
        <Typography
          variant="h3"
          fontWeight={700}
          textAlign="center"
          gutterBottom>
          Meet the Team
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          maxWidth="md"
          mx="auto">
          We are a passionate group of engineers and creatives working together
          to build Memomaker — your AI-powered memory companion.
        </Typography>

        <Grid container spacing={4} mt={4} justifyContent="center">
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  py: 5,
                  px: 3,
                  borderRadius: 4,
                  boxShadow: 3,
                }}>
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight={600}>
                    {member.name}
                  </Typography>
                  <Typography color="text.secondary">{member.role}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TeamPage;
