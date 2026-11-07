import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "../../hooks/motion/usePrefersReducedMotion";

type MagneticProps = {
  children: ReactNode;
  /** Fraction of the cursor offset the element follows (0–1). */
  strength?: number;
  className?: string;
};

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

/**
 * Wraps a button/link so it gently drifts toward the cursor while hovered
 * and springs back on leave. Inactive for touch input and reduced motion.
 */
export default function Magnetic({
  children,
  strength = 0.3,
  className = "inline-block",
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
