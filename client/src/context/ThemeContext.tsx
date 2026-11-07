import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/** light = Light-Neo, dark = Dark-Neo, terminal = Terminal / IDE */
export type Theme = "light" | "dark" | "terminal";

export const THEMES: Theme[] = ["light", "dark", "terminal"];

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  /** Advance to the next theme in THEMES order. */
  cycleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const readInitialTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const root = document.documentElement;
  if (root.classList.contains("terminal")) return "terminal";
  return root.classList.contains("dark") ? "dark" : "light";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    // Terminal builds on the dark class so `dark:` variants keep working.
    root.classList.toggle("dark", theme !== "light");
    root.classList.toggle("terminal", theme === "terminal");

    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const cycleTheme = useCallback(() => {
    setTheme((prev) => THEMES[(THEMES.indexOf(prev) + 1) % THEMES.length]);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
