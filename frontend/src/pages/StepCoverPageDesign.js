import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Fade,
  TextField,
  Paper,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getPreviousRoute, getNextRoute } from "../utils/navigation";
import StepperWrapper from "../components/StepperWrapper";
import axios from "axios";

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
  const [coverTitle, setCoverTitle] = useState("");
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const prev = getPreviousRoute(location.pathname);
  const next = getNextRoute(location.pathname);

  useEffect(() => {
    axios.get("http://localhost:8000/api/items/").then((res) => {
      setImages(res.data);
    });
  }, []);

  useEffect(() => {
    setLoadingSuggestions(true);
    axios
      .post("http://localhost:8000/api/generate_cover_title/", {
        palette: selectedPalette.name,
        image_path: coverImage ? coverImage.file_path : null,
      })
      .then((res) => {
        setTitleSuggestions(res.data.suggestions || []);
      })
      .catch(() => setTitleSuggestions([]))
      .finally(() => setLoadingSuggestions(false));
    // eslint-disable-next-line
  }, [selectedPalette, coverImage]);

  const handlePaletteSelect = (palette) => setSelectedPalette(palette);
  const handleCoverSelect = (img) => {
    setCoverImage(img);
    setAiImage(null);
  };

  const handleAIGenerate = async () => {
    setAiGenerating(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/generate_cover_image/",
        { palette: selectedPalette.name }
      );
      setAiImage(res.data.image_url);
      setCoverImage(null);
    } catch (err) {
      // Handle error
    } finally {
      setAiGenerating(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 8,
      }}>
      <StepperWrapper />
      <Typography
        variant="h4"
        fontWeight={800}
        gutterBottom
        color="primary.main"
        sx={{ letterSpacing: 1, mt: 4, textAlign: "center" }}>
        Step 4: Design Your Cover Page
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, mb: 3, textAlign: "center" }}>
        Choose a cover image, add a title, select a color palette, or generate a
        unique cover with AI.
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          width: "100%",
          maxWidth: "1400px",
          minHeight: "60vh",
          mx: "auto",
        }}>
        {/* Left: Manual Design */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              height: "100%",
              p: { xs: 2, md: 4 },
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              minHeight: 500,
            }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              1. Select a Cover Image
            </Typography>
            <Box
              sx={{
                height: 240,
                overflowY: "auto",
                mb: 3,
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
                p: 0.5,
                overflowX: "hidden",
              }}>
              {images.map((img) => (
                <Card
                  key={img.id}
                  onClick={() => handleCoverSelect(img)}
                  sx={{
                    minWidth: 0,
                    border:
                      coverImage?.id === img.id
                        ? "2.5px solid #2196f3"
                        : "1.5px solid #e0e0e0",
                    boxShadow: coverImage?.id === img.id ? 6 : 2,
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "box-shadow 0.2s, border 0.2s",
                    "&:hover": { boxShadow: 8, borderColor: "#2196f3" },
                    m: 0,
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <CardMedia
                    component="img"
                    image={`http://localhost:8000/${
                      img.file_path || "storage/" + img.filename
                    }`}
                    alt={img.filename}
                    sx={{
                      width: "100%",
                      height: 100,
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
              ))}
            </Box>

            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              2. Add a Cover Title
            </Typography>
            {loadingSuggestions ? (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Loading suggestions...
              </Typography>
            ) : (
              titleSuggestions.length > 0 && (
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mb: 1, flexWrap: "wrap" }}>
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

            <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
              3. Select a Color Palette
            </Typography>
            <Stack direction="row" spacing={2} mb={2}>
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
                    p: 1,
                    minWidth: 80,
                    transition: "box-shadow 0.2s, border 0.2s",
                    "&:hover": { boxShadow: 8, borderColor: "#2196f3" },
                  }}>
                  <Stack direction="row" spacing={1} justifyContent="center">
                    {palette.colors.map((color, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          width: 18,
                          height: 18,
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
          </Paper>
        </Grid>

        {/* Right: AI Generation */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={4}
            sx={{
              height: "100%",
              p: { xs: 2, md: 4 },
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              minHeight: 500,
            }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              1. Generate with AI
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mb: 3, fontWeight: 700, width: "fit-content" }}
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
          </Paper>
        </Grid>
      </Grid>

      {/* Navigation Buttons */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1400px",
        }}>
        {prev && (
          <Button variant="outlined" onClick={() => navigate(prev)}>
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          disabled={
            !selectedPalette || (!coverImage && !aiImage) || !coverTitle.trim()
          }
          onClick={() =>
            navigate(next, {
              state: {
                coverPalette: selectedPalette,
                coverImage: coverImage,
                aiImage: aiImage,
                coverTitle: coverTitle,
              },
            })
          }>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default StepCoverPageDesign;
