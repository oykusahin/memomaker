import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Fade,
  Container,
  IconButton, // <-- Add this import
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import StepperWrapper from "../components/StepperWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { getNextRoute, getPreviousRoute } from "../utils/navigation";

const StepGallery = () => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState({});
  const [captionDialogOpen, setCaptionDialogOpen] = useState(false);
  const [captionTarget, setCaptionTarget] = useState(null);
  const [editedCaption, setEditedCaption] = useState("");
  const [captionMode, setCaptionMode] = useState("default");

  const navigate = useNavigate();
  const location = useLocation();
  const next = getNextRoute(location.pathname);
  const prev = getPreviousRoute(location.pathname);

  useEffect(() => {
    axios.get("http://localhost:8000/api/items/").then((res) => {
      setItems(res.data);
    });
  }, []);

  const handleToggleSelect = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openCaptionEditor = (item) => {
    setCaptionTarget(item);
    setEditedCaption(item.description_text || "");
    setCaptionDialogOpen(true);
  };

  const handleGenerateCaption = async () => {
    if (!captionTarget) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/generate_caption/",
        {
          id: captionTarget.id,
          mode: captionMode,
        }
      );
      setEditedCaption(response.data.caption || "");
    } catch (err) {
      setEditedCaption("Caption generation failed.");
    }
  };

  const handleCaptionSave = async () => {
    if (!captionTarget) return;

    await axios.put(`http://localhost:8000/api/items/${captionTarget.id}`, {
      description_text: editedCaption,
    });

    setItems((prev) =>
      prev.map((i) =>
        i.id === captionTarget.id
          ? { ...i, description_text: editedCaption }
          : i
      )
    );
    setCaptionDialogOpen(false);
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

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
          Step 2: Select & Caption Your Photos
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          textAlign="center"
          sx={{ maxWidth: 500, mx: "auto" }}>
          Select your favorite images for your scrapbook. Click the heart to
          select, and edit captions as you wish.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <Fade in>
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: selected[item.id] ? 6 : 2,
                    border: selected[item.id]
                      ? "2.5px solid #e91e63"
                      : "1.5px solid #e0e0e0",
                    position: "relative",
                    transition: "box-shadow 0.2s, border 0.2s",
                    bgcolor: "#fff",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 8,
                      borderColor: "#2196f3",
                    },
                  }}
                  elevation={0}>
                  <Box
                    sx={{ position: "absolute", top: 10, left: 10, zIndex: 2 }}>
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                      checked={!!selected[item.id]}
                      onChange={() => handleToggleSelect(item.id)}
                      sx={{
                        color: "#e91e63",
                        "&.Mui-checked": { color: "#e91e63" },
                        bgcolor: "#fff",
                        borderRadius: "50%",
                      }}
                    />
                  </Box>
                  <CardMedia
                    component="img"
                    image={`http://localhost:8000/${
                      item.file_path || "storage/" + item.filename
                    }`}
                    alt={item.filename}
                    sx={{
                      height: 180,
                      objectFit: "cover",
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                    }}
                    onClick={() => openCaptionEditor(item)}
                  />
                  <CardContent sx={{ textAlign: "center", py: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: "primary.main",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        mb: 1,
                      }}>
                      {item.filename}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        mb: 1,
                      }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          maxWidth: 120,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                        {item.description_text || "No caption"}
                      </Typography>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => openCaptionEditor(item)}
                        sx={{ ml: 1 }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
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
            <Typography
              color="text.secondary"
              sx={{ flex: 1, textAlign: "center" }}>
              {selectedCount} selected
            </Typography>
            {next && (
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ px: 5, fontWeight: 700, borderRadius: 3 }}
                disabled={selectedCount === 0}
                onClick={() => navigate(next)}>
                Next
              </Button>
            )}
          </Box>
        </Container>

        {/* Caption Editor Dialog */}
        <Dialog
          open={captionDialogOpen}
          onClose={() => setCaptionDialogOpen(false)}
          fullWidth
          maxWidth="sm">
          <DialogTitle>Edit Caption</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="caption-mode-label">Caption Mode</InputLabel>
              <Select
                labelId="caption-mode-label"
                value={captionMode}
                label="Caption Mode"
                onChange={(e) => setCaptionMode(e.target.value)}>
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="romantic">Romantic</MenuItem>
                <MenuItem value="historical">Historical</MenuItem>
                <MenuItem value="journalistic">Journalistic</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              fullWidth
              onClick={handleGenerateCaption}
              sx={{ mb: 2 }}>
              Generate Caption
            </Button>

            <TextField
              multiline
              fullWidth
              rows={4}
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCaptionDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCaptionSave} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default StepGallery;
