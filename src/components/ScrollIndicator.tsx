import * as React from "react";
import { motion } from "framer-motion";

export const ScrollIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.4, duration: 1 }}
    className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
    aria-hidden="true"
  >
    <span className="text-xs uppercase tracking-[0.25em] text-surface-dark/50 dark:text-white/60">
      Desliza
    </span>
    <span className="flex h-10 w-6 justify-center rounded-full border-2 border-surface-dark/30 p-1.5 dark:border-white/50">
      <span className="h-2 w-1 rounded-full bg-surface-dark/60 animate-scroll-down dark:bg-white" />
    </span>
  </motion.div>
);

export default ScrollIndicator;
