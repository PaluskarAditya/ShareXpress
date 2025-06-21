import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Share from "./components/Share.jsx";
import Download from "./components/Download.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/share/:id" element={<Share />} />
        <Route path="/get/:id" element={<Download />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
