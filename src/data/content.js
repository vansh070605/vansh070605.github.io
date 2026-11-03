// All site copy and data lives here. Components only lay it out.

export const profile = {
  name: "Vansh Agrawal",
  role: "AI/ML engineer",
  intro:
    "I build machine learning systems that see, and the software that puts them in people's hands.",
  statement:
    "I'm a final-year AI/ML engineering student at SRM IST, Chennai. Most of my work sits where models meet products: computer vision pipelines, retrieval-backed assistants, and the full-stack apps around them. Most recently, at Tata Steel, I taught a camera to inspect steel rebar.",
  facts: [
    { term: "Recently", detail: "AI/ML Intern, Tata Steel (Jan – May 2026)" },
    { term: "Studying", detail: "B.Tech CSE (AI/ML), SRM IST, CGPA 7.86" },
    { term: "Based in", detail: "Chennai, India" },
    { term: "Open to", detail: "Internships and project collaborations" },
  ],
  email: "vansh070605@gmail.com",
  resume: "/Resume.pdf",
  timeZone: "Asia/Kolkata",
};

export const socials = [
  { name: "GitHub", handle: "vansh070605", url: "https://github.com/vansh070605" },
  { name: "LinkedIn", handle: "thevanshagrawal", url: "https://linkedin.com/in/thevanshagrawal" },
  { name: "X", handle: "vansh070605", url: "https://x.com/vansh070605" },
  { name: "Instagram", handle: "thevanshagrawal", url: "https://instagram.com/thevanshagrawal" },
];

export const projects = [
  {
    name: "ClariMed",
    color: "#D4145A",
    kind: "AI / ML",
    summary: "An explainable healthcare copilot that helps patients understand their medical reports.",
    detail:
      "Patients upload a report and get a plain-language explanation grounded in retrieved medical context, with every claim traceable to its source.",
    stack: ["Next.js", "FastAPI", "Gemini API", "Qdrant (RAG)", "PostgreSQL"],
    github: "https://github.com/vansh070605/ClariMed.git",
    live: "https://clarimed-ai.vercel.app/dashboard",
  },
  {
    name: "WakeGuard",
    color: "#C2410C",
    kind: "Computer vision",
    summary: "Driver monitoring that detects drowsiness and yawning in real time.",
    detail:
      "Facial landmarks from MediaPipe drive eye-closure and yawn detection in the browser, with a live dashboard of alertness over the drive.",
    stack: ["React", "MediaPipe", "TailwindCSS", "Recharts"],
    github: "https://github.com/vansh070605/WakeGuard.git",
    live: "https://wake-guard.vercel.app/",
  },
  {
    name: "PlacementOS",
    color: "#2F4BD8",
    kind: "Full-stack",
    summary: "An AI career command center for students heading into placements.",
    detail:
      "It reads your code, portfolio and current market trends, then plans what to work on next so you land the right opportunities faster.",
    stack: ["React", "FastAPI", "Python", "TailwindCSS", "Vite"],
    github: "https://github.com/vansh070605/PlacementOS.git",
    live: "https://placementosai.vercel.app/",
  },
  {
    name: "Voxera",
    color: "#7C3AED",
    kind: "Real-time web",
    summary: "Peer-to-peer voice, video and screen sharing in the browser.",
    detail: "WebRTC handles the media streams directly between peers; Socket.io handles signalling and rooms.",
    stack: ["Node.js", "WebRTC", "Socket.io", "React"],
    github: "https://github.com/vansh070605/Voxera.git",
    live: "https://voxera-rtc.netlify.app/",
  },
  {
    name: "GlucoSense",
    color: "#0E7C6B",
    kind: "AI / ML",
    summary: "Diabetes risk assessment from clinical measurements.",
    detail: "A trained classifier scores risk from standard clinical inputs and explains the result in a clean Django app.",
    stack: ["Python", "Django", "Scikit-Learn", "SQLite", "TailwindCSS"],
    github: "https://github.com/vansh070605/GlucoSense.git",
    live: "https://gluco-sense.vercel.app/",
  },
  {
    name: "MealSync",
    color: "#3F7D20",
    kind: "Full-stack",
    summary: "Helps six flatmates fairly decide what's for dinner.",
    detail: "Dietary and preference filters plus a learned ranking keep everyone fed without the nightly argument. Built mobile-first.",
    stack: ["FastAPI", "Python", "React", "Scikit-Learn", "XGBoost"],
    github: "https://github.com/vansh070605/MealSync.git",
    live: "https://meal-sync-flat.vercel.app/",
  },
];

// Newest first
export const experience = [
  { role: "AI/ML Intern", org: "Tata Steel", date: "Jan 2026 – May 2026", desc: "Built a computer vision pipeline for automated quality control of TMT rebar, reaching 95% precision.", tags: ["Computer vision", "OpenCV", "ML"] },
  { role: "Event Coordinator", org: "SRMIST ACM SIGAI", date: "Mar – Oct 2025", desc: "Ran AI symposiums and handled logistics and marketing for campus events.", tags: ["Leadership", "Events"] },
  { role: "Intern", org: "RCOTBA Industries", date: "Jan – Jun 2025", desc: "Led technical initiatives, optimised production code and worked across teams.", tags: ["React", "Node.js", "System design"] },
  { role: "Internship Trainee", org: "Digital Info Solutions", date: "Dec 2024", desc: "Built full-stack Flask and SQLite applications, including auth modules and REST APIs.", tags: ["Flask", "SQL", "REST"] },
  { role: "Technical Team Member", org: "LiftOff", date: "Mar – Aug 2024", desc: "Sharpened front-end skills building website clones and CRUD features.", tags: ["HTML", "CSS", "JavaScript"] },
];

export const education = [
  { role: "B.Tech CSE (AI/ML)", org: "SRM IST, Chennai", date: "2023 – now", label: "CGPA", score: 7.86, max: 10, decimals: 2 },
  { role: "Senior Secondary (PCM)", org: "A.P.J. School, Noida", date: "2022 – 2023", label: "Score", score: 68.4, max: 100, decimals: 1 },
  { role: "High School", org: "A.P.J. School, Noida", date: "2020 – 2021", label: "Score", score: 85.2, max: 100, decimals: 1 },
];

export const skills = [
  { group: "Machine learning", color: "#2F4BD8", items: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "NumPy", "Pandas"] },
  { group: "Vision", color: "#D4145A", items: ["OpenCV", "MediaPipe", "YOLO"] },
  { group: "Web", color: "#7C3AED", items: ["React", "Next.js", "JavaScript", "Node.js", "FastAPI", "Flask", "Django"] },
  { group: "Data and tools", color: "#0E7C6B", items: ["PostgreSQL", "MySQL", "Qdrant", "Docker", "Git", "Linux"] },
];

// EmailJS public identifiers (safe to ship client-side)
export const emailjsConfig = {
  serviceId: "service_si7f718",
  templateId: "template_p1t8lmh",
  publicKey: "pngCmIUDAWre8sQXg",
};
