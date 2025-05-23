// src/routes/AppRouter.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import StepUpload from "../pages/StepUpload";
import StepGallery from "../pages/StepGallery";
import AboutUs from "../pages/AboutUsPage";
import ForWedding from "../pages/ForWeddingPage"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/wedding" element={<ForWedding/>} />
      <Route path="/upload" element={<StepUpload />} />
      <Route path="/gallery" element={<StepGallery />} />
    </Routes>
  );
};

export default AppRouter;
