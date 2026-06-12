import {
  Users,
  FolderOpen,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

import { useState } from "react";

const sidebarLinks = [
  { name: "Overview", icon: BarChart3 },
  { name: "Users", icon: Users },
  { name: "Projects", icon: FolderOpen },
  { name: "Posts", icon: FileText },
  { name: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("Overview");

  const stats = [
    { label: "Total Users", value: "1,248", icon: Users },
    { label: "Projects", value: "86", icon: FolderOpen },
    { label: "Blog Posts", value: "34", icon: FileText },
    { label: "Growth", value: "+12%", icon: BarChart3 },
  ];

  const users = [
    { name: "John Doe", email: "john@example.com", role: "Admin" },
    { name: "Sara Ali", email: "sara@example.com", role: "Editor" },
    { name: "Mike Ross", email: "mike@example.com", role: "User" },
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/10 bg-[#0b1220] hidden md:flex flex-col">
        
        <div className="p-6 text-2xl font-black">
          SNX<span className="text-cyan-400"> Admin</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  active === item.name
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex w-full items-center gap-3 text-slate-300 hover:text-red-400">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <section className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          
          <h1 className="text-xl font-bold">{active}</h1>

          <div className="flex items-center gap-4">

            <div className="relative hidden md:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                placeholder="Search..."
                className="rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm outline-none focus:border-cyan-400"
              />
            </div>

            <div className="h-10 w-10 rounded-full bg-cyan-500/20" />
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-6 space-y-6">

          {/* STATS */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;

              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="text-cyan-400" size={20} />
                    <span className="text-xs text-slate-400">
                      Today
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold">
                    {s.value}
                  </h2>

                  <p className="text-sm text-slate-400">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* TABLE + ACTIVITY */}
          <div className="grid gap-6 lg:grid-cols-3">

            {/* USERS TABLE */}
            <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-lg font-bold">
                Recent Users
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-slate-400">
                    <tr>
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Role</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u.email}
                        className="border-t border-white/10"
                      >
                        <td className="py-3">{u.name}</td>
                        <td className="py-3 text-slate-400">
                          {u.email}
                        </td>
                        <td className="py-3">
                          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ACTIVITY */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-lg font-bold">
                Activity
              </h2>

              <div className="space-y-4 text-sm text-slate-400">
                <p>✔ New user registered</p>
                <p>✔ Project deployed</p>
                <p>✔ Blog post published</p>
                <p>✔ Database backup completed</p>
              </div>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}