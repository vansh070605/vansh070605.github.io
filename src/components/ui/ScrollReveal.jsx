import { motion } from "framer-motion";

export default function ScrollReveal({ children, width = "100%" }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ position: "relative", width, overflow: "hidden" }}
        >
            {children}
        </motion.div>
    );
}
