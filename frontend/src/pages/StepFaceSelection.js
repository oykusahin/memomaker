import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardActions,
  Avatar,
  Fade,
  Container,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StepperWrapper from "../components/StepperWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { getNextRoute, getPreviousRoute } from "../utils/navigation";
import axios from "axios";

const StepFaceSelection = () => {
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [selectedFaces, setSelectedFaces] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const next = getNextRoute(location.pathname);
  const prev = getPreviousRoute(location.pathname);

  useEffect(() => {
    axios.get("http://localhost:8000/api/faces/").then((res) => {
      setDetectedFaces(res.data);
    });
  }, []);

  const toggleFace = (id) => {
    setSelectedFaces((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
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
            const selected = selectedFaces.includes(face.id);
            return (
              <Grid item xs={6} sm={3} key={face.id}>
                <Fade in>
                  <Card
                    onClick={() => toggleFace(face.id)}
                    sx={{
                      cursor: "pointer",
                      border: selected
                        ? "2.5px solid #2196f3"
                        : "1.5px solid #e0e0e0",
                      borderRadius: 4,
                      boxShadow: selected ? 6 : 2,
                      position: "relative",
                      transition: "box-shadow 0.2s, border 0.2s",
                      "&:hover": {
                        boxShadow: 8,
                        borderColor: "#2196f3",
                      },
                    }}
                    elevation={0}>
                    <Box sx={{ position: "relative", p: 2, pb: 0 }}>
                      <Avatar
                        src={face.img}
                        alt={face.name}
                        sx={{
                          width: 100,
                          height: 100,
                          mx: "auto",
                          border: selected
                            ? "3px solid #2196f3"
                            : "2px solid #fff",
                          boxShadow: selected ? 4 : 1,
                          transition: "border 0.2s",
                        }}
                      />
                      {selected && (
                        <CheckCircleIcon
                          color="primary"
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            fontSize: 32,
                            bgcolor: "#fff",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                    </Box>
                    <CardActions
                      sx={{ justifyContent: "center", mt: 1, mb: 2 }}>
                      <Button
                        size="small"
                        variant={selected ? "contained" : "outlined"}
                        color={selected ? "primary" : "inherit"}
                        sx={{
                          fontWeight: 600,
                          px: 3,
                          borderRadius: 3,
                          textTransform: "none",
                        }}>
                        {selected ? "Selected" : "Select"}
                      </Button>
                    </CardActions>
                    <Typography
                      variant="subtitle1"
                      textAlign="center"
                      sx={{
                        pb: 2,
                        color: selected ? "primary.main" : "text.primary",
                      }}>
                      {face.name}
                    </Typography>
                  </Card>
                </Fade>
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
                disabled={selectedFaces.length === 0}
                onClick={() => {
                  // Handle selected face submission
                  // You can pass selectedFaces to the next step here
                  navigate(next);
                }}>
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
