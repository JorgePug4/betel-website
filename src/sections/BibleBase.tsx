import * as React from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaQuoteLeft } from "react-icons/fa";
import { BIBLE_VERSE } from "@utils/constants";
import { fadeUp, scaleIn, viewport } from "@/animations/variants";

export const BibleBase: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-surface-dark py-24 sm:py-32">
      {/* Luz dorada */}
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-flame-light/20 blur-[140px]" />
      <div className="absolute inset-0 bg-grid opacity-[0.07]" />

      <div className="container-max relative px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-flame text-4xl text-white shadow-glow-flame"
          >
            <FaBookOpen />
          </motion.div>
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-flame-light">
            Nuestra Base Bíblica
          </span>
        </motion.div>

        <motion.blockquote
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-flame-light/20 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 shadow-[0_0_60px_rgba(255,213,79,0.12)] backdrop-blur-md sm:p-14"
        >
          <FaQuoteLeft className="mb-6 text-4xl text-flame-light/60" />
          <p className="text-xl font-light leading-relaxed text-slate-100 sm:text-2xl">
            “{BIBLE_VERSE.text}”
          </p>
          <footer className="mt-8 flex items-center gap-3">
            <span className="h-px w-10 bg-flame-light" />
            <cite className="font-display text-lg font-bold not-italic text-flame-light">
              {BIBLE_VERSE.reference}
            </cite>
          </footer>
        </motion.blockquote>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-white/75"
        >
          {BIBLE_VERSE.caption}
        </motion.p>
      </div>
    </section>
  );
};

export default BibleBase;
