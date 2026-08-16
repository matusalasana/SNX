import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-lg font-semibold tracking-tight text-content"
        >
          <Logo />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-secondary hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}

                  <span
                    className={`
                      absolute -bottom-1 left-0 h-0.5 w-full
                      origin-left
                      bg-primary
                      transition-transform duration-300
                      ${isActive ? "scale-x-100" : "scale-x-0"}
                    `}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <NavLink to="/contact" className="btn-primary">
            Let's Talk
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-lg border border-border p-2 text-content transition-colors hover:bg-muted md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-custom flex flex-col gap-4 py-5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-secondary hover:text-primary"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Let's Talk
            </NavLink>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm text-secondary">
                Theme
              </span>

              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}