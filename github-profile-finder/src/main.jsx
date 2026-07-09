import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GithubProvider } from "./components/context/GithubProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GithubProvider>
      <App />
    </GithubProvider>
  </BrowserRouter>,
);
