import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-cyan-400"
        : "text-slate-300 hover:text-cyan-400"
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-base font-medium transition ${
      isActive
        ? "text-cyan-400"
        : "text-slate-300 hover:text-cyan-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-black tracking-widest text-white"
        >
          SNX<span className="text-cyan-400">.</span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={linkClass}
              end={link.path === "/"}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="text-white" />
          ) : (
            <Menu className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0f172a]">
          <div className="flex flex-col space-y-5 px-6 py-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
                end={link.path === "/"}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}