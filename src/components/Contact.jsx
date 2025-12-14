import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <motion.div
        className="contact-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <p className="section-tag">Contact</p>
        <h2 className="section-title">Let’s build something meaningful.</h2>
        <p className="contact-subtext">
          Open to collaborations, internships, and exciting ideas.
        </p>

        {/* ✅ Formspree connected */}
        <form
          className="contact-form"
          action="https://formspree.io/f/xnnerbgd"
          method="POST"
        >
          <div className="input-group">
            <input type="text" name="name" required />
            <label>Name</label>
          </div>

          <div className="input-group">
            <input type="email" name="email" required />
            <label>Email</label>
          </div>

          <div className="input-group">
            <textarea name="message" rows="4" required />
            <label>Message</label>
          </div>

          {/* Optional hidden field */}
          <input type="hidden" name="_subject" value="New Portfolio Contact" />

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Message →
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
