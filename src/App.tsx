import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Resume } from "./pages/resume/Resume";
import { BlogDetail } from "./pages/blogs/BlogDetail";
import { Blogs } from "./pages/blogs/Blogs";
import { ImageWithFallback } from "./components/ui/ImageWithFallback";
import { Terminal } from "./components/terminal/Terminal";
import Contact from "./pages/contact/Contact";

function TerminalPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      <ImageWithFallback
        src="/images/tehran.jpg"
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

function BlogsPage() {
  return <Blogs />;
}

function BlogDetailPage() {
  return <BlogDetail />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<TerminalPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
