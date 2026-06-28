import { NavLink } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "../common/LogoutButton"
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Wrench,
  Briefcase,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Projects", to: "/admin/projects", icon: FolderKanban },
  { label: "Blogs", to: "/admin/blogs", icon: FileText },
  { label: "Messages", to: "/admin/messages", icon: MessageSquare },
  { label: "Skills", to: "/admin/skills", icon: Wrench },
  { label: "Experiences", to: "/admin/experiences", icon: Briefcase },
];

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `
    flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
    ${
      isActive
        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
    }
  `;

  return (
    <>
      {/* MOBILE TOP BAR */}
      <header className="lg:hidden sticky top-0 z-50 h-16 bg-zinc-950/90 backdrop-blur border-b border-zinc-800">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-semibold text-white">Admin Panel</span>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg border border-zinc-800"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 lg:hidden">
          <aside className="w-72 h-full bg-zinc-950 border-r border-zinc-800 p-4">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-amber-400 font-bold">Admin Panel</h2>

              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* NAV */}
            <nav className="space-y-2">
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
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* LOGOUT */}
            <LogoutButton />
          </aside>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col bg-zinc-950 border-r border-zinc-800">
        {/* BRAND */}
        <div className="h-20 flex items-center px-6 border-b border-zinc-800">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">
              Portfolio CMS
            </p>
            <h1 className="text-xl font-bold text-amber-400">
              Admin Panel
            </h1>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}
        <LogoutButton />
      </aside>
    </>
  );
}