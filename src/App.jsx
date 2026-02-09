import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import ScrollReveal from "./components/ui/ScrollReveal";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <div className="section-divider"></div>
          <ScrollReveal>
            <About />
          </ScrollReveal>
          <div className="section-divider"></div>
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
          <div className="section-divider"></div>
          <ScrollReveal>
            <Skills />
          </ScrollReveal>
          <div className="section-divider"></div>
          <Experience />
          <div className="section-divider"></div>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
          <Footer />
        </>
      )}
    </>
  );
}
