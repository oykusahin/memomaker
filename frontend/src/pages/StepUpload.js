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
} from "@mui/material";
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
      await axios.post("http://localhost:8000/api/uploadfile/", formData);
      setStatus("Upload successful!");
      setUploaded(true);
    } catch (error) {
      console.error(error);
      setStatus("Upload failed.");
      setUploaded(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ border: '1px solid red' }}>
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sx={{ flexGrow: 1 }}>
          <Box>
            <StepperWrapper activeStep={0} />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Grid item>
          <Typography variant="h5">Step 1: Upload Your Photos</Typography>
        </Grid>
      </Grid>

      
        <Grid item xs={12} sx={{ flexGrow: 1 }}>
          <Paper
            elevation={3}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => document.getElementById("fileInput").click()}
            sx={{
              height: "100%",
              minHeight: 280,
              p: 4,
              border: "2px dashed #ccc",
              borderRadius: 2,
              cursor: "pointer",
              backgroundColor: "#fafafa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Drag and drop images here or click to select from your device
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
        </Grid>

        <Grid container direction="column" spacing={2} mb={2} alignItems="center">
          <Grid item xs={12}>
          <InputLabel>Selected Files</InputLabel>
            <Typography variant="body2" color="text.secondary">
                {files.length > 0
                  ? `${files.length} file(s) ready to upload`
                  : "No files selected"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <Button
                fullWidth
                variant="contained"
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
          >
            Upload Files
          </Button>
          </Grid>
          <Grid item>
              {uploading && <LinearProgress sx={{ mt: 2 }} />}
              {status && (
                <Typography
                  variant="body2"
                  color={uploaded ? "success.main" : "error"}
                  sx={{ mt: 2 }}
                >
                  {status}
                </Typography>
              )}
          </Grid>
          </Grid>
          <Grid spacing={2} container xs={12} justifyContent="flex-end">
          <Grid item xs={2}>
            {prev && (
              <Button onClick={() => navigate(prev)} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {next && (
              <Button
                variant="contained"
                onClick={() => navigate(next)}
                disabled={!uploaded}
              >
                Next
              </Button>
            )}
          </Grid>
          </Grid>
    </Box>
  );
};

export default StepUpload;
