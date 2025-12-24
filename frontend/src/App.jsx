import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import TellUs from "./pages/TellUs";
import NewsList from "./pages/NewsList";
import AIDetection from "./pages/AIDetection";
import AIJournalist from "./pages/AIJournalist";

function App() {
  return (
    // 1. The Router must be the top-most component
    <Router>
      <Routes>
        {/* 2. MainLayout is a child of Router, so Navbar inside it is safe */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tell-us" element={<TellUs />} />

          <Route path="/news-list" element={<NewsList />} />
          <Route
            path="/ai-detection"
            element={<AIDetection/>}
          />
          <Route
            path="/ai-journalist"
            element={<AIJournalist/>}
          />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
