import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        sticky top-0 z-50
        border-b border-white/10
        backdrop-blur-xl
        bg-black/20
      "
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 font-bold tracking-wide"
        >
          <Terminal size={20} />
          <span>SNX</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="
            hidden md:block
            rounded-full
            border border-primary/20
            bg-primary/10
            px-4 py-2
            text-sm
            hover:bg-primary/20
          "
        >
          Hire Me
        </a>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="
              md:hidden
              overflow-hidden
              border-t border-white/10
              backdrop-blur-xl
              bg-black/30
            "
          >
            <nav className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="
                    py-3
                    text-sm
                    border-b border-white/5
                    hover:text-primary
                  "
                >
                  {item.label}
                </a>
              ))}

              <a
                href="#contact"
                className="
                  mt-4
                  rounded-lg
                  border border-primary/20
                  bg-primary/10
                  px-4 py-3
                  text-center
                "
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;