import {
  FaPython,
  FaCuttlefish,
  FaFlask,
  FaDatabase,
  FaDocker,
  FaLinux,
  FaGitAlt,
  FaGithub,
  FaCode,
  FaServer,
  FaBrain,
  FaMicrochip,
  FaProjectDiagram,
  FaTerminal,
  FaVial,
} from "react-icons/fa";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Experience" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

const services = [
  {
    title: "AI / LLM Engineering",
    description:
      "Building practical AI applications with LLM APIs, embeddings, structured prompts, and grounded generation.",
    image:
      "/projects/llm.jpeg",
    icon: FaBrain,
    skills: ["Python", "Gemini", "Embeddings"],
  },
  {
    title: "Backend Development",
    description:
      "Developing Python backend systems, REST APIs, database integrations, and reliable application services.",
    image:
      "/projects/backend.jpeg",
    icon: FaServer,
    skills: ["Python", "Flask", "PostgreSQL"],
  },
  {
    title: "RAG Systems",
    description:
      "Designing retrieval pipelines with embeddings, vector search, hybrid retrieval, reranking, and citations.",
    image:
      "/projects/rag.jpeg",
    icon: FaProjectDiagram,
    skills: ["pgvector", "HNSW", "Reranking"],
  },
  {
    title: "Open-Source Engineering",
    description:
      "Contributing to real systems projects through C development, security validation, testing, and code review.",
    image:
      "/projects/contributing.jpeg",
    icon: FaMicrochip,
    skills: ["C", "Linux", "CMake"],
  },
];

const technologies = [
  { name: "Python", icon: FaPython, level: "Advanced" },
  { name: "C", icon: FaCuttlefish, level: "Intermediate" },
  { name: "Flask", icon: FaFlask, level: "Advanced" },
  { name: "PostgreSQL", icon: FaDatabase, level: "Advanced" },
  { name: "RAG / LLMs", icon: FaBrain, level: "Advanced" },
  { name: "pgvector / HNSW", icon: FaProjectDiagram, level: "Intermediate" },
  { name: "REST APIs", icon: FaServer, level: "Advanced" },
  { name: "Git / GitHub", icon: FaGithub, level: "Advanced" },
  { name: "Docker", icon: FaDocker, level: "Intermediate" },
  { name: "Linux", icon: FaLinux, level: "Advanced" },
  { name: "GitHub Actions", icon: FaGitAlt, level: "Intermediate" },
  { name: "CMake", icon: FaTerminal, level: "Intermediate" },
  { name: "Pytest", icon: FaVial, level: "Intermediate" },
];

const experiences = [
  {
    title: "IT Support Intern",
    company_name: "Maroc Telecom",
    date: "Aug 2023 - Nov 2023",
    icon: FaServer,
    iconBg: "#383E56",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80",
    skills: ["IT Support", "Troubleshooting", "Documentation"],
    points: [
      "Diagnosed and resolved Level 1 and Level 2 incidents on internal IT systems using a structured troubleshooting process.",
      "Authored technical documentation aligned with internal quality standards.",
      "Trained end users on internal tools and supported national deployment projects.",
    ],
  },
  {
    title: "Open-Source Security Contributor",
    company_name: "EmbeddedOS / eBoot",
    date: "2026 - Present",
    icon: FaMicrochip,
    iconBg: "#383E56",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    skills: ["C", "Security", "Regression Testing", "CMake", "Git"],
    points: [
      "Implemented shared image-slot boundary validation covering image headers, payloads, and TLVs.",
      "Integrated validation across secure boot, recovery, slot-management, and application-loading paths.",
      "Added regression tests for oversized images and TLV data crossing slot boundaries.",
      "Addressed maintainer feedback on compatibility, test coverage, safety guards, and source-file requirements.",
      "Submitted focused community PRs and verified host CMake configuration after build-system changes.",
    ],
  },
];

const testimonials = [];

const projects = [
  {
    name: "RepoMind",
    description:
      "AI codebase intelligence system using RAG for natural-language search over software repositories. It combines code-aware chunking, embeddings, PostgreSQL + pgvector, hybrid retrieval, reranking, conversation history, and citation-grounded generation.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "RAG / LLM", color: "green-text-gradient" },
      { name: "PostgreSQL", color: "pink-text-gradient" },
    ],
    image: "/projects/repomind.jpg",
    source_code_link: "https://github.com/Mohammed18-19/RepoMind",
  },
  {
    name: "eBoot Security Contribution",
    description:
      "Open-source embedded bootloader contribution focused on shared image-slot boundary validation, secure boot paths, regression testing, and maintainer-reviewed C/CMake changes.",
    tags: [
      { name: "C", color: "blue-text-gradient" },
      { name: "Secure Boot", color: "green-text-gradient" },
      { name: "CMake", color: "pink-text-gradient" },
    ],
    image: "/projects/eboot.jpg",
    source_code_link: "https://github.com/embeddedos-org/eBoot/pull/109",
  },
];

export {
  services,
  technologies,
  experiences,
  testimonials,
  projects,
};
