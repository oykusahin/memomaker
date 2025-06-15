import React from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  { label: "Upload Images", path: "/upload" },
  { label: "Select People", path: "/face-selection" },
  { label: "View Gallery", path: "/gallery" },
  { label: "Select Page Size", path: "/select-size" },
  { label: "Cover Page Design", path: "/cover-page-design" },
  { label: "Scrapbook View", path: "/scrapbook" },
];

const StepperWrapper = () => {
  const location = useLocation();

  // Determine the active step based on current URL
  const activeStep = steps.findIndex((step) =>
    step.path
      ? location.pathname === step.path
      : location.pathname.startsWith(step.pathPrefix)
  );

  if (activeStep === -1) return null; // Don't show stepper on landing page

  return (
    <Box
      sx={{
        width: "100%",
        my: 4,
        minHeight: 80, // Ensures stable height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          width: "100%",
          maxWidth: 900,
          minWidth: 320,
          mx: "auto",
        }}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel
              sx={{
                ".MuiStepLabel-label": {
                  fontSize: { xs: "0.95rem", sm: "1.05rem" },
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                },
              }}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperWrapper;
