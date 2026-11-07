import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/motion/usePrefersReducedMotion";

const GLYPHS = "!<>-_\/[]{}=+*^?#0123456789";

type ScrambleTextProps = {
  text: string;
  /** Scramble once on mount. */
  onLoad?: boolean;
  /** Re-scramble on hover/focus. */
  onHover?: boolean;
  /** Total duration in ms. */
  duration?: number;
  className?: string;
};

/**
 * Resolves `text` character by character from random glyphs.
 * Spaces are preserved; screen readers always get the real text.
 */
export default function ScrambleText({
  text,
  onLoad = true,
  onHover = true,
  duration = 700,
  className,
}: ScrambleTextProps) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(text);
  const frame = useRef<number>(0);

  const run = useCallback(() => {
    if (reduced) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const settled = Math.floor(progress * text.length);

      setDisplay(
        text
          .split("")
          .map((char, i) =>
            char === " " || i < settled
              ? char
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );

      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
  }, [text, duration, reduced]);

  useEffect(() => {
    if (onLoad) run();
    return () => cancelAnimationFrame(frame.current);
  }, [onLoad, run]);

  return (
    <span
      className={className}
      aria-label={text}
      onMouseEnter={onHover ? run : undefined}
      onFocus={onHover ? run : undefined}
    >
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
