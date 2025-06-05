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
  { label: "Select Page Number", path: "/page-number" },
  { label: "Select Scrapbook Size", path: "/select-size" },
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
    <Box sx={{ width: "100%", my: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperWrapper;
