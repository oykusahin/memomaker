import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import UploadPage from "./pages/UploadPage";
import GalleryPage from "./pages/GalleryPage";
import ImageDetailPage from "./pages/ImageDetailPage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Upload</Link> |{" "}
          <Link to="/gallery">View Uploaded Images</Link>
        </nav>

        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/image/:id" element={<ImageDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;