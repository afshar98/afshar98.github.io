// components/Resume.tsx
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/** ---------- Static English copy (replace with your real data) ---------- */
const COPY = {
  backToHome: "Back to Home",
  title: "Resume",
  summary:
    "Front-End Developer focused on React/Next.js, performance, and building reliable UI systems with great DX.",
  experience: {
    title: "Experience",
    jobs: [
      {
        title: "Senior Front-End Developer",
        company: "Acme Corp",
        period: "2023 — Present",
        description: [
          "Led migration to Next.js/Vite with SWC for faster builds and optimized DX.",
          "Built a component library with Tailwind, Radix, and shadcn/ui.",
          "Improved bundle size and CLS/LCP via code-splitting and strict typing.",
        ],
      },
      {
        title: "Front-End Developer",
        company: "Beta Labs",
        period: "2021 — 2023",
        description: [
          "Implemented real-time dashboards (WebSocket) and data-heavy tables.",
          "Introduced React Query & Zustand for predictable data/state layers.",
          "Set up Storybook + Vitest for reliable component delivery.",
        ],
      },
    ],
  },
  education: {
    title: "Education",
    items: [
      {
        degree: "B.Sc. in Computer Engineering",
        school: "Tech University",
        period: "2016 — 2020",
      },
    ],
  },
  skills: {
    title: "Skills",
    categories: [
      {
        name: "Core",
        items: ["JavaScript (ESNext)", "TypeScript", "React", "Next.js", "Vite"],
      },
      {
        name: "UI / Styling",
        items: ["Tailwind CSS", "Radix UI", "shadcn/ui", "Storybook"],
      },
      {
        name: "Data / Testing / Tooling",
        items: ["React Query", "Zustand", "Jest/Vitest", "Playwright", "ESLint/Prettier"],
      },
    ],
  },
};
/** ---------------------------------------------------------------------- */

export function Resume() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-8 overflow-y-auto" dir="ltr">
      {/* Header */}
      <div className="flex items-start mb-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            className="text-green-400 hover:text-green-300 hover:bg-green-950/30 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{COPY.backToHome}</span>
          </Button>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Title + Summary */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-left">
          <h1 className="text-4xl mb-4 text-green-400">
            <span className="text-green-500">{">"}_</span> {COPY.title}
          </h1>
          <p className="text-green-300/80 text-lg">{COPY.summary}</p>
        </motion.div>

        {/* Experience */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
          <h2 className="text-2xl mb-6 text-green-400 text-left">
            <span className="text-green-500">#</span> {COPY.experience.title}
          </h2>
          <div className="space-y-8">
            {COPY.experience.jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="border-l-2 pl-6 border-green-500/30"
              >
                <h3 className="text-xl text-green-400 mb-1 text-left">{job.title}</h3>
                <div className="text-green-500 mb-2 text-left">
                  {job.company} • {job.period}
                </div>
                <ul className="space-y-2 list-none">
                  {job.description.map((item, i) => (
                    <li key={i} className="text-green-300/80 text-left">
                      <span className="text-green-500 mr-2">{">"}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12">
          <h2 className="text-2xl mb-6 text-green-400 text-left">
            <span className="text-green-500">#</span> {COPY.education.title}
          </h2>
          <div className="space-y-6">
            {COPY.education.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="border-l-2 border-green-500/30 pl-6"
              >
                <h3 className="text-xl text-green-400 mb-1 text-left">{item.degree}</h3>
                <div className="text-green-500 text-left">
                  {item.school} • {item.period}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-12">
          <h2 className="text-2xl mb-6 text-green-400 text-left">
            <span className="text-green-500">#</span> {COPY.skills.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {COPY.skills.categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-green-950/20 border border-green-500/30 rounded-lg p-4"
              >
                <h3 className="text-lg text-green-400 mb-3 text-left">{category.name}</h3>
                <ul className="space-y-1">
                  {category.items.map((skill, i) => (
                    <li key={i} className="text-green-300/80 text-left">
                      <span className="text-green-500 mr-2">{">"}</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
