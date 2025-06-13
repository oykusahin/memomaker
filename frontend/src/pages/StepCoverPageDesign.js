import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
  TextField,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getPreviousRoute, getNextRoute } from "../utils/navigation";
import StepperWrapper from "../components/StepperWrapper";
import axios from "axios";

// Example color palettes
const COLOR_PALETTES = [
  { name: "Classic", colors: ["#332D56", "#4E6688", "#C1BCE3"] },
  { name: "Pastel", colors: ["#F8E1F4", "#B6E3E9", "#FDF6E3"] },
  { name: "Earthy", colors: ["#A67C52", "#D9CAB3", "#8C6057"] },
  { name: "Bright", colors: ["#FFB347", "#FF6961", "#77DD77"] },
];

const StepCoverPageDesign = () => {
  const [selectedPalette, setSelectedPalette] = useState(COLOR_PALETTES[0]);
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiImage, setAiImage] = useState(null);
  const [coverTitle, setCoverTitle] = useState(""); // New state for title
  const [titleSuggestions, setTitleSuggestions] = useState([]); // AI suggestions
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const prev = getPreviousRoute(location.pathname);
  const next = getNextRoute(location.pathname);

  // Fetch images for cover selection
  useEffect(() => {
    axios.get("http://localhost:8000/api/items/").then((res) => {
      setImages(res.data);
    });
  }, []);

  // Fetch AI title suggestions
  useEffect(() => {
    setLoadingSuggestions(true);
    axios
      .post("http://localhost:8000/api/generate_cover_title/", {
        palette: selectedPalette.name,
      })
      .then((res) => {
        setTitleSuggestions(res.data.suggestions || []);
      })
      .catch(() => setTitleSuggestions([]))
      .finally(() => setLoadingSuggestions(false));
    // Only fetch when palette changes
    // eslint-disable-next-line
  }, [selectedPalette]);

  const handlePaletteSelect = (palette) => {
    setSelectedPalette(palette);
  };

  const handleCoverSelect = (img) => {
    setCoverImage(img);
    setAiImage(null); // Reset AI image if user selects a manual image
  };

  const handleAIGenerate = async () => {
    setAiGenerating(true);
    try {
      // Example: POST to your AI image generation endpoint
      const res = await axios.post(
        "http://localhost:8000/api/generate_cover_image/",
        {
          palette: selectedPalette.name,
        }
      );
      setAiImage(res.data.image_url); // Assume backend returns { image_url }
      setCoverImage(null); // Deselect manual image if AI is used
    } catch (err) {
      // Handle error
    } finally {
      setAiGenerating(false);
    }
  };

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
          Step 4: Design Your Cover Page
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
          Choose a color palette, select a cover image from your uploaded
          photos, or generate a unique cover with AI.
        </Typography>

        {/* Cover Title Suggestions */}
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          0. Add a Cover Title
        </Typography>
        {loadingSuggestions ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Loading suggestions...
          </Typography>
        ) : (
          titleSuggestions.length > 0 && (
            <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
              {titleSuggestions.map((suggestion, idx) => (
                <Button
                  key={idx}
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    mb: 0.5,
                  }}
                  onClick={() => setCoverTitle(suggestion)}>
                  {suggestion}
                </Button>
              ))}
            </Stack>
          )
        )}
        <TextField
          fullWidth
          label="Cover Title"
          variant="outlined"
          value={coverTitle}
          onChange={(e) => setCoverTitle(e.target.value)}
          sx={{ mb: 4 }}
          inputProps={{ maxLength: 60 }}
          placeholder="Enter your cover title"
        />

        {/* Color Palette Selection */}
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          1. Choose a Color Palette
        </Typography>
        <Stack direction="row" spacing={3} mb={4}>
          {COLOR_PALETTES.map((palette) => (
            <Card
              key={palette.name}
              onClick={() => handlePaletteSelect(palette)}
              sx={{
                cursor: "pointer",
                border:
                  selectedPalette.name === palette.name
                    ? "2.5px solid #2196f3"
                    : "1.5px solid #e0e0e0",
                boxShadow: selectedPalette.name === palette.name ? 6 : 2,
                borderRadius: 3,
                p: 2,
                minWidth: 120,
                transition: "box-shadow 0.2s, border 0.2s",
                "&:hover": { boxShadow: 8, borderColor: "#2196f3" },
              }}>
              <Stack direction="row" spacing={1} justifyContent="center">
                {palette.colors.map((color, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: color,
                      borderRadius: "50%",
                      border: "1.5px solid #fff",
                      boxShadow: 1,
                    }}
                  />
                ))}
              </Stack>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 1 }}>
                {palette.name}
              </Typography>
            </Card>
          ))}
        </Stack>

        {/* Cover Image Selection */}
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          2. Select a Cover Image
        </Typography>
        <Grid container spacing={3} mb={4}>
          {images.map((img) => (
            <Grid item xs={6} sm={4} md={3} key={img.id}>
              <Card
                onClick={() => handleCoverSelect(img)}
                sx={{
                  border:
                    coverImage?.id === img.id
                      ? "2.5px solid #2196f3"
                      : "1.5px solid #e0e0e0",
                  boxShadow: coverImage?.id === img.id ? 6 : 2,
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "box-shadow 0.2s, border 0.2s",
                  "&:hover": { boxShadow: 8, borderColor: "#2196f3" },
                }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:8000/${
                    img.file_path || "storage/" + img.filename
                  }`}
                  alt={img.filename}
                  sx={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    noWrap>
                    {img.filename}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* AI Generation Option */}
        <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
          3. Or Generate with AI
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mb: 3, fontWeight: 700 }}
          onClick={handleAIGenerate}
          disabled={aiGenerating}>
          {aiGenerating ? "Generating..." : "Generate AI Cover"}
        </Button>
        {aiImage && (
          <Fade in>
            <Box sx={{ mt: 2, mb: 2, textAlign: "center" }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                AI Generated Cover
              </Typography>
              <img
                src={aiImage}
                alt="AI Generated Cover"
                style={{
                  width: "100%",
                  maxWidth: 320,
                  borderRadius: 8,
                  boxShadow: "0 4px 24px rgba(51,45,86,0.10)",
                  border: "2px solid #2196f3",
                }}
              />
            </Box>
          </Fade>
        )}

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          {prev && (
            <Button variant="outlined" onClick={() => navigate(prev)}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            disabled={
              !selectedPalette ||
              (!coverImage && !aiImage) ||
              !coverTitle.trim()
            }
            onClick={() =>
              navigate(next, {
                state: {
                  coverPalette: selectedPalette,
                  coverImage: coverImage,
                  aiImage: aiImage,
                  coverTitle: coverTitle, // Pass title to next step
                },
              })
            }>
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default StepCoverPageDesign;
