// src/routes/AppRouter.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import StepUpload from "../pages/StepUpload";
import StepGallery from "../pages/StepGallery";
import AboutUs from "../pages/AboutUsPage";
import ForWedding from "../pages/ForWeddingPage";
import TestPage from "../pages/TestPage";
import AboutUsPage from "../pages/AboutUsPage";
import Team from "../pages/TeamPage";
import PrivacyPolicy from "../pages/PrivacyPolicyPage";
import StepFaceSelection from "../pages/StepFaceSelection";
import StepPageNumber from "../pages/StepPageNumber";
import StepSelectSize from "../pages/StepSelectSize";
import StepScrapbook from "../pages/StepScrapbook";
import StepCoverPageDesign from "../pages/StepCoverPageDesign";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/wedding" element={<ForWedding />} />
      <Route path="/upload" element={<StepUpload />} />
      <Route path="/gallery" element={<StepGallery />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/team" element={<Team />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/face-selection" element={<StepFaceSelection />} />
      <Route path="/page-number" element={<StepPageNumber />} />
      <Route path="/select-size" element={<StepSelectSize />} />
      <Route path="/scrapbook" element={<StepScrapbook />} />
      <Route path="/cover-page-design" element={<StepCoverPageDesign />} />
    </Routes>
  );
};

export default AppRouter;
