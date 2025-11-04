import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingDots } from "../LoadingDots";
import { PickerWheel } from "../PickerWheel";
import { Button } from "../ui/button";
import TerminalInput from "./TerminalInput";

import {
  buildCandidates,
  COPY,
  ICONS,
  PAGES,
  Response,
  ResponseAction,
} from "./constants";
import { useAutocomplete, useHistory } from "./hooks";

const { Mail, Linkedin, Github, FileText } = ICONS;

const USER_LINKS = {
  email: "mo.afshar1998@gmail.com",
  linkedin: "https://www.linkedin.com/in/afshar98",
  github: "https://github.com/afshar98",
};

export function Terminal() {
  const navigate = useNavigate();

  // greeting / UI
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // IO
  const [responses, setResponses] = useState<Response[]>([]);
  const [userInput, setUserInput] = useState("");

  // helpers
  const candidates = useMemo(buildCandidates, []);
  const completion = useAutocomplete(candidates, userInput);
  const {
    push: pushHistory,
    up: historyUp,
    down: historyDown,
    exitHistoryOnType,
  } = useHistory();
  const hasScrolledRef = useRef(false);

  // greeting typing
  useEffect(() => {
    setDisplayedText("");
    setIsTypingComplete(false);
    setResponses([]);
    setUserInput("");
  }, []);

  useEffect(() => {
    if (displayedText.length < COPY.greeting.length) {
      const t = setTimeout(
        () =>
          setDisplayedText(COPY.greeting.slice(0, displayedText.length + 1)),
        100
      );
      return () => clearTimeout(t);
    } else setIsTypingComplete(true);
  }, [displayedText]);

  // blink cursor
  useEffect(() => {
    const i = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(i);
  }, []);

  // open picker on first scroll
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

  const pushResponse = (r: Response) => setResponses((prev) => [...prev, r]);

  // commands
  const handleLs = () => {
    pushResponse({
      question: "ls",
      answer: `./pages → ${PAGES.join("  ")}`,
      actions: PAGES.map((p) => ({
        label: `Open ${p}`,
        icon: <FileText className="w-4 h-4" />,
        onClick: () => navigate(`/${p}`),
      })),
    });
  };

  const handleClear = () => setResponses([]);

  const handleHelp = () =>
    pushResponse({
      question: "help",
      answer:
        "Available commands: ls, cd <page>, clear (or cls), help. Pages: " +
        PAGES.join(", "),
    });

  const goCd = (target: string) => {
    const lower = target.toLowerCase();
    if (lower === "resume") {
      pushResponse({
        question: "cd resume",
        answer: COPY.commands.cdResume,
        isLoading: true,
      });
      setIsRedirecting(true);
      setTimeout(() => navigate("/resume"), 2000);
      return;
    }
    if (lower === "blogs") {
      pushResponse({
        question: "cd blogs",
        answer: COPY.commands.cdBlogs,
        isLoading: true,
      });
      setIsRedirecting(true);
      setTimeout(() => navigate("/blogs"), 2000);
      return;
    }
    if (lower === "contact") {
      pushResponse({
        question: "cd contact",
        answer: COPY.commands.cdContact,
        isLoading: true,
      });
      setIsRedirecting(true);
      setTimeout(() => navigate("/contact"), 2000);
      return;
    }
    pushResponse({
      question: `cd ${target}`,
      answer: `No such page: ${target}`,
    });
  };

  // run a command programmatically (used by submit + picker select)
  const executeCommand = (rawInput: string) => {
    const raw = rawInput.trim();
    if (!raw) return;

    // history
    pushHistory(raw);

    const lo = raw.toLowerCase();

    if (lo === "ls") {
      handleLs();
      setUserInput("");
      return;
    }
    if (lo === "clear" || lo === "cls") {
      handleClear();
      setUserInput("");
      return;
    }
    if (lo === "help") {
      handleHelp();
      setUserInput("");
      return;
    }
    if (lo.startsWith("cd")) {
      const parts = raw.split(/\s+/).filter(Boolean);
      if (parts.length >= 2) goCd(parts.slice(1).join(" "));
      else pushResponse({ question: raw, answer: "Usage: cd <page>" });
      setUserInput("");
      return;
    }

    const data = COPY.responses[raw];
    if (data) {
      // Map button labels → icons + handlers (robust to text changes)
      const actions: ResponseAction[] | undefined = data.actions?.map(
        (action) => {
          const label = action.label.toLowerCase();
          const cfg: ResponseAction = {
            label: action.label,
            onClick: () => {},
          };

          // Navigation buttons
          if (label.includes("Open Resume")) {
            cfg.icon = <FileText className="w-4 h-4" />;
            cfg.onClick = () => navigate("/resume");
            return cfg;
          }

          if (label.includes("open blogs") || label.includes("blogs")) {
            cfg.icon = <FileText className="w-4 h-4" />;
            cfg.onClick = () => navigate("/blogs");
            return cfg;
          }

          if (label.includes("contact")) {
            cfg.icon = <Mail className="w-4 h-4" />;
            cfg.onClick = () => navigate("/contact");
            return cfg;
          }

          // External links
          if (label.includes("email")) {
            cfg.icon = <Mail className="w-4 h-4" />;
            cfg.onClick = () =>
              navigate("/contact");
            return cfg;
          }

          if (label.includes("linkedin")) {
            cfg.icon = <Linkedin className="w-4 h-4" />;
            cfg.onClick = () => window.open(USER_LINKS.linkedin, "_blank");
            return cfg;
          }

          if (label.includes("github")) {
            cfg.icon = <Github className="w-4 h-4" />;
            cfg.onClick = () => window.open(USER_LINKS.github, "_blank");
            return cfg;
          }

          return cfg;
        }
      );

      pushResponse({ question: raw, answer: data.answer, actions });
    } else {
      pushResponse({ question: raw, answer: COPY.defaultResponse });
    }

    setUserInput("");
  };

  // submit via form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(userInput);
  };

  // input hotkeys
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      if (completion) {
        e.preventDefault();
        setUserInput((v) => v + completion);
      }
      return;
    }
    if (e.key === "ArrowRight" && completion) {
      e.preventDefault();
      setUserInput((v) => v + completion);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      historyUp(setUserInput);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      historyDown(setUserInput);
      return;
    }
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      handleClear();
      return;
    }
  };

  return (
    <>
      <div
        className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden pb-[50px]"
        dir="ltr"
      >
        <div className="w-full max-w-4xl px-8 flex flex-col max-h-full font-mono mb-[50px]">
          {/* history */}
          <div className="overflow-y-auto shrink min-h-0 flex flex-col justify-end pb-8 text-left items-start">
            {/* greeting */}
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

            {/* responses */}
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

          {/* input */}
          {isTypingComplete && !isRedirecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="shrink-0 text-left"
            >
              <TerminalInput
                value={userInput}
                onChange={(v) => {
                  setUserInput(v);
                  exitHistoryOnType();
                }}
                onSubmit={handleSubmit}
                onKeyDown={onKeyDown}
                placeholder={COPY.inputPlaceholder}
                completion={completion}
                showCursor={showCursor}
              />

              {responses.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8 text-green-700 text-sm text-left"
                >
                  💡 Tip: Try <code>ls</code>, <code>cd resume</code>, press{" "}
                  <kbd>Tab</kbd> to autocomplete, or use <kbd>↑</kbd>/
                  <kbd>↓</kbd> for history.
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
            onSelect={(choice) => {
              setShowPicker(false);
              hasScrolledRef.current = false;
              executeCommand(choice); // run immediately
            }}
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
