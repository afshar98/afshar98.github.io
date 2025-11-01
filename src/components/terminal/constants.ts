import { Mail, Linkedin, Github, FileText } from "lucide-react";
import type { ReactNode } from "react";

export const PAGES = ["resume", "blogs"] as const;

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
  greeting: "Hi, I'm Mohammad — Front-End Developer.",
  inputPlaceholder:
    "Type a command (e.g., cd blogs) · Tab: autocomplete · ↑/↓: history",
  commands: { cdResume: "Opening resume...", cdBlogs: "Opening blogs..." },
  suggestions: [
    "Who are you?",
    "What do you do?",
    "Show me your background",
    "How can I contact you?",
    "What tech do you use?",
    "Where is your portfolio?",
  ],
  responses: {
    "Who are you?": {
      answer:
        "I'm Mohammad Afshar, a front-end developer focused on React/Next.js, performance, and delightful UX.",
    },
    "What do you do?": {
      answer:
        "I build scalable, component-driven web apps with clean architectures, strong DX, and rock-solid UI systems.",
    },
    "Show me your background": {
      answer:
        "I’ve worked across complex dashboards, real-time UIs, and design systems. You can browse my resume as well.",
      actions: [{ label: "Open Resume" }],
    },
    "How can I contact you?": {
      answer: "Pick a channel below:",
      actions: [{ label: "Email" }, { label: "LinkedIn" }],
    },
    "What tech do you use?": {
      answer:
        "React, Next.js, Vite, Zustand, React Query, Tailwind, shadcn/ui, Radix, SWC, Vitest/Jest, Storybook, WebSocket.",
    },
    "Where is your portfolio?": {
      answer: "Explore my work on GitHub or visit my website:",
      actions: [{ label: "GitHub" }, { label: "Website" }],
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
    ...COPY.suggestions,
  ];
  for (const p of PAGES) if (!base.includes(`cd ${p}`)) base.push(`cd ${p}`);
  return base;
};

export const ICONS = { Mail, Linkedin, Github, FileText };
