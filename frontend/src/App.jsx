import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import TellUs from "./pages/TellUs";
import NewsList from "./pages/NewsList";
import AIDetection from "./pages/AIDetection";
import AIJournalist from "./pages/AIJournalist";
import Community from "./pages/Community";
import Freelance from "./pages/Freelance";
import MediaForensics from "./pages/Check_Fact";
import CameraHub from "./pages/CameraHub";
function App() {
  return (
    // 1. The Router must be the top-most component
    <Router>
      <Routes>
        {/* 2. MainLayout is a child of Router, so Navbar inside it is safe */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat-with-ai" element={<TellUs />} />

          <Route path="/news-list" element={<NewsList />} />
          <Route path="/community" element={<Community />} />
          <Route path="/freelance" element={<Freelance />} />
          <Route path="/ai-detection" element={<AIDetection />} />
          <Route path="/ai-journalist" element={<AIJournalist />} />
          <Route path="/vi-check" element={<MediaForensics/>}/>
          <Route path="/camera-hub" element={<CameraHub/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
