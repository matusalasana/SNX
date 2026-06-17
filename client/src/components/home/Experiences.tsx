import { Briefcase, Calendar } from "lucide-react";
import { useExperiences } from "../../hooks/experiences/useExperiences";
import { Skeleton } from "../../utils/skeleton";

export default function Experiences() {
  const { data: experiences = [], isLoading } = useExperiences();

  if (isLoading) {
    return (
      <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
        <div className="mb-14">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800/60 p-6"
            >
              <Skeleton className="h-5 w-40 mb-3" />
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
      {/* Heading */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Career
          </span>
        </div>

        <h2 className="text-3xl font-bold text-white tracking-tight">
          Experience
        </h2>

        <p className="mt-3 text-zinc-400 max-w-2xl">
          Professional experience, internships, and impactful projects
          that shaped my journey as a developer.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-zinc-800" />

        <div className="space-y-8">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="relative pl-16 group"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 top-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-amber-500/20 bg-amber-500/10">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                </div>
              </div>

              {/* Card */}
              <div
                className="
                  relative overflow-hidden
                  rounded-2xl
                  border border-zinc-800/60
                  bg-zinc-900/20
                  backdrop-blur-xl
                  p-6
                  transition-all duration-300
                  hover:border-amber-500/30
                  hover:-translate-y-1
                  hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]
                "
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl" />
                </div>

                <div className="relative">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white">
                    {experience.position}
                  </h3>

                  {/* Company */}
                  <p className="mt-1 text-amber-400 font-medium">
                    {experience.company}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 mt-3 text-sm text-zinc-500">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {experience.duration}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-zinc-400 leading-relaxed">
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}