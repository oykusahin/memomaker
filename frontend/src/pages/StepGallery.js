import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  IconButton,
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
} from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
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
      const response = await axios.post("http://localhost:8000/api/generate_caption/", {
        id: captionTarget.id,
        mode: captionMode,
      });
      setEditedCaption(response.data.caption || "");
    } catch (err) {
      console.error("Caption generation failed", err);
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
        i.id === captionTarget.id ? { ...i, description_text: editedCaption } : i
      )
    );
    setCaptionDialogOpen(false);
  };

  return (
    <Box>
      {/* Header controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Step 2: Select Photos</Typography>
        <Box>
          {prev && (
            <Button onClick={() => navigate(prev)} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {next && (
            <Button variant="contained" onClick={() => navigate(next)}>
              Next
            </Button>
          )}
        </Box>
      </Box>

      {/* Image Grid */}
      <Grid container spacing={2} sx={{ maxHeight: 480, overflowY: "auto" }}>
        {items.map((item) => (
          <Grid item xs={6} sm={3} md={2} key={item.id}>
            <Card
              sx={{
                position: "relative",
                border: selected[item.id] ? "2px solid red" : "1px solid #ccc",
                height: 160,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ position: "absolute", top: 5, left: 5 }}>
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  checked={!!selected[item.id]}
                  onChange={() => handleToggleSelect(item.id)}
                />
              </Box>

              <CardMedia
                component="img"
                image={`http://localhost:8000/storage/${item.filename}`}
                alt={item.filename}
                sx={{
                  height: 120,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => openCaptionEditor(item)}
              />
              <Typography variant="caption" align="center" sx={{ p: 1 }}>
                {item.filename}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Caption Editor Dialog */}
      <Dialog
        open={captionDialogOpen}
        onClose={() => setCaptionDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Caption</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="caption-mode-label">Caption Mode</InputLabel>
            <Select
              labelId="caption-mode-label"
              value={captionMode}
              label="Caption Mode"
              onChange={(e) => setCaptionMode(e.target.value)}
            >
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
            sx={{ mb: 2 }}
          >
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
  );
};

export default StepGallery;