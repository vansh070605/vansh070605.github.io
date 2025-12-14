import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      {/* Ambient background elements */}
      <div className="bg-blobs">
        <div className="blob one"></div>
        <div className="blob two"></div>
      </div>

      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
