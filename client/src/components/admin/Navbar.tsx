import { NavLink } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "../common/LogoutButton";
import ThemeToggle from "../common/ThemeToggle";

import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Wrench,
  Briefcase,
  Menu,
  Award,
  Tag,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Projects", to: "/admin/projects", icon: FolderKanban },
  { label: "Blogs", to: "/admin/blogs", icon: FileText },
  { label: "Messages", to: "/admin/messages", icon: MessageSquare },
  { label: "Skills", to: "/admin/skills", icon: Wrench },
  { label: "Experiences", to: "/admin/experiences", icon: Briefcase },
  { label: "Categories", to: "/admin/categories", icon: Tag },
  { label: "Certifications", to: "/admin/certifications", icon: Award },
];

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
      isActive
        ? "border-primary/20 bg-primary/10 text-primary font-medium"
        : "border-transparent text-secondary hover:bg-muted hover:text-content"
    }`;

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur lg:hidden">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary" />

            <span className="heading font-semibold">
              Admin Panel
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-ghost h-10 w-10 p-0"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        >
          <aside
            className="flex h-full w-72 flex-col border-r border-border bg-background p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-6 flex-between items-center">
              <div>
                <p className="subheading text-xs uppercase tracking-widest">
                  Portfolio CMS
                </p>

                <h2 className="heading text-lg font-bold">
                  Admin Panel
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="btn-ghost h-9 w-9 p-0"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    className={linkClass}
                  >
                    <Icon size={17} />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Theme */}
            <div className="flex-between items-center border-t border-border pt-4">
              <span className="subheading text-sm">
                Theme
              </span>

              <ThemeToggle />
            </div>

            {/* Logout */}
            <LogoutButton />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r border-border bg-background lg:flex">
        {/* Brand */}
        <div className="flex h-20 items-center border-b border-border px-6">
          <div>
            <p className="subheading text-xs uppercase tracking-widest">
              Portfolio CMS
            </p>

            <h1 className="heading text-xl font-bold">
              Admin Panel
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Theme */}
        <div className="flex-between items-center border-t border-border p-4">
          <span className="subheading text-sm">
            Theme
          </span>

          <ThemeToggle />
        </div>

        {/* Logout */}
        <LogoutButton />
      </aside>
    </>
  );
}
