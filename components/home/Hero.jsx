"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Bank Branch Finder</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Find and explore bank branches across India with ease. Search by IFSC code,
        location, or use our advanced filters.
      </p>
    </motion.div>
  );
}