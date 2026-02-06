import { motion } from "framer-motion";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export default function Contact() {
    const form = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    // EmailJS Configuration
    const SERVICE_ID = "service_si7f718";
    const TEMPLATE_ID = "template_p1t8lmh";
    const PUBLIC_KEY = "pngCmIUDAWre8sQXg";

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            // Common aliases to cover default templates
            email: formData.email,
            reply_to: formData.email,
            message: formData.message,
            to_name: "Vansh",
            // In case the template uses a variable for the recipient
            to_email: "vansh070605@gmail.com"
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                alert("Message Sent Successfully! 🚀");
                setFormData({ name: "", email: "", message: "" });
                setIsLoading(false);
            }, (error) => {
                console.error("EmailJS Error:", error);
                alert(`Failed to send: ${error.text || "Check console for details"} ⚠️`);
                setIsLoading(false);
            });
    };

    return (
        <section className="contact" id="contact" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '60px' }}
            >
                <p className="comment" style={{ fontSize: '0.9rem', marginBottom: '10px', color: '#546E7A' }}>
                    // Let's connect
                </p>
                <h2 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    color: '#EEFFFF',
                    marginBottom: '10px'
                }}>
                    <span className="operator">&gt;_</span> <span className="keyword">function</span> <span className="function">getInTouch</span>() {'{'}
                </h2>
            </motion.div>

            {/* Two column layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '40px',
                maxWidth: '100%',
                width: '100%',
                margin: '0 auto'
            }} className="contact-grid">
                {/* Left: Contact Info Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Email Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'rgba(10, 10, 10, 0.95)',
                            border: '1px solid rgba(130, 170, 255, 0.3)',
                            borderRadius: '12px',
                            padding: '25px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#707A8A', marginBottom: '15px' }}>
                            <span className="comment">// Contact information</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '1.2rem' }}>📧</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#89DDFF', fontWeight: 600 }}>Email</span>
                        </div>
                        <a
                            href="mailto:vansh070605@gmail.com"
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.95rem',
                                color: '#EEFFFF',
                                textDecoration: 'none',
                                display: 'block',
                                transition: 'color 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#82AAFF'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#EEFFFF'}
                        >
                            vansh070605@gmail.com
                        </a>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'rgba(10, 10, 10, 0.95)',
                            border: '1px solid rgba(130, 170, 255, 0.3)',
                            borderRadius: '12px',
                            padding: '25px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '1.2rem' }}>📍</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#C3E88D', fontWeight: 600 }}>Location</span>
                        </div>
                        <p style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.95rem',
                            color: '#EEFFFF',
                            margin: 0
                        }}>
                            India
                        </p>
                    </motion.div>

                    {/* Response Time Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        style={{
                            background: 'rgba(10, 10, 10, 0.95)',
                            border: '1px solid rgba(130, 170, 255, 0.3)',
                            borderRadius: '12px',
                            padding: '25px'
                        }}
                    >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#707A8A', marginBottom: '12px' }}>
                            <span className="comment">// Quick response time</span>
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                            <span className="keyword">const</span> <span className="variable">responseTime</span> = {'{\n'}
                            <div style={{ paddingLeft: '20px' }}>
                                <span className="string">email</span>: <span className="string">'24 hours'</span>,<br />
                                <span className="string">message</span>: <span className="string">'same day'</span>
                            </div>
                            {'}'}
                        </div>
                    </motion.div>
                </div>

                {/* Right: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{
                        background: 'rgba(10, 10, 10, 0.95)',
                        border: '1px solid rgba(130, 170, 255, 0.3)',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}
                >
                    {/* Form header (like file tab) */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 16px',
                        background: 'rgba(0, 0, 0, 0.4)',
                        borderBottom: '1px solid rgba(130, 170, 255, 0.2)'
                    }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F07178' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFCB6B' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C3E88D' }} />
                        <span style={{
                            marginLeft: '12px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.85rem',
                            color: '#89DDFF'
                        }}>
                            contact form.tsx
                        </span>
                    </div>

                    {/* Form content */}
                    <form ref={form} onSubmit={handleSubmit} style={{ padding: '30px' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#C3E88D', marginBottom: '25px' }}>
                            <span className="keyword">const</span> <span className="variable">name</span> =
                        </div>

                        {/* Name Input */}
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '14px',
                                marginBottom: '20px',
                                background: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(130, 170, 255, 0.3)',
                                borderRadius: '8px',
                                color: '#EEFFFF',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#82AAFF'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(130, 170, 255, 0.3)'}
                        />

                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#C3E88D', marginBottom: '25px' }}>
                            <span className="keyword">const</span> <span className="variable">email</span> =
                        </div>

                        {/* Email Input */}
                        <input
                            type="email"
                            name="user_email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '14px',
                                marginBottom: '20px',
                                background: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(130, 170, 255, 0.3)',
                                borderRadius: '8px',
                                color: '#EEFFFF',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#82AAFF'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(130, 170, 255, 0.3)'}
                        />

                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#C3E88D', marginBottom: '25px' }}>
                            <span className="keyword">const</span> <span className="variable">message</span> =
                        </div>

                        {/* Message Textarea */}
                        <textarea
                            name="message"
                            placeholder="Your message here..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            rows={5}
                            style={{
                                width: '100%',
                                padding: '14px',
                                marginBottom: '25px',
                                background: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(130, 170, 255, 0.3)',
                                borderRadius: '8px',
                                color: '#EEFFFF',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.95rem',
                                outline: 'none',
                                resize: 'vertical',
                                transition: 'border-color 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#82AAFF'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(130, 170, 255, 0.3)'}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                width: '100%',
                                padding: '14px',
                                background: isLoading ? '#546E7A' : '#82AAFF',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#000',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                opacity: isLoading ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.background = '#A0C4FF';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isLoading) {
                                    e.currentTarget.style.background = '#82AAFF';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            {isLoading ? '⏳ Sending...' : '✉️ sendMessage()'}
                        </button>
                    </form>
                </motion.div>
            </div>

            {/* Closing brace */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: '#82AAFF',
                    marginTop: '60px',
                    textAlign: 'center'
                }}
            >
                {'}'}
            </motion.p>

            {/* Copyright footer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                viewport={{ once: true }}
                style={{
                    marginTop: '60px',
                    paddingTop: '30px',
                    borderTop: '1px solid rgba(130, 170, 255, 0.1)',
                    textAlign: 'center'
                }}
            >
                <span className="comment" style={{ fontSize: '0.85rem' }}>
          // © {new Date().getFullYear()} Vansh Agrawal · Built with React + Vite
                </span>
            </motion.div>

            {/* Responsive */}
            <style>{`
        @media (max-width: 968px) {
          .contact > div:nth-of-type(2) {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
        </section>
    );
}
