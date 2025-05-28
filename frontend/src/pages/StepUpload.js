import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  InputLabel,
  LinearProgress,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Fade,
  CircularProgress,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate, useLocation } from "react-router-dom";
import { getNextRoute, getPreviousRoute } from "../utils/navigation";
import StepperWrapper from "../components/StepperWrapper";

const StepUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const next = getNextRoute(location.pathname);
  const prev = getPreviousRoute(location.pathname);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setStatus("");
    setUploaded(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
    setStatus("");
    setUploaded(false);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setStatus("");
    setUploaded(false);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.post("http://localhost:8000/api/uploadfiles/", formData);
      setStatus("Upload successful!");
      setUploaded(true);
      setFiles([]);
    } catch (error) {
      console.error(error);
      setStatus("Upload failed.");
      setUploaded(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <StepperWrapper />
      <Paper
        elevation={4}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput").click()}
        sx={{
          minHeight: 220,
          p: 4,
          border: "2px dashed",
          borderColor: "primary.light",
          borderRadius: 3,
          cursor: "pointer",
          background: "linear-gradient(135deg, #f8fafc 60%, #e3e6f3 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          mb: 3,
          transition: "box-shadow 0.2s",
          "&:hover": {
            boxShadow: 6,
            borderColor: "primary.main",
          },
        }}>
        <CloudUploadIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" color="primary.main" gutterBottom>
          Drag & drop images here, or click to select
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (JPEG, PNG, up to 10 files)
        </Typography>
        <input
          type="file"
          id="fileInput"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </Paper>
      <Fade in={files.length > 0}>
        <Box>
          <InputLabel sx={{ mb: 1 }}>Selected Files</InputLabel>
          <Box
            sx={{
              maxHeight: 220,
              minHeight: 60,
              overflowY: "auto",
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              mb: 2,
              background: "#fff",
              // Prevent the list from pushing content below it
              position: "relative",
            }}>
            <List dense sx={{ p: 0 }}>
              {files.map((file, idx) => (
                <ListItem
                  key={idx}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveFile(idx)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  }>
                  <ListItemIcon>
                    <InsertPhotoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Fade>
      <Grid container spacing={2} mt={4} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              sx={{ py: 1.2, fontWeight: 600, flex: 1 }}>
              {uploading ? "Uploading..." : "Upload Files"}
            </Button>
            {uploading && (
              <CircularProgress
                size={28}
                sx={{ ml: 2, color: "primary.main" }}
                thickness={5}
              />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {uploaded && (
            <Box display="flex" alignItems="center" gap={1}>
              <CheckCircleIcon color="success" />
              <Typography color="success.main">Upload successful!</Typography>
            </Box>
          )}
          {status && !uploaded && (
            <Typography color="error.main">{status}</Typography>
          )}
          {uploading && <LinearProgress sx={{ mt: 1 }} />}
        </Grid>
      </Grid>
      <Box
        mt={5}
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
            size="large"
            color="secondary"
            sx={{ px: 5, fontWeight: 700, borderRadius: 3 }}
            disabled={!uploaded}
            onClick={() => navigate(next)}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StepUpload;
