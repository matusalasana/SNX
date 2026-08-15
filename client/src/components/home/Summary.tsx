import { memo, type ReactNode } from "react";

interface HighlightProps {
  children: ReactNode;
}

const Highlight = ({ children }: HighlightProps) => (
  <span
    className="
      inline-block
      rounded-md
      border border-border
      bg-muted
      px-1.5 py-0.5
      font-medium
      text-content
      transition-all duration-300
      hover:scale-[1.02]
      hover:border-primary/30
      hover:text-primary
    "
  >
    {children}
  </span>
);

const Summary = memo(() => {
  return (
    <p className="max-w-2xl text-base font-normal leading-relaxed tracking-wide text-secondary md:text-lg text-balance">
      Full-stack developer specializing in{" "}
      <Highlight>MERN</Highlight> and{" "}
      <Highlight>PERN</Highlight>. I architect responsive user
      interfaces, scalable APIs, and robust databases—always optimized for{" "}
      <span className="font-semibold text-content underline decoration-border underline-offset-4">
        performance
      </span>
      ,{" "}
      <span className="font-semibold text-content underline decoration-border underline-offset-4">
        usability
      </span>
      , and{" "}
      <span className="font-semibold text-content underline decoration-border underline-offset-4">
        clean architecture
      </span>
      .
    </p>
  );
});

Summary.displayName = "Summary";

export default Summary;