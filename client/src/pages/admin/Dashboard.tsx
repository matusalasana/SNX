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
    <main className="container-custom section min-h-screen bg-background text-content">
      <div className="mx-auto space-y-12">

        {/* Header */}
        <div>
          <h1 className="heading text-3xl font-bold">
            Admin Dashboard
          </h1>
          <p className="subheading mt-2 text-sm">
            Manage your portfolio content and track activity.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="card p-6"
              >
                <div className="flex-between items-center mb-4">
                  <Icon className="w-5 h-5 text-secondary" />
                </div>

                <h2 className="heading text-2xl font-bold">
                  {stat.value}
                </h2>

                <p className="subheading text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Projects */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <FolderKanban className="text-secondary w-5 h-5" />
              <h3 className="heading font-semibold">Projects</h3>
            </div>

            <p className="subheading text-sm mb-4">
              Add, update, or manage your portfolio projects.
            </p>

            <button className="btn-primary text-sm">
              Manage Projects
            </button>
          </div>

          {/* Blogs */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-secondary w-5 h-5" />
              <h3 className="heading font-semibold">Blogs</h3>
            </div>

            <p className="subheading text-sm mb-4">
              Write, edit, and publish articles.
            </p>

            <button className="btn-primary text-sm">
              Manage Blogs
            </button>
          </div>

          {/* Skills */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="text-secondary w-5 h-5" />
              <h3 className="heading font-semibold">Skills</h3>
            </div>

            <p className="subheading text-sm mb-4">
              Update your technical stack.
            </p>

            <button className="btn-primary text-sm">
              Manage Skills
            </button>
          </div>

          {/* Experience */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="text-secondary w-5 h-5" />
              <h3 className="heading font-semibold">Experience</h3>
            </div>

            <p className="subheading text-sm mb-4">
              Add internships, roles, and work history.
            </p>

            <button className="btn-primary text-sm">
              Manage Experience
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
