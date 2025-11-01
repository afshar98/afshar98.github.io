import { useMemo, useState } from "react";

export function useAutocomplete(candidates: string[], userInput: string) {
  return useMemo(() => {
    const q = userInput.trim();
    if (!q) return "";
    const found = candidates.find((c) =>
      c.toLowerCase().startsWith(q.toLowerCase())
    );
    return found ? found.slice(q.length) : "";
  }, [candidates, userInput]);
}

export function useHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1); // -1 = live input

  const push = (cmd: string) => {
    setHistory((h) => (h[h.length - 1] === cmd ? h : [...h, cmd]));
    setHistoryIndex(-1);
  };

  const up = (setInput: (v: string) => void) => {
    setHistoryIndex((idx) => {
      if (!history.length) return -1;
      const next = idx === -1 ? history.length - 1 : Math.max(0, idx - 1);
      setInput(history[next] ?? "");
      return next;
    });
  };

  const down = (setInput: (v: string) => void) => {
    setHistoryIndex((idx) => {
      if (!history.length) return -1;
      const next = idx === -1 ? -1 : idx + 1;
      if (next >= history.length) {
        setInput("");
        return -1;
      }
      setInput(history[next] ?? "");
      return next;
    });
  };

  const exitHistoryOnType = () => {
    if (historyIndex !== -1) setHistoryIndex(-1);
  };

  return { history, push, up, down, exitHistoryOnType };
}
