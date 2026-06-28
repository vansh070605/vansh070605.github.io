import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import About        from "./components/About";
import Skills       from "./components/Skills";
import Projects     from "./components/Projects";
import Experience   from "./components/Experience";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Preloader    from "./components/Preloader";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark,    setIsDark]    = useState(false);

  // Sync dark class on <html>
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) html.classList.add("dark");
    else         html.classList.remove("dark");
  }, [isDark]);

  const toggleDark = () => setIsDark(d => !d);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar isDark={isDark} toggleDark={toggleDark} />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
