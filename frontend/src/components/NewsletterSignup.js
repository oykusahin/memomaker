import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show success UI
    setSubmitted(true);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 480,
        mx: "auto",
        mt: 6,
        mb: 2,
        p: { xs: 2, sm: 4 },
        borderRadius: 4,
        background: "#fff",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.10)",
        textAlign: "center",
      }}>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 2 }}>
        <EmailIcon color="primary" />
        <Typography variant="h5" fontWeight={700} color="primary.main">
          Stay in the Loop
        </Typography>
      </Stack>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Sign up for our newsletter to get updates, tips, and special offers.
      </Typography>
      {submitted ? (
        <Stack alignItems="center" spacing={1}>
          <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
          <Typography color="success.main" fontWeight={600}>
            Thank you for subscribing!
          </Typography>
        </Stack>
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TextField
            type="email"
            size="small"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ flex: 1, bgcolor: "#f8fafc", borderRadius: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ fontWeight: 700, px: 3, borderRadius: 2 }}>
            Subscribe
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default NewsletterSignup;
