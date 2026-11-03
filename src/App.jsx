import { lazy, Suspense, useState } from "react";
import Nav        from "./components/Nav";
import Hero       from "./components/Hero";
import Work       from "./components/Work";
import About      from "./components/About";
import Experience from "./components/Experience";
import Skills     from "./components/Skills";
import Contact    from "./components/Contact";
import Footer     from "./components/Footer";
import DetectCursor from "./components/DetectCursor";
import Preloader  from "./components/Preloader";
import { swarm } from "./swarm";

// three.js ships in its own chunk; text paints first
const PointCloud = lazy(() => import("./components/PointCloud"));

export default function App() {
  // The page renders underneath straight away; the hero waits for the reveal
  const [ready, setReady] = useState(false);
  const reveal = () => { swarm.revealed = true; setReady(true); };

  return (
    <>
      {!ready && <Preloader onDone={reveal} />}
      <Suspense fallback={null}>
        <PointCloud />
      </Suspense>
      <Nav />
      <DetectCursor />
      <div className="page">
        <main>
          <Hero start={ready} />
          <Work />
          <About />
          <Experience />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
