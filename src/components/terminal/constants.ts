import { Mail, Linkedin, Github, FileText } from "lucide-react";
import type { ReactNode } from "react";

export const PAGES = ["resume", "blogs", "contact"] as const;

export type ResponseAction = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
};

export type Response = {
  question: string;
  answer: string;
  actions?: ResponseAction[];
  isLoading?: boolean;
};

export const COPY = {
  greeting: "Hey there — I’m Mohammad Afshar, a Front-End Developer.",
  inputPlaceholder:
    "Type a command (e.g., cd resume) · Tab: autocomplete · ↑/↓: history",
  commands: {
    cdResume: "Opening resume",
    cdBlogs: "Opening blogs",
    cdContact: "Opening contact page",
  },
  suggestions: [
    "Who are you?",
    "What’s your experience?",
    "Show me your background",
    "How can I contact you?",
    "What tools or tech do you use?",
    "Where can I see your work?",
  ],
  responses: {
    "Who are you?": {
      answer:
        "I’m Mohammad Afshar — a front-end engineer specializing in React, Next.js, and TypeScript. I focus on crafting fast, accessible, and maintainable interfaces with a love for clean architecture and modern design systems.",
    },
    "What’s your experience?": {
      answer:
        "I’ve built complex dashboards, real-time UIs, and AI-driven platforms at companies like Part AI Research Center and POMECHAIN. My work spans scalable component systems, performance tuning, and developer-friendly workflows.",
      actions: [{ label: "Open Resume" }],
    },
    "Show me your background": {
      answer:
        "With over 6 years in front-end development, I’ve worked on e-commerce, AI-driven dashboards, and AI products. You can browse my detailed resume for roles, tech, and achievements.",
      actions: [{ label: "Open Resume" }],
    },
    "How can I contact you?": {
      answer: "You can reach out directly — I’d love to connect:",
      actions: [{ label: "Email" }, { label: "LinkedIn" }],
    },
    "What tools or tech do you use?": {
      answer:
        "React, Next.js, TypeScript, Vite, Zustand, React Query, Tailwind CSS, shadcn/ui, Docker, Jest, and Storybook — all tuned for performance and great DX.",
    },
    "Where can I see your work?": {
      answer:
        "You can explore some of my open-source projects and portfolio links below:",
      actions: [{ label: "GitHub" }],
    },
  } as Record<string, { answer: string; actions?: { label: string }[] }>,
  defaultResponse:
    "Command not recognized. Try one of the suggested questions (scroll) or type `cd resume`.",
};

export const buildCandidates = () => {
  const base = [
    "ls",
    "clear",
    "cls",
    "help",
    "cd resume",
    "cd blogs",
    "cd contact",
    ...COPY.suggestions,
  ];
  for (const p of PAGES) if (!base.includes(`cd ${p}`)) base.push(`cd ${p}`);
  return base;
};

export const ICONS = { Mail, Linkedin, Github, FileText };
