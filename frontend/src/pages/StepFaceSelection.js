import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";

const detectedFaces = [
  { id: 1, img: "/faces/face1.jpg", name: "Face 1" },
  { id: 2, img: "/faces/face2.jpg", name: "Face 2" },
  { id: 3, img: "/faces/face3.jpg", name: "Face 3" },
  { id: 4, img: "/faces/face4.jpg", name: "Face 4" },
];

const StepFaceSelection = () => {
  const [selectedFaces, setSelectedFaces] = useState([]);

  const toggleFace = (id) => {
    setSelectedFaces((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <Box sx={{ py: 5 }}>
      <Typography variant="h5" gutterBottom>
        Step 3: Select People to Include
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Select the people you want to include in your scrapbook.
      </Typography>

      <Grid container spacing={3}>
        {detectedFaces.map((face) => (
          <Grid item xs={6} sm={3} key={face.id}>
            <Card
              sx={{
                border: selectedFaces.includes(face.id)
                  ? "2px solid #2196f3"
                  : "1px solid #ccc",
                borderRadius: 2,
                boxShadow: 2,
              }}>
              <CardMedia
                component="img"
                image={face.img}
                alt={face.name}
                sx={{ height: 140, objectFit: "cover" }}
              />
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  variant={
                    selectedFaces.includes(face.id) ? "contained" : "outlined"
                  }
                  onClick={() => toggleFace(face.id)}>
                  {selectedFaces.includes(face.id) ? "Selected" : "Select"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} textAlign="right">
        <Button
          variant="contained"
          onClick={() => {
            // Handle selected face submission
            console.log("Selected faces:", selectedFaces);
          }}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default StepFaceSelection;
