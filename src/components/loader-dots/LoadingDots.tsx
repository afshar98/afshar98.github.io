import { motion } from "motion/react";

export function LoadingDots() {
  return (
    <span className="inline-flex gap-1 ml-1">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
          }}
          className="text-green-400"
        >
          •
        </motion.span>
      ))}
    </span>
  );
}
