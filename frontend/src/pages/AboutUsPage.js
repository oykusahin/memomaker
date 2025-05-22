import React from "react";
import { Box, Container, Typography, Grid, Avatar, Card, CardContent } from "@mui/material";

const team = [
  { name: "Oyku Sahin", role: "Founder & AI Engineer", image: "/path-to-image.jpg" },
  { name: "Jane Doe", role: "Frontend Developer", image: "/path-to-image.jpg" },
];

const AboutUs = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Typography variant="h3" fontWeight={600} textAlign="center" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" maxWidth="md" mx="auto">
          We are a passionate team building Memomaker to help people turn their memories into beautiful scrapbooks with the help of AI.
        </Typography>

        <Grid container spacing={4} mt={4} justifyContent="center">
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", py: 4 }}>
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

export default AboutUs;
