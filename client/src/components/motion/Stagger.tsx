import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/motion/usePrefersReducedMotion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type StaggerProps = { children: ReactNode; className?: string };

/** Grid/list wrapper: reveals its StaggerItem children one by one on scroll. */
export function StaggerGroup({ children, className }: StaggerProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      variants={container}
      initial={reduced ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

/** Direct child of StaggerGroup. Stretches its content to the grid row height. */
export function StaggerItem({ children, className = "" }: StaggerProps) {
  return (
    <motion.div variants={item} className={`h-full [&>*]:h-full ${className}`}>
      {children}
    </motion.div>
  );
}
