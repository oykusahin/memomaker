import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
} from "@mui/material";
import StepperWrapper from "../components/StepperWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { getNextRoute, getPreviousRoute } from "../utils/navigation";

const SIZES = [
  { pages: 10, price: 10 },
  { pages: 30, price: 30 },
  { pages: 60, price: 60 },
];

const StepPageNumber = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const next = getNextRoute(location.pathname);
  const prev = getPreviousRoute(location.pathname);

  const handleSelect = (size) => {
    setSelectedSize(size);
  };

  const handleNext = () => {
    if (selectedSize) {
      navigate(next, { state: { selectedSize } });
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", mt: 4, mb: 8 }}>
      <StepperWrapper />
      <Box
        sx={{
          py: 6,
          px: { xs: 2, md: 6 },
          bgcolor: "#f8fafc",
          borderRadius: 4,
          boxShadow: 4,
          mt: 4,
        }}>
        <Typography
          variant="h4"
          fontWeight={800}
          gutterBottom
          color="primary.main"
          textAlign="center"
          sx={{ letterSpacing: 1 }}>
          Select Scrapbook Size
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          textAlign="center"
          sx={{ maxWidth: 500, mx: "auto" }}>
          Choose the number of pages for your scrapbook. Each option comes with
          a different price.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {SIZES.map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option.pages}>
              <Card
                onClick={() => handleSelect(option)}
                sx={{
                  borderRadius: 4,
                  border:
                    selectedSize?.pages === option.pages
                      ? "2.5px solid #2196f3"
                      : "1.5px solid #e0e0e0",
                  boxShadow: selectedSize?.pages === option.pages ? 6 : 2,
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, border 0.2s",
                  p: 3,
                  textAlign: "center",
                  "&:hover": {
                    boxShadow: 8,
                    borderColor: "#2196f3",
                  },
                }}>
                <CardContent>
                  <Typography variant="h5" fontWeight={700} mb={2}>
                    {option.pages} pages
                  </Typography>
                  <Typography variant="h6" color="secondary" mb={2}>
                    ${option.price}
                  </Typography>
                  <Button
                    variant={
                      selectedSize?.pages === option.pages
                        ? "contained"
                        : "outlined"
                    }
                    color="primary"
                    sx={{ mt: 2, px: 4, borderRadius: 3, fontWeight: 600 }}
                    fullWidth>
                    {selectedSize?.pages === option.pages
                      ? "Selected"
                      : "Select"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Container maxWidth="md">
          <Box
            mt={6}
            display="flex"
            justifyContent="space-between"
            alignItems="center">
            {prev && (
              <Button
                variant="outlined"
                color="primary"
                sx={{ px: 5, fontWeight: 600, borderRadius: 3 }}
                onClick={() => navigate(prev)}>
                Back
              </Button>
            )}
            <Box flex={1} />
            {next && (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ px: 5, fontWeight: 700, borderRadius: 3 }}
                disabled={!selectedSize}
                onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default StepPageNumber;
