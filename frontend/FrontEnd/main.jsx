import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import AuthProvider from "./src/components/Auth/AuthProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Homepage />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
