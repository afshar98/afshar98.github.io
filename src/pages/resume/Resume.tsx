import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RESUME_PDF_URL = "/files/Mohammad_Afshar_CV.pdf";

const COPY = {
  backToHome: "Back to Home",
  title: "Resume",
  summary:
    " Front-End Developer with over 6 years of experience specializing in React, Next.js, and TypeScript. Adept at building highly scalable, user-centric web applications while maintaining clean and maintainable code. Skilled in optimizing performance, improving user engagement, and collaborating with cross-functional teams. Passionate about UI/UX principles and implementing best practices in modern web development. Committed to continuous learning, problem-solving, and delivering high-quality digital experiences.",
  links: {
    email: "mo.afshar1998@gmail.com",
    phone: "+98 903 196 8986",
    linkedin: "https://www.linkedin.com/in/afshar98",
    github: "https://github.com/afshar98",
  },
  experience: {
    title: "Experience",
    jobs: [
      {
        title: "Front-End Developer (On-site)",
        company: "Part Artificial Intelligence Research Center",
        location: "Tehran, Iran",
        period: "Dec 2023 — Present",
        description: [
          "Built and launched AI-driven platforms (“Sepehr”, “DanaBot”, “Avanegar”, “Avasho”) with Next.js, React, Tailwind, React Query, TypeScript, and shadcn/ui.",
          "Improved dev workflow by collaborating across Front-End, Back-End, DevOps, and UI/UX; accelerated feature rollouts.",
          "Implemented comprehensive automated tests with high coverage to prevent regressions and support CI.",
          "Designed and maintained Docker configs for reproducible local dev and consistent deployments.",
          "Delivered a full i18n architecture in Sepehr for a fully localized UX.",
          "Optimized performance and accessibility with modern standards and maintainable component structures.",
        ],
      },
      {
        title: "Front-End Developer (Remote)",
        company: "POMECHAIN — B2C/B2B E-Commerce",
        location: "Dubai, UAE",
        period: "Mar 2022 — Nov 2023",
        description: [
          "Led front-end redesign of the e-commerce platform and admin panel; increased user retention by ~20%.",
          "Delivered the JomlahBazar marketplace from concept to launch in 8 months, hitting all milestones.",
          "Integrated advanced search (Algolia, Azure Cognitive Services) for faster, more relevant discovery.",
          "Hardened client-side security best practices; lowered vulnerability risk by ~35%.",
        ],
      },
      {
        title: "Front-End Developer (On-site)",
        company: "Webartma",
        location: "Ahvaz, Iran",
        period: "Jun 2019 — May 2020",
        description: [
          "Developed and maintained Front-End for Dr. Zeytoon, GoldState Agency, and SenikTV.",
          "Optimized performance for faster page loads and smoother, more consistent UX across apps.",
          "Collaborated with Back-End teams to integrate APIs and improve client-server data flow.",
        ],
      },
    ],
  },
  education: {
    title: "Education",
    items: [
      {
        degree: "M.Sc., Computer Software Engineering",
        school: "Shahid Rajaee University (Tehran, Iran)",
        period: "Oct 2021 — Sep 2024",
      },
      {
        degree: "B.Sc., Computer Engineering",
        school: "Shahid Chamran University (Ahvaz, Iran)",
        period: "Jan 2016 — Jan 2021",
      },
    ],
  },
  skills: {
    title: "Skills",
    languages: [
      "Persian (native)",
      "English (upper intermediate)",
      "German (A1 – beginner)",
    ],
    categories: [
      {
        name: "Core Front-End",
        items: [
          "React",
          "Next.js",
          "TypeScript",
          "Zustand",
          "React Query",
          "Tailwind",
          "shadcn/ui",
          "WebSocket",
        ],
      },
      {
        name: "Testing & Tools",
        items: ["Jest", "Storybook", "Git", "Docker", "CI/CD"],
      },
      {
        name: "Architecture & Patterns",
        items: ["SOLID", "Performance Optimization", "Component Architecture"],
      },
      {
        name: "Collaboration",
        items: ["Agile", "Code Review", "Mentoring"],
      },
    ],
  },
};

export function Resume() {
  const navigate = useNavigate();
  const handleBackToHome = () => navigate("/");

  const handleDownload = async () => {
    try {
      const res = await fetch(RESUME_PDF_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Mohammad_Afshar_CV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      // cleanup
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      // Fallback: normal anchor with download attribute
      const a = document.createElement("a");
      a.href = RESUME_PDF_URL;
      a.download = "Mohammad_Afshar_CV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  const handleView = () => {
    window.open(RESUME_PDF_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="min-h-screen bg-black text-green-400 font-mono p-8 overflow-y-auto"
      dir="ltr"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            className="text-green-400 hover:text-green-300 hover:bg-green-950/30 gap-2"
            title="Back to Home"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{COPY.backToHome}</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Button
            onClick={handleDownload}
            className="bg-green-950/30 border border-green-500/50 text-green-300 hover:bg-green-900/50 hover:text-green-200 hover:border-green-400 gap-2"
            variant="outline"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </Button>
          <Button
            onClick={handleView}
            className="bg-green-950/30 border border-green-500/40 text-green-300 hover:bg-green-900/50 hover:text-green-200 hover:border-green-400 gap-2"
            variant="outline"
            title="View PDF"
          >
            <FileText className="w-4 h-4" />
            <span>View PDF</span>
          </Button>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Title + Summary */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-left"
        >
          <h1 className="text-4xl mb-4 text-green-400">
            <span className="text-green-500">{">"}_</span> {COPY.title}
          </h1>
          <p className="text-green-300/80 text-lg">{COPY.summary}</p>

          <div className="mt-4 text-sm text-green-400/80 space-x-4">
            <a
              className="underline hover:text-green-300"
              href={`mailto:${COPY.links.email}`}
            >
              {COPY.links.email}
            </a>
            <span>•</span>
            <a
              className="underline hover:text-green-300"
              href={`tel:${COPY.links.phone.replace(/\s+/g, "")}`}
            >
              {COPY.links.phone}
            </a>
            <span>•</span>
            <a
              className="underline hover:text-green-300"
              href={COPY.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              className="underline hover:text-green-300"
              href={COPY.links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
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
                <h3 className="text-xl text-green-400 mb-1 text-left">
                  {job.title}
                </h3>
                <div className="text-green-500 mb-2 text-left">
                  {job.company} • {job.location} • {job.period}
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
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
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
                <h3 className="text-xl text-green-400 mb-1 text-left">
                  {item.degree}
                </h3>
                <div className="text-green-500 text-left">
                  {item.school} • {item.period}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl mb-6 text-green-400 text-left">
            <span className="text-green-500">#</span> {COPY.skills.title}
          </h2>

          <div className="mb-4 text-left">
            <h3 className="text-lg text-green-400 mb-2">Languages</h3>
            <p className="text-green-300/80">
              {COPY.skills.languages.join(" • ")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {COPY.skills.categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.08 }}
                className="bg-green-950/20 border border-green-500/30 rounded-lg p-4"
              >
                <h3 className="text-lg text-green-400 mb-3">{category.name}</h3>
                <ul className="space-y-1">
                  {category.items.map((skill, i) => (
                    <li key={i} className="text-green-300/80">
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

export default Resume;
