import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { BLOGS } from "./data";
import { Button } from "../../components/ui/button";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";

export function Blogs() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-black text-green-400 font-mono px-6 md:px-10 lg:px-16 py-12"
      dir="ltr"
    >
      <div className="flex items-start mb-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-green-400 hover:text-green-300 hover:bg-green-950/30 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl mb-6 text-left"
        >
          <span className="text-green-500">{">"}_</span> Blogs
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-green-300/80 mb-12 text-left max-w-3xl"
        >
          Posts about React, performance, UI systems, and developer experience.
        </motion.p>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOGS.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-lg border border-green-500/30 bg-green-950/20 overflow-hidden hover:border-green-400/50 transition-colors"
            >
              {post.cover && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="text-2xl text-left mb-2">{post.title}</h2>
                <div className="flex gap-4 items-center text-green-500 text-sm mb-3 flex-wrap">
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />{" "}
                    {new Date(post.date).toDateString()}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Tag className="w-4 h-4" /> {post.tags.join(", ")}
                  </span>
                </div>
                <p className="text-green-300/80 text-left mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button
                  onClick={() => navigate(`/blogs/${post.slug}`)}
                  variant="outline"
                  size="sm"
                  className="bg-green-950/30 border-green-500/50 text-green-400 hover:bg-green-900/50 hover:text-green-300 hover:border-green-400"
                >
                  Read more
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
