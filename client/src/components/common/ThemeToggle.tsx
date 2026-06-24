import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        relative flex items-center justify-center
        h-10 w-10 rounded-xl
        border border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
        text-neutral-600 dark:text-neutral-300
        transition-all duration-300
        hover:border-amber-500/40
        hover:text-amber-500
        hover:bg-amber-500/5
      "
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === "dark" ? "scale-0 rotate-90 opacity-0" : "scale-100"
        }`}
      />

      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === "dark" ? "scale-100" : "scale-0 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;