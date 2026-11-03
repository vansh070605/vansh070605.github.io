import React from "react";
import ReactDOM from "react-dom/client";
import { LazyMotion, domAnimation } from "framer-motion";
import { ReactLenis } from "lenis/react";
import App from "./App";
import "./styles/global.css";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactLenis root options={{ lerp: reduceMotion ? 1 : 0.085, smoothWheel: !reduceMotion, anchors: true }}>
      <LazyMotion features={domAnimation} strict>
        <App />
      </LazyMotion>
    </ReactLenis>
  </React.StrictMode>
);
