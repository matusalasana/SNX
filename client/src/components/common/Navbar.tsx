import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const baseLink =
    "relative text-sm font-medium transition-colors duration-300";

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${baseLink} ${
      isActive
        ? "text-amber-500"
        : "text-neutral-600 dark:text-neutral-300 hover:text-amber-500"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 dark:border-neutral-800/70 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          Sana <span className="text-amber-500">M.</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={getLinkClass}
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}

                  {/* Active / hover underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100 bg-amber-500"
                        : "scale-x-0 bg-amber-500 group-hover:scale-x-100"
                    }`}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <NavLink
            to="/contact"
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-amber-500 hover:text-neutral-900 dark:bg-neutral-100 dark:text-neutral-900"
          >
            Let’s Talk
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg border border-neutral-200 dark:border-neutral-800 p-2 text-neutral-700 dark:text-neutral-300"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
          <div className="flex flex-col px-6 py-5 space-y-4">

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-amber-500"
                      : "text-neutral-600 dark:text-neutral-300 hover:text-amber-500"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Mobile CTA */}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-neutral-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-amber-500 hover:text-neutral-900 dark:bg-neutral-100 dark:text-neutral-900"
            >
              Let’s Talk
            </NavLink>

            {/* Theme toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-sm text-neutral-500">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}