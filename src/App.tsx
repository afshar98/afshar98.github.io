import { BrowserRouter, Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { Terminal } from "./components/Terminal";
import { Resume } from "./components/Resume";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Language } from "./translations";
import { useEffect } from "react";

function TerminalPage() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  
  // Validate and normalize language
  const language: Language = lang === "fa" ? "fa" : "en";
  
  // If URL doesn't match valid language, redirect
  useEffect(() => {
    if (lang !== "en" && lang !== "fa") {
      navigate("/en", { replace: true });
    }
  }, [lang, navigate]);

  const handleLanguageChange = (newLang: Language) => {
    navigate(`/${newLang}`, { replace: true });
  };

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      {/* Hero Background Image */}
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1672361580238-8513306e14ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NjE5ODU1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Person in city skyline background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />
      
      {/* Language Switcher */}
      <LanguageSwitcher currentLang={language} onLanguageChange={handleLanguageChange} />
      
      {/* Terminal Component */}
      <Terminal language={language} />
    </div>
  );
}

function ResumePage() {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  
  // Validate and normalize language
  const language: Language = lang === "fa" ? "fa" : "en";
  
  // If URL doesn't match valid language, redirect
  useEffect(() => {
    if (lang !== "en" && lang !== "fa") {
      navigate("/en/resume", { replace: true });
    }
  }, [lang, navigate]);

  const handleLanguageChange = (newLang: Language) => {
    navigate(`/${newLang}/resume`, { replace: true });
  };

  return <Resume language={language} onLanguageChange={handleLanguageChange} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang/resume" element={<ResumePage />} />
        <Route path="/:lang" element={<TerminalPage />} />
        <Route path="/" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
