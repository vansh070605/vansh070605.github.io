import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    id: 1,
    name: "LitterVision",
    file: "litter_vision.py",
    category: "AI-ML",
    folder: "ai-ml",
    description: "Litter detection and classification system using computer vision and deep learning to identify different types of waste from real-world images.",
    tech: ["Python", "TensorFlow", "Flask", "OpenCV"],
    features: ["Real-time waste detection", "Multi-class classification", "CNN architecture", "Web interface"],
    github: "https://github.com/vansh070605/LitterVision",
    live: "#",
    color: "#ffcb6b", // Yellow/Gold
    icon: "🐍"
  },
  {
    id: 2,
    name: "MultiGesture",
    file: "gesture_detector.py",
    category: "AI-ML",
    folder: "ai-ml",
    description: "Real-time hand gesture recognition system utilizing MediaPipe, OpenCV, and a TensorFlow/Keras deep learning model.",
    tech: ["Python", "OpenCV", "MediaPipe", "TensorFlow"],
    features: ["Hand tracking", "Gesture classification", "Low-latency", "Custom training"],
    github: "https://github.com/vansh070605/Hand-Gesture-Recognition",
    live: "#",
    color: "#c792ea", // Purple
    icon: "🐍"
  },
  {
    id: 3,
    name: "LungCancerPred",
    file: "cancer_pred.py",
    category: "AI-ML",
    folder: "ai-ml",
    description: "Web application for predicting lung cancer risk using machine learning, featuring a sleek glassmorphism UI.",
    tech: ["Python", "Flask", "Scikit-learn", "MySQL"],
    features: ["Risk assessment", "User auth", "History tracking", "Dashboard"],
    github: "https://github.com/vansh070605/Lung-Cancer-Predictor",
    live: "#",
    color: "#f07178", // Red
    icon: "🐍"
  },
  {
    id: 4,
    name: "Voxera",
    file: "voxera_app.js",
    category: "Web-Apps",
    folder: "web-apps",
    description: "Real-time WebRTC application for peer-to-peer voice, video, and screen sharing with Socket.io integration.",
    tech: ["Node.js", "WebRTC", "Socket.io", "React"],
    features: ["P2P video calls", "Screen sharing", "Real-time chat", "No servers"],
    github: "https://github.com/vansh070605/Voxera",
    live: "#",
    color: "#82aaff", // Blue
    icon: "📜"
  },
  {
    id: 5,
    name: "CareerExplorer",
    file: "career_path.tsx",
    category: "Full-Stack",
    folder: "full-stack",
    description: "Explainable career recommendation engine mapping student profiles to ranked career suggestions.",
    tech: ["React", "Python", "Flask", "ML"],
    features: ["Profile analysis", "Career matching", "Explainable AI", "Guidance"],
    github: "https://github.com/vansh070605/Career-Path-Explorer",
    live: "#",
    color: "#c3e88d", // Green
    icon: "⚛️"
  },
  {
    id: 6,
    name: "EmployeeTrack",
    file: "tracker_system.ts",
    category: "Full-Stack",
    folder: "full-stack",
    description: "Employee work session tracking system with secure authentication and productivity analytics.",
    tech: ["Node.js", "MongoDB", "Express", "JWT"],
    features: ["Session mgmt", "Productivity reports", "Admin panel", "Security"],
    github: "https://github.com/vansh070605/track-employee-work",
    live: "#",
    color: "#89ddff", // Cyan
    icon: "🔷"
  }
];

const folders = ["ai-ml", "web-apps", "full-stack"];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [expandedFolders, setExpandedFolders] = useState(["ai-ml", "web-apps", "full-stack"]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleFolder = (folder) => {
    setExpandedFolders(prev =>
      prev.includes(folder) ? prev.filter(f => f !== folder) : [...prev, folder]
    );
  };

  return (
    <section className="projects-ide" id="projects" style={{
      minHeight: '100vh',
      padding: '100px 5vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '80vh',
          maxHeight: '800px',
          background: '#0F111A', // Darker IDE bg
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(130, 170, 255, 0.2)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          position: 'relative' // For mobile menu absolute positioning
        }}
      >
        {/* IDE Top Bar */}
        <div style={{
          height: '40px',
          background: '#1A1C25',
          borderBottom: '1px solid #000',
          display: 'flex',
          alignItems: 'center',
          padding: '0 15px',
          gap: '10px',
          position: 'relative',
          zIndex: 20
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FFBD2E' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27C93F' }}></div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(130, 170, 255, 0.3)',
              borderRadius: '4px',
              color: '#82AAFF',
              padding: '2px 8px',
              fontSize: '0.7rem',
              marginLeft: '10px',
              cursor: 'pointer',
              display: 'none' // Hidden by default, shown in CSS
            }}
          >
            {isMobileMenuOpen ? 'Close Files' : '📂 Files'}
          </button>

          <div className="ide-title" style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#A6ACCD',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            opacity: 0.7,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '200px'
          }}>
            VanshAgrawal — Portfolio — {activeProject.folder}/{activeProject.file}
          </div>
        </div>

        {/* IDE Main Area */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>

          {/* Sidebar: Explorer (Desktop & Mobile Drawer) */}
          <div className={`ide-sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} style={{
            width: '250px',
            background: '#13151E',
            borderRight: '1px solid #000',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            transition: 'transform 0.3s ease',
            zIndex: 10
          }}>
            <div style={{
              padding: '10px 15px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#A6ACCD',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              Explorer
              <span
                className="close-sidebar-mobile"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ cursor: 'pointer', display: 'none' }}
              >✕</span>
            </div>

            <div style={{ overflowY: 'auto', flex: 1 }}>
              {/* Root Folder */}
              <div style={{ marginBottom: '5px' }}>
                <div style={{
                  padding: '4px 15px',
                  color: '#A6ACCD',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontWeight: 600
                }}>
                  <span>⌄</span> <span>PORTFOLIO</span>
                </div>

                {/* Sub Folders */}
                <div style={{ marginLeft: '10px' }}>
                  {folders.map(folder => (
                    <div key={folder}>
                      <div
                        onClick={() => toggleFolder(folder)}
                        style={{
                          padding: '4px 15px',
                          color: '#A6ACCD',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          opacity: 0.9
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={e => e.currentTarget.style.color = '#A6ACCD'}
                      >
                        <span style={{ fontSize: '0.8rem', transform: expandedFolders.includes(folder) ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.2s' }}>⌄</span>
                        <span style={{ color: folder === 'ai-ml' ? '#C792EA' : folder === 'web-apps' ? '#82AAFF' : '#C3E88D' }}>📂</span>
                        {folder}
                      </div>

                      <AnimatePresence>
                        {expandedFolders.includes(folder) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden' }}
                          >
                            {projects.filter(p => p.folder === folder).map(p => (
                              <div
                                key={p.id}
                                onClick={() => {
                                  setActiveProject(p);
                                  setIsMobileMenuOpen(false); // Close menu on selection
                                }}
                                style={{
                                  padding: '4px 15px 4px 32px',
                                  color: activeProject.id === p.id ? '#fff' : '#676E95',
                                  background: activeProject.id === p.id ? 'rgba(130, 170, 255, 0.1)' : 'transparent',
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  fontFamily: 'var(--font-mono)',
                                  borderLeft: activeProject.id === p.id ? '2px solid #82AAFF' : '2px solid transparent'
                                }}
                              >
                                <span>{p.icon}</span> {p.file}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0F111A' }}>

            {/* File Tab */}
            <div style={{
              display: 'flex',
              background: '#13151E',
              borderBottom: '1px solid #000'
            }}>
              <div style={{
                padding: '8px 20px',
                background: '#0F111A',
                color: '#fff',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                borderTop: `1px solid ${activeProject.color}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>{activeProject.icon}</span>
                {activeProject.file}
                <span style={{ marginLeft: '10px', fontSize: '1rem', cursor: 'pointer', opacity: 0.5 }}>×</span>
              </div>
            </div>

            {/* Code Content */}
            <div style={{
              flex: 1,
              padding: '30px',
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '1rem',
              lineHeight: 1.6,
              color: '#A6ACCD'
            }}>
              {/* Imports */}
              <div>
                <span style={{ color: '#C792EA' }}>import</span> {'{'}
                {activeProject.tech.map((t, i) => (
                  <span key={t}>
                    <span style={{ color: '#FFCB6B' }}> {t}</span>{i < activeProject.tech.length - 1 ? ',' : ''}
                  </span>
                ))}
                {' }'} <span style={{ color: '#C792EA' }}>from</span> <span style={{ color: '#C3E88D' }}>'./lib'</span>;
              </div>
              <br />

              {/* Class Definition */}
              <div>
                <span style={{ color: '#C792EA' }}>class</span> <span style={{ color: '#FFCB6B' }}>{activeProject.name}</span> <span style={{ color: '#C792EA' }}>extends</span> <span style={{ color: '#82AAFF' }}>Project</span> {'{'}
              </div>

              {/* Documentation Comment */}
              <div style={{ marginLeft: '20px', color: '#676E95' }}>
                /**<br />
                * {activeProject.description}<br />
                * <br />
                * @features<br />
                {activeProject.features.map(f => (
                  <span key={f}>* - {f}<br /></span>
                ))}
                */
              </div>

              {/* Constructor/Run */}
              <div style={{ marginLeft: '20px' }}>
                <br />
                <span style={{ color: '#82AAFF' }}>constructor</span>() {'{'} <br />
                <span style={{ marginLeft: '20px', color: '#89DDFF' }}>this</span>.<span style={{ color: '#F07178' }}>id</span> = <span style={{ color: '#F78C6C' }}>{activeProject.id}</span>;<br />
                <span style={{ marginLeft: '20px', color: '#89DDFF' }}>this</span>.<span style={{ color: '#F07178' }}>category</span> = <span style={{ color: '#C3E88D' }}>'{activeProject.category}'</span>;<br />
                {'}'}
              </div>

              {/* Render Method */}
              <div style={{ marginLeft: '20px' }}>
                <br />
                <span style={{ color: '#82AAFF' }}>async run</span>() {'{'} <br />
                <span style={{ color: '#C792EA' }}>await</span> <span style={{ color: '#FFCB6B' }}>deployment</span>.<span style={{ color: '#82AAFF' }}>start</span>();<br />
                <span style={{ color: '#C792EA' }}>return</span> <span style={{ color: '#C3E88D' }}>"Project Online"</span>;<br />
                {'}'}
              </div>

              <div>{'}'}</div>

            </div>

            {/* Terminal Panel */}
            <div style={{
              height: 'auto',
              minHeight: '140px',
              flexShrink: 0,
              background: '#13151E',
              borderTop: '1px solid #000',
              padding: '10px',
              fontFamily: 'var(--font-mono)'
            }}>
              <div style={{
                display: 'flex',
                gap: '20px',
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                color: '#676E95',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '5px',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#fff', borderBottom: '1px solid #82AAFF' }}>Terminal</span>
                <span>Output</span>
                <span>Debug Console</span>
              </div>

              <div style={{ fontSize: '0.9rem', color: '#A6ACCD' }}>
                <span style={{ color: '#C3E88D' }}>➜</span> <span style={{ color: '#82AAFF' }}>~/{activeProject.folder}</span> git clone {activeProject.github} <br />
                <br />
                <div style={{ display: 'flex', gap: '15px' }}>
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      background: '#24283b',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: '1px solid #414868',
                      fontSize: '0.85rem',
                      display: 'flex', alignItems: 'center', gap: '8px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#414868'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#24283b'; }}
                  >
                    <span>😺</span> Open GitHub
                  </a>

                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none',
                      background: activeProject.color,
                      color: '#000',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'flex', alignItems: 'center', gap: '8px',
                      opacity: 0.9,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '0.9'; }}
                  >
                    <span>🚀</span> Live Demo
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .ide-sidebar {
            position: absolute;
            top: 40px; /* Below top bar */
            bottom: 0;
            left: 0;
            width: 100% !important;
            z-index: 100;
            transform: translateX(-100%);
          }
          .ide-sidebar.mobile-open {
            transform: translateX(0);
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .close-sidebar-mobile {
            display: block !important;
          }
          .ide-title {
            max-width: 150px;
            font-size: 0.75rem !important;
          }
          .projects-ide {
            padding: 80px 15px !important;
          }
        }
        /* Custom scrollbar for editor */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #13151E; 
        }
        ::-webkit-scrollbar-thumb {
          background: #2b2f40; 
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3b4055; 
        }
      `}</style>
    </section>
  );
}

