import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Wrench,
  Briefcase,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/admin",
  },
  {
    label: "Projects",
    icon: FolderKanban,
    to: "/admin/projects",
  },
  {
    label: "Blogs",
    icon: FileText,
    to: "/admin/blogs",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    to: "/admin/messages",
  },
  {
    label: "Skills",
    icon: Wrench,
    to: "/admin/skills",
  },
  {
    label: "Experience",
    icon: Briefcase,
    to: "/admin/experience",
  },
];

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 h-16 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="h-full px-4 flex items-center justify-between">
          <span className="font-bold text-white">
            Admin Panel
          </span>

          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg border border-zinc-800"
          >
            {open ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/70">
          <aside className="w-72 h-full bg-zinc-950 border-r border-zinc-800 p-4">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-amber-400">
                Admin
              </h2>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-3 px-4 py-3 rounded-xl transition
                      ${
                        isActive
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "text-zinc-400 hover:bg-zinc-900"
                      }
                    `
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside
        className="
          hidden lg:flex
          fixed left-0 top-0
          h-screen w-72
          flex-col
          border-r border-zinc-800
          bg-zinc-950
        "
      >
        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-zinc-800">
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Portfolio CMS
            </p>

            <h1 className="text-xl font-bold text-amber-400">
              Admin Panel
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  px-4 py-3 rounded-xl
                  transition-all
                  ${
                    isActive
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }
                `
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800">
          <button
            className="
              w-full flex items-center gap-3
              px-4 py-3 rounded-xl
              text-red-400
              hover:bg-red-500/10
              transition
            "
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}