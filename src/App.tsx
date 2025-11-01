import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Terminal } from "./components/Terminal";
import { Resume } from "./components/Resume";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { useEffect } from "react";

function TerminalPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1672361580238-8513306e14ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NjE5ODU1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Person in city skyline background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/80" />
      <Terminal />
    </div>
  );
}

function ResumePage() {
  return <Resume />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/" element={<TerminalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
