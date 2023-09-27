import React from "react";
import ReactDOM from "react-dom/client";
import AppLayout from "./pages/layout/AppLayout";
import "./assets/index.scss";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);
