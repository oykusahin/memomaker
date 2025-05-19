import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { getPreviousRoute } from "../utils/navigation";

const StepScrapbook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prev = getPreviousRoute(location.pathname);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Step 3: View Scrapbook
      </Typography>

      <Typography variant="body1" sx={{ mt: 2 }}>
        This is where your selected images and captions will be arranged into a printable or shareable scrapbook layout.
      </Typography>

      <Box sx={{ mt: 4 }}>
        {prev && (
          <Button variant="outlined" onClick={() => navigate(prev)}>
            Back
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default StepScrapbook;
