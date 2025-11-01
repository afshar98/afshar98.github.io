import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PickerWheel } from "./PickerWheel";
import { Button } from "./ui/button";
import { Mail, Linkedin, Github, FileText } from "lucide-react";
import { Language, translations } from "../translations";
import { useNavigate } from "react-router-dom";
import { LoadingDots } from "./LoadingDots";

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

interface TerminalProps {
  language: Language;
}

export function Terminal({ language }: TerminalProps) {
  const t = translations[language];
  const isRTL = language === "fa";
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] =
    useState(false);
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
    // Reset when language changes
    setDisplayedText("");
    setIsTypingComplete(false);
    setResponses([]);
    setUserInput("");
  }, [language]);

  useEffect(() => {
    if (displayedText.length < t.greeting.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(
          t.greeting.slice(0, displayedText.length + 1),
        );
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayedText, t.greeting]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!hasScrolledRef.current && isTypingComplete) {
        e.preventDefault();
        hasScrolledRef.current = true;
        setShowPicker(true);
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    return () =>
      window.removeEventListener("wheel", handleWheel);
  }, [isTypingComplete]);

  // Focus input when typing is complete
  useEffect(() => {
    if (isTypingComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTypingComplete]);

  // Update cursor position based on text width
  useEffect(() => {
    if (measureRef.current) {
      const width = measureRef.current.offsetWidth;
      setCursorPosition(width);
    }
  }, [userInput]);

  // Global keyboard listener - focus input on any keypress (terminal behavior)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Skip if picker is shown or typing animation is not complete
      if (showPicker || !isTypingComplete || !inputRef.current)
        return;

      // Skip if user is interacting with other inputs or textareas
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      )
        return;

      // Don't prevent default for special keys
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Focus input for printable characters
      if (
        e.key.length === 1 ||
        e.key === "Backspace" ||
        e.key === "Delete"
      ) {
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () =>
      window.removeEventListener(
        "keydown",
        handleGlobalKeyDown,
      );
  }, [isTypingComplete, showPicker]);

  // Keep input focused after submitting
  useEffect(() => {
    if (
      isTypingComplete &&
      inputRef.current &&
      responses.length > 0
    ) {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [responses, isTypingComplete]);

  const handleSelectSuggestion = (suggestion: string) => {
    setUserInput(suggestion);
    setShowPicker(false);
    hasScrolledRef.current = false;
    // Focus input after selecting suggestion
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Check for "cd resume" command
    if (userInput.toLowerCase() === "cd resume") {
      const response: Response = {
        question: userInput,
        answer: t.commands.cdResume,
        isLoading: true,
      };
      setResponses([...responses, response]);
      setUserInput("");
      setIsRedirecting(true);
      
      // Navigate to resume after 2 seconds
      setTimeout(() => {
        navigate(`/${language}/resume`);
      }, 2000);
      return;
    }

    // Get the response from translations
    const translationData = t.responses[userInput];

    let response: Response;
    if (translationData) {
      response = {
        question: userInput,
        answer: translationData.answer,
        actions: translationData.actions?.map(
          (action, index) => {
            const actionConfig: ResponseAction = {
              label: action.label,
              onClick: () => {},
            };

            // Map actions based on their index
            if (userInput === t.suggestions[2]) {
              // Background question - add resume link
              actionConfig.icon = (
                <FileText className="w-4 h-4" />
              );
              actionConfig.onClick = () =>
                navigate(`/${language}/resume`);
            } else if (userInput === t.suggestions[3]) {
              // Contact question
              if (index === 0) {
                actionConfig.icon = (
                  <Mail className="w-4 h-4" />
                );
                actionConfig.onClick = () =>
                  window.open(
                    "mailto:afshar@example.com",
                    "_blank",
                  );
              } else if (index === 1) {
                actionConfig.icon = (
                  <Linkedin className="w-4 h-4" />
                );
                actionConfig.onClick = () =>
                  window.open(
                    "https://linkedin.com/in/afshar",
                    "_blank",
                  );
              }
            } else if (userInput === t.suggestions[5]) {
              // Portfolio question
              if (index === 0) {
                actionConfig.icon = (
                  <Github className="w-4 h-4" />
                );
                actionConfig.onClick = () =>
                  window.open(
                    "https://github.com/afshar",
                    "_blank",
                  );
              } else if (index === 1) {
                actionConfig.onClick = () =>
                  window.open("https://afshar.dev", "_blank");
              }
            }

            return actionConfig;
          },
        ),
      };
    } else {
      response = {
        question: userInput,
        answer: t.defaultResponse,
      };
    }

    setResponses([...responses, response]);
    setUserInput("");
  };

  return (
    <>
      <div
        className="w-full h-full relative z-10 flex items-center justify-center overflow-hidden pb-[50px]"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Terminal Content - Centered Block */}
        <div className="w-full max-w-4xl px-8 flex flex-col max-h-full font-mono mb-[50px]">
          {/* Scrollable History Section */}
          <div
            className={`overflow-y-auto flex-shrink min-h-0 flex flex-col justify-end pb-8 ${isRTL ? "text-right justify-start" : "text-left items-start"}`}
          >
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
                className={`mb-6 w-full ${isRTL ? "text-right" : "text-left"}`}
              >
                <div
                  className={`text-green-400 mb-2 flex gap-1 ${isRTL ? "justify-end justify-start" : "justify-start items-baseline"}`}
                >
                  <span className="text-green-500">&gt;_</span>{" "}
                  <span>{response.question}</span>
                </div>
                <div
                  className={`text-green-300/80 mb-4 ${isRTL ? "mr-6" : "ml-6"}`}
                >
                  <div className="flex items-center gap-2">
                    <span>{response.answer}</span>
                    {response.isLoading && <LoadingDots />}
                  </div>

                </div>
                {response.actions &&
                  response.actions.length > 0 && (
                    <div
                      className={`flex flex-wrap gap-2 mt-3 ${isRTL ? "mr-6 justify-end justify-start" : "ml-6 justify-start items-baseline"}`}
                    >
                      {response.actions.map(
                        (action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            onClick={action.onClick}
                            variant="outline"
                            size="sm"
                            className="bg-green-950/30 border-green-500/50 text-green-400 hover:bg-green-900/50 hover:text-green-300 hover:border-green-400"
                          >
                            {action.icon && (
                              <span
                                className={
                                  isRTL ? "ml-2" : "mr-2"
                                }
                              >
                                {action.icon}
                              </span>
                            )}
                            {action.label}
                          </Button>
                        ),
                      )}
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
              className={`flex-shrink-0 ${isRTL ? "text-right" : "text-left"}`}
            >
              <form
                onSubmit={handleSubmit}
                className={`flex gap-2 ${isRTL ? "justify-end items-baseline" : "justify-start items-center"}`}
              >
                <span className="text-green-500 text-xl">
                  &gt;_
                </span>
                <div className="flex-1 relative">
                  {/* Hidden span to measure text width - will support RTL via dir prop */}
                  <span
                    ref={measureRef}
                    className={`text-green-400 text-xl invisible absolute whitespace-pre pointer-events-none ${isRTL ? "text-right" : "text-left"}`}
                    aria-hidden="true"
                  >
                    {userInput}
                  </span>
                  {/* Flashing cursor positioned at end of text */}
                  <span
                    className="text-green-400 text-xl animate-pulse absolute pointer-events-none"
                    style={
                      isRTL
                        ? {
                            right: `${cursorPosition}px`,
                            top: "0",
                          }
                        : {
                            left: `${cursorPosition}px`,
                            top: "0",
                          }
                    }
                  >
                    {showCursor ? "█" : " "}
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) =>
                      setUserInput(e.target.value)
                    }
                    className={`w-full bg-transparent text-green-400 text-xl outline-none caret-transparent placeholder-green-700 ${isRTL ? "text-right" : "text-left"}`}
                    placeholder={t.inputPlaceholder}
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
                  className={`mt-8 text-green-700 text-sm ${isRTL ? "text-right" : "text-left"}`}
                >
                  {isRTL
                    ? "💡 نکته: برای دیدن سوالات پیشنهادی اسکرول کنید"
                    : "💡 Tip: Try scrolling to see suggested questions"}
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
            suggestions={t.suggestions}
            onSelect={handleSelectSuggestion}
            onClose={() => {
              setShowPicker(false);
              hasScrolledRef.current = false;
            }}
            isRTL={isRTL}
          />
        )}
      </AnimatePresence>
    </>
  );
}