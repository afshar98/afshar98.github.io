import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { BLOGS } from "./data";
import { Button } from "../ui/button";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";

export function BlogDetail() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const post = BLOGS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div
        className="min-h-screen bg-black text-green-400 font-mono p-8"
        dir="ltr"
      >
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={() => navigate("/blogs")}
            variant="ghost"
            className="text-green-400 hover:text-green-300 hover:bg-green-950/30 gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Button>
          <h1 className="text-3xl">Post not found.</h1>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-black text-green-400 font-mono p-8"
      dir="ltr"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            onClick={() => navigate("/blogs")}
            variant="ghost"
            className="text-green-400 hover:text-green-300 hover:bg-green-950/30 gap-2 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Button>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl mb-3 text-left"
        >
          <span className="text-green-500">{">"}_</span> {post.title}
        </motion.h1>

        <div className="flex gap-4 items-center text-green-500 text-sm mb-8">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />{" "}
            {new Date(post.date).toDateString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <Tag className="w-4 h-4" /> {post.tags.join(", ")}
          </span>
        </div>

        {post.cover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <img
              src={post.cover}
              alt={post.title}
              className="w-full rounded-lg border border-green-500/30 opacity-90"
              loading="lazy"
            />
          </motion.div>
        )}

        <article
          className="prose prose-invert prose-p:my-4 prose-li:my-1 max-w-none text-green-300/90"
          // HTML to avoid adding markdown deps
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>
    </div>
  );
}
