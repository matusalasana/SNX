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

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100"
        >
          Sana <span className="text-amber-500">M.</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-amber-500"
                    : "text-gray-600 dark:text-gray-300 hover:text-amber-500"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}

                  {/* underline */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] w-full transition-transform duration-300 origin-left ${
                      isActive
                        ? "scale-x-100 bg-amber-500"
                        : "scale-x-0 bg-amber-500"
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
            className="
              rounded-xl px-4 py-2 text-sm font-medium
              bg-gray-900 text-white
              dark:bg-gray-100 dark:text-gray-900
              hover:bg-amber-500 hover:text-black
              transition-all
            "
          >
            Let’s Talk
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg border border-gray-200 dark:border-gray-800 p-2 text-gray-700 dark:text-gray-300"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
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
                      : "text-gray-600 dark:text-gray-300 hover:text-amber-500"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* CTA */}
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="
                mt-2 rounded-xl px-4 py-2 text-center text-sm font-medium
                bg-gray-900 text-white
                dark:bg-gray-100 dark:text-gray-900
                hover:bg-amber-500 hover:text-black
                transition-all
              "
            >
              Let’s Talk
            </NavLink>

            {/* Theme */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-500">Theme</span>
              <ThemeToggle />
            </div>

          </div>
        </div>
      )}
    </header>
  );
}