import {
  FolderKanban,
  BookOpen,
  Code2,
  Briefcase,
  Users,
  TrendingUp,
} from "lucide-react";

import { useProjects } from "../../hooks/projects/useProjects";
import { useBlogs } from "../../hooks/blogs/useBlogs";
import { useSkills } from "../../hooks/skills/useSkills";

export default function AdminDashboard() {
  const { data: projects = [] } = useProjects();
  const { data: blogs = [] } = useBlogs();
  const { data: skills = [] } = useSkills();

  const stats = [
    {
      label: "Projects",
      value: projects.length,
      icon: FolderKanban,
    },
    {
      label: "Blogs",
      value: blogs.length,
      icon: BookOpen,
    },
    {
      label: "Skills",
      value: skills.length,
      icon: Code2,
    },
    {
      label: "Published Blogs",
      value: blogs.filter((b) => b.status === "published").length,
      icon: TrendingUp,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold">
            Admin <span className="text-amber-400">Dashboard</span>
          </h1>
          <p className="text-zinc-400 mt-2">
            Manage your portfolio content and track activity.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  p-6 rounded-2xl
                  border border-zinc-800
                  bg-zinc-900/30
                  hover:border-amber-500/30
                  transition
                "
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>

                <h2 className="text-2xl font-bold">
                  {stat.value}
                </h2>

                <p className="text-zinc-400 text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Projects */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 mb-4">
              <FolderKanban className="text-amber-400 w-5 h-5" />
              <h3 className="font-semibold">Projects</h3>
            </div>

            <p className="text-zinc-400 text-sm mb-4">
              Add, update, or manage your portfolio projects.
            </p>

            <button className="px-4 py-2 rounded-xl bg-amber-500 text-black text-sm hover:bg-amber-400 transition">
              Manage Projects
            </button>
          </div>

          {/* Blogs */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-amber-400 w-5 h-5" />
              <h3 className="font-semibold">Blogs</h3>
            </div>

            <p className="text-zinc-400 text-sm mb-4">
              Write, edit, and publish articles.
            </p>

            <button className="px-4 py-2 rounded-xl bg-amber-500 text-black text-sm hover:bg-amber-400 transition">
              Manage Blogs
            </button>
          </div>

          {/* Skills */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="text-amber-400 w-5 h-5" />
              <h3 className="font-semibold">Skills</h3>
            </div>

            <p className="text-zinc-400 text-sm mb-4">
              Update your technical stack.
            </p>

            <button className="px-4 py-2 rounded-xl bg-amber-500 text-black text-sm hover:bg-amber-400 transition">
              Manage Skills
            </button>
          </div>

          {/* Experience */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/20">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="text-amber-400 w-5 h-5" />
              <h3 className="font-semibold">Experience</h3>
            </div>

            <p className="text-zinc-400 text-sm mb-4">
              Add internships, roles, and work history.
            </p>

            <button className="px-4 py-2 rounded-xl bg-amber-500 text-black text-sm hover:bg-amber-400 transition">
              Manage Experience
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}