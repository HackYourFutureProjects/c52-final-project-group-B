import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.jsx";
import AppWrapper from "@/AppWrapper";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Router>
    <AppWrapper>
      <App />
    </AppWrapper>
  </Router>
);
