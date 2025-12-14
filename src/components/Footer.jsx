import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="footer-left">
        <p className="footer-name">Vansh Agrawal</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>

      <div className="footer-right">
        <a href="https://github.com/vansh070605" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="http://www.linkedin.com/in/thevanshagrawal" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vansh070605@gmail.com" target="_blank" rel="noreferrer">
          Email me
        </a>


      </div>
    </motion.footer>
  );
}
