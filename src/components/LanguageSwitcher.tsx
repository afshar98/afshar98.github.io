import { Languages } from "lucide-react";
import { Button } from "./ui/button";
import { Language } from "../translations";

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitcher({ currentLang, onLanguageChange }: LanguageSwitcherProps) {
  const isRTL = currentLang === "fa";
  
  return (
    <div className={`fixed top-6 z-50 flex gap-2 ${isRTL ? "left-6" : "right-6"}`}>
      <Button
        onClick={() => onLanguageChange(currentLang === "en" ? "fa" : "en")}
        variant="outline"
        size="sm"
        className="bg-green-950/30 border-green-500/50 text-green-400 hover:bg-green-900/50 hover:text-green-300 hover:border-green-400"
      >
        <Languages className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
        {currentLang === "en" ? "فارسی" : "English"}
      </Button>
    </div>
  );
}
