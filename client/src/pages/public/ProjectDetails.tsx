import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Layers3,
} from "lucide-react";
import { useProject } from "../../hooks/projects/useProject";
import { Skeleton } from "../../utils/skeleton";


export default function ProjectDetails() {
  const { id } = useParams();

  const { data: project, isLoading } = useProject(id!);

  if (isLoading) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-24">
        <Skeleton className="h-10 w-40 mb-8" />
        <Skeleton className="h-14 w-96 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mb-8" />
        <Skeleton className="h-[400px] w-full rounded-3xl" />
      </section>
    );
  }

  if (!project) {
    return (
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-white">
          Project not found
        </h1>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      {/* Back */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Hero */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 mb-4">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />
          Featured Project
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white">
          {project.title}
        </h1>

        <p className="mt-5 text-lg text-zinc-400 max-w-3xl">
          {project.description}
        </p>
      </div>

      {/* Thumbnail */}
      {project.thumbnailUrl && (
        <div className="mb-14 overflow-hidden rounded-3xl border border-zinc-800">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>
      )}

      {/* Metadata */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        <div className="rounded-2xl border border-zinc-800 p-5 bg-zinc-900/20">
          <Calendar className="w-5 h-5 text-amber-400 mb-3" />
          <p className="text-zinc-500 text-sm">Created</p>
          <p className="text-white">
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 p-5 bg-zinc-900/20">
          <Layers3 className="w-5 h-5 text-amber-400 mb-3" />
          <p className="text-zinc-500 text-sm">Category</p>
          <p className="text-white">{project.category}</p>
        </div>

        <div className="rounded-2xl border border-zinc-800 p-5 bg-zinc-900/20">
          <Github className="w-5 h-5 text-amber-400 mb-3" />
          <p className="text-zinc-500 text-sm">Status</p>
          <p className="text-white">
            {project.featured ? "Featured" : "Standard"}
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="mb-14">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Overview
        </h2>

        <div className="prose prose-invert max-w-none">
          <p className="text-zinc-400 leading-relaxed">
            {project.content}
          </p>
        </div>
      </div>

      {/* Technologies */}
      {project.technologies?.length > 0 && (
        <div className="mb-14">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="
                  px-4 py-2
                  rounded-xl
                  border border-zinc-800
                  bg-zinc-900/40
                  text-zinc-300
                  hover:border-amber-500/30
                  hover:text-amber-300
                  transition
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-xl
              bg-amber-500 text-black
              font-medium
              hover:bg-amber-400
              transition
            "
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-xl
              border border-zinc-700
              text-white
              hover:border-amber-500/40
              transition
            "
          >
            <Github className="w-4 h-4" />
            Source Code
          </a>
        )}
      </div>
    </section>
  );
}