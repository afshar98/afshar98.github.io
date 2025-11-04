import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Resume } from "./components/Resume";
import { BlogDetail } from "./components/blogs/BlogDetail";
import { Blogs } from "./components/blogs/Blogs";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Terminal } from "./components/terminal/Terminal";
import Contact from "./components/contact/Contact";

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
