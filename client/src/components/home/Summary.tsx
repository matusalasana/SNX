import React, { memo } from 'react';

// Sub-component to keep the main text clean and dry
const Highlight = ({ 
  children, 
  hoverColor = "hover:text-cyan-500" 
}: { 
  children: React.ReactNode; 
  hoverColor?: string 
}) => (
  <span className={`inline-block rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 px-1.5 py-0.5 font-medium text-slate-800 dark:text-slate-100 transition-all duration-300 hover:scale-[1.02] cursor-default ${hoverColor}`}>
    {children}
  </span>
);

const Summary = memo(() => {
  return (
    <p className="max-w-2xl text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300 text-balance font-normal tracking-wide">
      Full-stack developer specializing in{" "}
      <Highlight hoverColor="dark:hover:text-cyan-400">MERN</Highlight> and{" "}
      <Highlight hoverColor="hover:text-blue-500 dark:hover:text-blue-400">PERN</Highlight>{" "}
      stacks. I architect responsive user interfaces, scalable APIs, and robust databases—always optimized for{" "}
      <span className="font-semibold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4">
        performance
      </span>
      ,{" "}
      <span className="font-semibold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4">
        usability
      </span>
      , and{" "}
      <span className="font-semibold text-slate-900 dark:text-slate-100 underline decoration-slate-400 underline-offset-4">
        clean architecture
      </span>
      .
    </p>
  );
});

Summary.displayName = 'Summary';

export default Summary;
