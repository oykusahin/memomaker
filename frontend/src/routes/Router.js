// src/routes/AppRouter.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import StepUpload from "../pages/StepUpload";
import StepGallery from "../pages/StepGallery";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/upload" element={<StepUpload />} />
      <Route path="/gallery" element={<StepGallery />} />
    </Routes>
  );
};

export default AppRouter;
