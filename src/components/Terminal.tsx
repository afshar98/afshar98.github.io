import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PickerWheel } from "./PickerWheel";
import { Button } from "./ui/button";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoadingDots } from "./LoadingDots";

const COPY = {
  greeting: "Hi, I'm Mohammad — Front-End Developer.",
  inputPlaceholder: "Type a command or a question (e.g., cd resume)",
  commands: {
    cdResume: "Opening resume...",
    cdBlogs: "Opening blogs...",
  },
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

interface ResponseAction {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface Response {
  question: string;
  answer: string;
  actions?: ResponseAction[];
  isLoading?: boolean;
}

export function Terminal() {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const hasScrolledRef = useRef(false);

  // Auto-typing effect
  useEffect(() => {
    setDisplayedText("");
    setIsTypingComplete(false);
    setResponses([]);
    setUserInput("");
  }, []);

  useEffect(() => {
    if (displayedText.length < COPY.greeting.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(COPY.greeting.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayedText]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection -> open picker once
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!hasScrolledRef.current && isTypingComplete) {
        e.preventDefault();
        hasScrolledRef.current = true;
        setShowPicker(true);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isTypingComplete]);

  // Focus input when typing is complete
  useEffect(() => {
    if (isTypingComplete && inputRef.current) inputRef.current.focus();
  }, [isTypingComplete]);

  // Update cursor position based on text width
  useEffect(() => {
    if (measureRef.current) {
      const width = measureRef.current.offsetWidth;
      setCursorPosition(width);
    }
  }, [userInput]);

  // Global key listener to focus input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (showPicker || !isTypingComplete || !inputRef.current) return;

      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key.length === 1 || e.key === "Backspace" || e.key === "Delete") {
        inputRef.current.focus();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isTypingComplete, showPicker]);

  // Keep input focused after submitting
  useEffect(() => {
    if (isTypingComplete && inputRef.current && responses.length > 0) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [responses, isTypingComplete]);

  const handleSelectSuggestion = (suggestion: string) => {
    setUserInput(suggestion);
    setShowPicker(false);
    hasScrolledRef.current = false;
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Special command: cd resume
    if (userInput.toLowerCase() === "cd resume") {
      const response: Response = {
        question: userInput,
        answer: COPY.commands.cdResume,
        isLoading: true,
      };
      setResponses((prev) => [...prev, response]);
      setUserInput("");
      setIsRedirecting(true);

      setTimeout(() => {
        navigate("/resume");
      }, 2000);
      return;
    }

    if (userInput.toLowerCase() === "cd blogs") {
      const response: Response = {
        question: userInput,
        answer: COPY.commands.cdBlogs,
        isLoading: true,
      };
      setResponses((prev) => [...prev, response]);
      setUserInput("");
      setIsRedirecting(true);
      setTimeout(() => navigate("/blogs"), 2000);
      return;
    }

    // Exact match on known questions
    const data = COPY.responses[userInput];

    let response: Response;
    if (data) {
      response = {
        question: userInput,
        answer: data.answer,
        actions: data.actions?.map((action, index) => {
          const cfg: ResponseAction = {
            label: action.label,
            onClick: () => {},
          };

          // Map actions to icons/handlers by the question context
          if (userInput === COPY.suggestions[2]) {
            // Background -> open resume
            cfg.icon = <FileText className="w-4 h-4" />;
            cfg.onClick = () => navigate("/resume");
          } else if (userInput === COPY.suggestions[3]) {
            // Contact
            if (index === 0) {
              cfg.icon = <Mail className="w-4 h-4" />;
              cfg.onClick = () =>
                window.open("mailto:afshar@example.com", "_blank");
            } else if (index === 1) {
              cfg.icon = <Linkedin className="w-4 h-4" />;
              cfg.onClick = () =>
                window.open("https://linkedin.com/in/afshar", "_blank");
            }
          } else if (userInput === COPY.suggestions[5]) {
            // Portfolio
            if (index === 0) {
              cfg.icon = <Github className="w-4 h-4" />;
              cfg.onClick = () =>
                window.open("https://github.com/afshar", "_blank");
            } else if (index === 1) {
              cfg.onClick = () => window.open("https://afshar.dev", "_blank");
            }
          }
          return cfg;
        }),
      };
    } else {
      response = {
        question: userInput,
        answer: COPY.defaultResponse,
      };
    }

    setResponses((prev) => [...prev, response]);
    setUserInput("");
  };

  return (
    <>
      <div
        className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden pb-[50px]"
        dir="ltr"
      >
        {/* Terminal Content - Centered Block */}
        <div className="w-full max-w-4xl px-8 flex flex-col max-h-full font-mono mb-[50px]">
          {/* Scrollable History Section */}
          <div className="overflow-y-auto flex-shrink min-h-0 flex flex-col justify-end pb-8 text-left items-start">
            {/* Greeting Text with Auto-Type */}
            <div className="mb-8">
              <span className="text-green-400 text-4xl md:text-5xl">
                {displayedText}
              </span>
              {!isTypingComplete && (
                <span className="text-green-400 text-4xl md:text-5xl">
                  {showCursor ? "█" : " "}
                </span>
              )}
            </div>

            {/* Previous responses */}
            {responses.map((response, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 w-full text-left"
              >
                <div className="text-green-400 mb-2 flex gap-1 justify-start items-baseline">
                  <span className="text-green-500">&gt;_</span>{" "}
                  <span>{response.question}</span>
                </div>
                <div className="text-green-300/80 mb-4 ml-6">
                  <div className="flex items-center gap-2">
                    <span>{response.answer}</span>
                    {response.isLoading && <LoadingDots />}
                  </div>
                </div>

                {response.actions && response.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-6 justify-start items-baseline">
                    {response.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        onClick={action.onClick}
                        variant="outline"
                        size="sm"
                        className="bg-green-950/30 border-green-500/50 text-green-400 hover:bg-green-900/50 hover:text-green-300 hover:border-green-400"
                      >
                        {action.icon && (
                          <span className="mr-2">{action.icon}</span>
                        )}
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Input Area - Stays centered */}
          {isTypingComplete && !isRedirecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-shrink-0 text-left"
            >
              <form
                onSubmit={handleSubmit}
                className="flex gap-2 justify-start items-center"
              >
                <span className="text-green-500 text-xl">&gt;_</span>
                <div className="flex-1 relative">
                  {/* Hidden span to measure text width */}
                  <span
                    ref={measureRef}
                    className="text-green-400 text-xl invisible absolute whitespace-pre pointer-events-none text-left"
                    aria-hidden="true"
                  >
                    {userInput}
                  </span>
                  {/* Flashing cursor positioned at end of text */}
                  <span
                    className="text-green-400 text-xl animate-pulse absolute pointer-events-none"
                    style={{ left: `${cursorPosition}px`, top: "0" }}
                  >
                    {showCursor ? "█" : " "}
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="w-full bg-transparent text-green-400 text-xl outline-none caret-transparent placeholder-green-700 text-left"
                    placeholder={COPY.inputPlaceholder}
                    autoComplete="off"
                  />
                </div>
              </form>

              {/* Hint text */}
              {responses.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8 text-green-700 text-sm text-left"
                >
                  💡 Tip: Try scrolling to see suggested questions
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Picker Wheel */}
      <AnimatePresence>
        {showPicker && (
          <PickerWheel
            suggestions={COPY.suggestions}
            onSelect={handleSelectSuggestion}
            onClose={() => {
              setShowPicker(false);
              hasScrolledRef.current = false;
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
