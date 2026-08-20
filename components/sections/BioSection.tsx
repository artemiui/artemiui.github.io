"use client";

import { motion } from "framer-motion";

interface BioSectionProps {
  className?: string;
}

export default function BioSection({ className = "" }: BioSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`pt-1 ${className}`}
    >
      <h1 className="text-2xl font-mono font-semibold text-zinc-900 dark:text-zinc-100">
        Entries
      </h1>
    </motion.div>
  );
}
