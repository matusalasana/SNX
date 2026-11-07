import { Moon, Sun, Terminal } from "lucide-react";
import { THEMES, useTheme, type Theme } from "../../context/ThemeContext";

const META: Record<Theme, { label: string; Icon: typeof Sun }> = {
  light: { label: "Light", Icon: Sun },
  dark: { label: "Dark", Icon: Moon },
  terminal: { label: "IDE", Icon: Terminal },
};

/** Three-way switch: Light-Neo / Dark-Neo / Terminal-IDE. */
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex border-[3px] border-ink bg-card shadow-neo-sm"
    >
      {THEMES.map((t) => {
        const { label, Icon } = META[t];
        const active = theme === t;

        return (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={() => setTheme(t)}
            className={`flex-center size-9 transition-colors ${
              active
                ? "bg-accent text-on-accent"
                : "text-content hover:bg-muted"
            } ${t !== "light" ? "border-l-[3px] border-ink" : ""}`}
          >
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
