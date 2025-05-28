import React, { useState } from "react";
import {
  Box,
  Typography,
  CardContent,
  CardMedia,
  TextField,
  MenuItem,
  Button,
  Divider,
  Stack,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const captionModes = [
  { value: "default", label: "Default" },
  { value: "romantic", label: "Romantic" },
  { value: "historical", label: "Historical" },
  { value: "journalistic", label: "Journalistic" },
];

const ImageDetailCard = ({ item, onSave, onClose }) => {
  const [caption, setCaption] = useState(item.description_text || "");
  const [mode, setMode] = useState("default");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setGenerated(false);
    try {
      const res = await fetch(`http://localhost:8000/api/generate_caption/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, mode }),
      });
      const data = await res.json();
      setCaption(data.caption);
      setGenerated(true);
    } catch (err) {
      setCaption("Error generating caption.");
      setGenerated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (onSave) onSave(caption);
  };

  return (
    <Box
      sx={{
        position: "relative",
        p: { xs: 2, md: 4 },
        bgcolor: "#fff",
        borderRadius: 4,
        boxShadow: 6,
        maxWidth: 500,
        mx: "auto",
        my: 2,
      }}>
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
        <CloseIcon />
      </IconButton>
      <CardMedia
        component="img"
        image={`http://localhost:8000/${
          item.file_path || "storage/" + item.filename
        }`}
        alt={item.filename}
        sx={{
          width: "100%",
          maxWidth: 400,
          height: 220,
          objectFit: "cover",
          borderRadius: 3,
          boxShadow: 2,
          mb: 2,
          mx: "auto",
        }}
      />
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <InsertPhotoIcon color="primary" />
        <Typography variant="subtitle1" fontWeight={700} color="primary.main">
          {item.filename}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <AccessTimeIcon color="secondary" />
        <Typography variant="body2" color="text.secondary">
          {item.datetime || "Unknown date"}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <LocationOnIcon color="secondary" />
        <Typography variant="body2" color="text.secondary">
          {item.latitude && item.longitude
            ? `${item.latitude}, ${item.longitude}`
            : "No location"}
        </Typography>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          color="primary.main"
          sx={{ mb: 2, textAlign: "center" }}>
          Caption Generator
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
          <TextField
            select
            label="Caption Mode"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            size="small"
            sx={{ minWidth: 160 }}>
            {captionModes.map((m) => (
              <MenuItem key={m.value} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AutoAwesomeIcon />}
            onClick={handleGenerate}
            disabled={loading}
            sx={{ minWidth: 180, fontWeight: 700 }}>
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Generate Caption"
            )}
          </Button>
          {generated && !loading && (
            <CheckCircleIcon color="success" sx={{ ml: 1 }} />
          )}
        </Stack>
        <TextField
          label="Caption"
          multiline
          fullWidth
          rows={3}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{
            bgcolor: "#f8fafc",
            borderRadius: 2,
            mb: 1,
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
};

export default ImageDetailCard;
