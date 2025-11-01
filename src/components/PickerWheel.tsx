import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface PickerWheelProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  onClose: () => void;
  isRTL?: boolean;
}

export function PickerWheel({
  suggestions,
  onSelect,
  onClose,
  isRTL = false,
}: PickerWheelProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setSelectedIndex(
          (prev) => (prev + 1) % suggestions.length,
        );
      } else {
        setSelectedIndex(
          (prev) =>
            (prev - 1 + suggestions.length) %
            suggestions.length,
        );
      }
    };

    const handleClick = () => {
      onSelect(suggestions[selectedIndex]);
      onClose();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Enter") {
        handleClick();
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("click", handleClick);
    };
  }, [selectedIndex, suggestions, onSelect, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 lg:bg-black/10 backdrop-blur-sm lg:backdrop-blur-none flex items-center justify-center z-50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`bg-zinc-900 lg:bg-zinc-900/80 border-2 border-green-500/30 rounded-lg p-8 max-w-md w-full mx-4 lg:absolute ${isRTL ? "lg:left-[max(2rem,calc((100vw-56rem)/2-30rem))]" : "lg:right-[max(2rem,calc((100vw-56rem)/2-30rem))]"}`}
      >
        <div
          className={`text-green-500 mb-6 font-mono text-center`}
        >
          <div className="mb-2">
            {isRTL
              ? "اسکرول کنید تا انتخاب کنید • کلیک یا Enter بزنید"
              : "Scroll to select • Click or press Enter to choose"}
          </div>
          <div className="text-zinc-500 text-sm">
            {isRTL ? "ESC برای لغو" : "Press ESC to cancel"}
          </div>
        </div>

        <div className="relative h-64 overflow-hidden">
          {suggestions.map((suggestion, index) => {
            const offset = index - selectedIndex;
            const isSelected = index === selectedIndex;

            return (
              <motion.div
                key={index}
                animate={{
                  y: offset * 80,
                  opacity:
                    Math.abs(offset) > 1
                      ? 0
                      : isSelected
                        ? 1
                        : 0.3,
                  scale: isSelected ? 1 : 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className={`absolute inset-x-0 flex h-20 font-mono ${
                  isSelected
                    ? "text-green-400 text-xl"
                    : "text-green-600"
                } justify-center items-center`}
                style={{ top: "50%", marginTop: "-40px" }}
              >
                <div
                  className={`px-4 ${isRTL ? "text-right" : "text-center"}`}
                >
                  {isSelected && (
                    <span
                      className={`text-green-500 ${isRTL ? "ml-2" : "mr-2"}`}
                    >
                      &gt;
                    </span>
                  )}
                  {suggestion}
                  {isSelected && (
                    <span
                      className={`text-green-500 ${isRTL ? "mr-2" : "ml-2"}`}
                    >
                      &lt;
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div
          className={`mt-6 flex gap-2 justify-center items-center`}
        >
          {suggestions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === selectedIndex
                  ? "bg-green-500"
                  : "bg-green-900"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}