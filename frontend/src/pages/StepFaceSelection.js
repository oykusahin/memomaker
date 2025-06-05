import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Container } from "@mui/material";
import StepperWrapper from "../components/StepperWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { getNextRoute, getPreviousRoute } from "../utils/navigation";
import axios from "axios";

const StepFaceSelection = () => {
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const next = getNextRoute(location.pathname);
  const prev = getPreviousRoute(location.pathname);

  useEffect(() => {
    axios.get("http://localhost:8000/api/faces/").then((res) => {
      setDetectedFaces(res.data);
    });
  }, []);

  // Toggle by person_id, not face.id
  const togglePerson = (person_id) => {
    setSelectedPersons((prev) =>
      prev.includes(person_id)
        ? prev.filter((p) => p !== person_id)
        : [...prev, person_id]
    );
  };

  const handleNext = async () => {
    try {
      await axios.post("http://localhost:8000/api/selected_persons/", {
        person_ids: selectedPersons,
      });
      navigate(next);
    } catch (error) {
      console.error("Failed to save selected persons:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
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
          Step 3: Select People to Include
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mb={4}
          textAlign="center"
          sx={{ maxWidth: 500, mx: "auto" }}>
          Choose the people you want to include in your scrapbook. Click on a
          face to select or deselect.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {detectedFaces.map((face) => {
            const selected = selectedPersons.includes(face.person_id);
            return (
              <Grid item xs={6} sm={3} key={face.id}>
                <Box
                  onClick={() => togglePerson(face.person_id)}
                  sx={{
                    cursor: "pointer",
                    border: selected
                      ? "2.5px solid #2196f3"
                      : "1.5px solid #e0e0e0",
                    borderRadius: 4,
                    boxShadow: selected ? 6 : 2,
                    p: 2,
                    textAlign: "center",
                    transition: "box-shadow 0.2s, border 0.2s",
                    "&:hover": {
                      boxShadow: 8,
                      borderColor: "#2196f3",
                    },
                  }}>
                  <img
                    src={`http://localhost:8000${face.img}`}
                    alt={face.name}
                    style={{
                      width: 100,
                      height: 100,
                      display: "block",
                      margin: "auto",
                      border: selected
                        ? "2px solid #2196f3"
                        : "2px solid #e0e0e0",
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, textAlign: "center", mt: 2, mb: 1 }}>
                    {face.name}
                  </Typography>
                  <Button
                    size="small"
                    variant={selected ? "contained" : "outlined"}
                    color={selected ? "primary" : "inherit"}
                    sx={{
                      fontWeight: 600,
                      px: 3,
                      borderRadius: 3,
                      textTransform: "none",
                      mt: 1,
                    }}>
                    {selected ? "Selected" : "Select"}
                  </Button>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Container maxWidth="md">
          <Box mt={5} display="flex" justifyContent="space-between">
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
                disabled={selectedPersons.length === 0}
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

export default StepFaceSelection;
