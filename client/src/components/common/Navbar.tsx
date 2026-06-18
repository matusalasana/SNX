import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Terminal, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="
          sticky top-0 z-50
          border-b border-zinc-800/60
          bg-zinc-950/80
          backdrop-blur-xl
        "
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <div
                className="
                  flex items-center justify-center
                  w-9 h-9 rounded-xl
                  bg-amber-500/10
                  border border-amber-500/20
                "
              >
                <Terminal className="w-4 h-4 text-amber-400" />
              </div>

              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">
                  SNX Portfolio
                </p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Full Stack Dev
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `
                    px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-amber-500/10 text-amber-400"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }
                  `
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* CTA */}
            <Link
              to="/contact"
              className="
                hidden md:inline-flex
                items-center gap-2
                rounded-xl
                bg-amber-500
                px-4 py-2
                text-sm font-medium
                text-black
                hover:bg-amber-400
                transition
              "
            >
              Let's Talk
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="
                md:hidden
                flex items-center justify-center
                w-10 h-10
                rounded-lg
                border border-zinc-800
                text-zinc-300
              "
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden
              border-b border-zinc-800
              bg-zinc-950
              overflow-hidden
            "
          >
            <div className="px-6 py-4 flex flex-col gap-2">

              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `
                    rounded-xl px-4 py-3 text-sm transition
                    ${
                      isActive
                        ? "bg-amber-500/10 text-amber-400"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }
                  `
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="
                  mt-3
                  flex items-center justify-center gap-2
                  rounded-xl
                  bg-amber-500
                  px-4 py-3
                  text-sm font-medium
                  text-black
                "
              >
                Let's Talk
                <ArrowUpRight className="w-4 h-4" />
              </Link>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}