"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function FeatureCard({ feature }) {
  const { icon: Icon, title, description, href } = feature;
  
  return (
    <motion.div variants={item}>
      <Link href={href} className="block">
        <div className="group relative bg-card hover:bg-accent rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
          <div className="mb-4">
            <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}