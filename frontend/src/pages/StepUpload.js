import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  InputLabel,
  LinearProgress,
  Paper,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getNextRoute, getPreviousRoute } from "../utils/navigation";

const StepUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const next = getNextRoute(location.pathname);
  const prev = getPreviousRoute(location.pathname);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setStatus("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
    setStatus("");
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setStatus("");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.post("http://localhost:8000/api/uploadfile/", formData);
      setStatus("Upload successful!");
    } catch (error) {
      console.error(error);
      setStatus("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      {/* Header Controls */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Step 1: Upload Your Photos</Typography>
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

      {/* Upload Area */}
      <Box display="flex" flexDirection="column" gap={2}>
        <InputLabel>Drag & Drop JPEG or PNG files below, or click to browse</InputLabel>

        <Paper
          elevation={3}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
          sx={{
            width: "100%",
            padding: 4,
            textAlign: "center",
            border: "2px dashed #ccc",
            borderRadius: 2,
            cursor: "pointer",
            backgroundColor: "#fafafa",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Drop images here or click to select from your device
          </Typography>
        </Paper>

        <input
          type="file"
          id="fileInput"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <Typography variant="body2" color="text.secondary">
          {files.length > 0 ? `${files.length} file(s) ready to upload` : "No files selected"}
        </Typography>

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
        >
          Upload Files
        </Button>

        {uploading && <LinearProgress sx={{ width: "100%", mt: 2 }} />}
        {status && (
          <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
            {status}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default StepUpload;
