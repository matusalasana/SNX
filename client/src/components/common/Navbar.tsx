import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          Sana <span className="text-amber-500">M.</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-amber-500"
                    : "text-zinc-600 hover:text-amber-500 dark:text-zinc-300"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100 bg-amber-500" : "scale-x-0 bg-amber-500"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <NavLink
            to="/contact"
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-amber-500 hover:text-black dark:bg-zinc-100 dark:text-zinc-900"
          >
            Let’s Talk
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-zinc-200 p-2 text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
          <div className="flex flex-col space-y-4 px-6 py-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-amber-500"
                      : "text-zinc-600 hover:text-amber-500 dark:text-zinc-300"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:bg-amber-500 hover:text-black dark:bg-zinc-100 dark:text-zinc-900"
            >
              Let’s Talk
            </NavLink>

            <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <span className="text-sm text-zinc-500">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
