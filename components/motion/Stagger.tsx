"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

type Tag = "div" | "ul" | "ol" | "li" | "span";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  id?: string;
};

export function StaggerGroup({ children, className = "", as = "div", id }: StaggerProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      id={id}
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-80px" }}
      variants={reduce ? undefined : containerVariants}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, className = "", as = "div", id }: StaggerProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component id={id} className={className} variants={reduce ? undefined : itemVariants}>
      {children}
    </Component>
  );
}
