import * as React from "react";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/animations/variants";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
}

export const SectionHeading: React.FC<Props> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}) => {
  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`flex max-w-3xl flex-col gap-4 ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-spirit/30 bg-spirit/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-spirit">
          {eyebrow}
        </span>
      )}
      <h2
        className={`heading-xl text-3xl sm:text-4xl md:text-5xl ${
          light ? "text-white" : "text-surface-dark dark:text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            light ? "text-white/80" : "text-slate-600 dark:text-slate-300"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
