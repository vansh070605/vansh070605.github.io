import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer id="contact">
      <motion.div
        className="console"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Console header */}
        <div style={{ marginBottom: '30px' }}>
          <span className="comment">// Console output</span>
        </div>

        {/* Console lines */}
        <div className="console-line">
          <span className="console-prompt">&gt;</span>
          <span className="console-output">
            <span className="keyword">const</span> <span className="variable">contact</span> = {"{"}
          </span>
        </div>

        <div className="console-line" style={{ paddingLeft: '20px' }}>
          <span className="variable">email</span>:{" "}
          <a href="mailto:vansh070605@gmail.com" style={{ color: 'var(--green)' }}>
            "vansh070605@gmail.com"
          </a>
        </div>

        <div className="console-line" style={{ paddingLeft: '20px' }}>
          <span className="variable">github</span>:{" "}
          <a
            href="https://github.com/vansh070605"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--blue)' }}
          >
            "github.com/vansh070605"
          </a>
        </div>

        <div className="console-line" style={{ paddingLeft: '20px' }}>
          <span className="variable">linkedin</span>:{" "}
          <a
            href="http://www.linkedin.com/in/thevanshagrawal"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--cyan)' }}
          >
            "linkedin.com/in/thevanshagrawal"
          </a>
        </div>

        <div className="console-line">
          <span className="console-output">{"}"}</span>
        </div>

        {/* Export statement */}
        <div className="console-line" style={{ marginTop: '20px' }}>
          <span className="keyword">export</span>{" "}
          <span className="keyword">default</span>{" "}
          <span className="variable">contact</span>
        </div>

        {/* Copyright line */}
        <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(130, 170, 255, 0.1)' }}>
          <span className="comment">
            // © {new Date().getFullYear()} Vansh Agrawal · Built with React + Vite
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
