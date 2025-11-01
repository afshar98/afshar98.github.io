import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  completion: string;
  showCursor: boolean;
  autoFocus?: boolean;
};

export default function TerminalInput({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  placeholder,
  completion,
  showCursor,
  autoFocus = true,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [cursorPx, setCursorPx] = useState(0);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (measureRef.current) setCursorPx(measureRef.current.offsetWidth);
  }, [value]);

  return (
    <form onSubmit={onSubmit} className="flex gap-2 justify-start items-center">
      <span className="text-green-500 text-xl">&gt;_</span>
      <div className="flex-1 relative">
        <span
          ref={measureRef}
          className="text-green-400 text-xl invisible absolute whitespace-pre pointer-events-none text-left"
          aria-hidden="true"
        >
          {value}
        </span>

        {completion && (
          <span
            className="text-green-700 text-xl absolute pointer-events-none"
            style={{ left: `${cursorPx}px`, top: "0" }}
          >
            {completion}
          </span>
        )}

        <span
          className="text-green-400 text-xl animate-pulse absolute pointer-events-none"
          style={{ left: `${cursorPx}px`, top: "0" }}
        >
          {showCursor ? "█" : " "}
        </span>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent text-green-400 text-xl outline-none caret-transparent placeholder-green-700 text-left"
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
        />
      </div>
    </form>
  );
}
