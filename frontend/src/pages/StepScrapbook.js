import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getPreviousRoute } from "../utils/navigation";
import StepperWrapper from "../components/StepperWrapper";

const StepScrapbook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prev = getPreviousRoute(location.pathname);

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, mb: 8 }}>
      <StepperWrapper />
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight={800}
          gutterBottom
          color="primary.main"
          sx={{ letterSpacing: 1, mt: 4 }}>
          Step 3: View Scrapbook
        </Typography>

        <Typography variant="body1" sx={{ mt: 2 }}>
          This is where your selected images and captions will be arranged into
          a printable or shareable scrapbook layout.
        </Typography>

        <Box sx={{ mt: 4 }}>
          {prev && (
            <Button variant="outlined" onClick={() => navigate(prev)}>
              Back
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default StepScrapbook;
