"use client";

import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import { MapPin, Search, BarChart2, ArrowLeftRight } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Locate Branch",
    description: "Find bank branches across India using IFSC codes or location",
    href: "/locate",
  },
  {
    icon: Search,
    title: "Advanced Search",
    description: "Search and filter bank branches with multiple criteria",
    href: "/filter",
  },
  {
    icon: ArrowLeftRight,
    title: "Compare Branches",
    description: "Compare different bank branches side by side",
    href: "/compare",
  },
  {
    icon: BarChart2,
    title: "Analytics",
    description: "View bank branch statistics and insights",
    href: "/dashboard",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Features() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full"
    >
      {features.map((feature) => (
        <FeatureCard key={feature.title} feature={feature} />
      ))}
    </motion.div>
  );
}