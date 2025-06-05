import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
  Stack,
} from "@mui/material";
import StepperWrapper from "../components/StepperWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { getNextRoute, getPreviousRoute } from "../utils/navigation";

// All sizes in cm, for proportional display
const SIZES = [
  {
    pages: 20,
    price: 30,
    size: "30.5 x 30.5 cm",
    width: 30.5,
    height: 30.5,
    label: "Large Square",
  },
  {
    pages: 20,
    price: 25,
    size: "21.6 x 27.9 cm",
    width: 21.6,
    height: 27.9,
    label: "Portrait Classic",
  },
  {
    pages: 20,
    price: 20,
    size: "15.2 x 20.3 cm",
    width: 15.2,
    height: 20.3,
    label: "Medium Portrait",
  },
  {
    pages: 20,
    price: 15,
    size: "10.2 x 15.2 cm",
    width: 10.2,
    height: 15.2,
    label: "Small Portrait",
  },
  {
    pages: 20,
    price: 22,
    size: "17.8 x 22.9 cm",
    width: 22.9,
    height: 17.8,
    label: "Medium Landscape",
  },
];

// Find the largest width/height for scaling
const maxWidth = Math.max(...SIZES.map((s) => s.width));
const maxHeight = Math.max(...SIZES.map((s) => s.height));
const boxMaxPx = 120; // max px for the largest dimension

const StepSelectSize = () => {
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
          Choose your preferred scrapbook size. Each option comes with a
          different price and page size.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {SIZES.map((option) => {
            // Scale box size proportionally
            const widthPx = (option.width / maxWidth) * boxMaxPx;
            const heightPx = (option.height / maxHeight) * boxMaxPx;
            return (
              <Grid item xs={12} sm={6} md={4} key={option.size}>
                <Card
                  onClick={() => handleSelect(option)}
                  sx={{
                    borderRadius: 4,
                    border:
                      selectedSize?.size === option.size
                        ? "2.5px solid #2196f3"
                        : "1.5px solid #e0e0e0",
                    boxShadow: selectedSize?.size === option.size ? 6 : 2,
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
                    <Stack alignItems="center" mb={2}>
                      <Box
                        sx={{
                          width: widthPx,
                          height: heightPx,
                          bgcolor: "#e3e6f3",
                          border:
                            selectedSize?.size === option.size
                              ? "3px solid #2196f3"
                              : "2px solid #bdbdbd",
                          borderRadius: 2,
                          mb: 1,
                          boxShadow: 2,
                          transition: "border 0.2s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ opacity: 0.7 }}>
                          {option.size}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="h6" fontWeight={700} mb={1}>
                      {option.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {option.pages} pages
                    </Typography>
                    <Typography variant="h6" color="secondary" mb={2}>
                      ${option.price}
                    </Typography>
                    <Button
                      variant={
                        selectedSize?.size === option.size
                          ? "contained"
                          : "outlined"
                      }
                      color="primary"
                      sx={{ mt: 2, px: 4, borderRadius: 3, fontWeight: 600 }}
                      fullWidth>
                      {selectedSize?.size === option.size
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
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

export default StepSelectSize;
