import React from "react";
import ReactDOM from "react-dom/client";
import { LazyMotion, domAnimation } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { CursorProvider } from "./context/CursorContext";
import App from "./App";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // lerp: 0.05 — the heavy, cinematic inertia that defines Podium-class scroll feel
  <ReactLenis root options={{ lerp: 0.05, duration: 1.6, smoothWheel: true }}>
    <LazyMotion features={domAnimation}>
      <CursorProvider>
        <App />
      </CursorProvider>
    </LazyMotion>
  </ReactLenis>
);
