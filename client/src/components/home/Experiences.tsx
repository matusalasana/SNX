import { Briefcase, Calendar } from "lucide-react";
import { useExperiences } from "../../hooks/experiences/useExperiences";
import { Skeleton } from "../../utils/skeleton";
import SectionTitle from "../common/SectionTitle";

export default function Experiences() {
  const { data: experiences = [], isLoading } = useExperiences();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-5xl border-t border-zinc-200 py-24 dark:border-zinc-800">
        <SectionTitle
          eyebrow="Career"
          title="Experience"
          description="Professional experience, internships, and impactful projects that shaped my journey as a developer."
        />

        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <Skeleton className="mb-3 h-5 w-40" />
              <Skeleton className="mb-4 h-4 w-32" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl border-t border-zinc-200 py-24 dark:border-zinc-800">
      {/* Heading */}
      <SectionTitle
        eyebrow="Career"
        title="Experience"
        description="Professional experience, internships, and impactful projects that shaped my journey as a developer."
      />

      {/* Timeline */}
      <div className="relative">
        <div className="absolute bottom-0 left-5 top-0 w-px bg-zinc-200 dark:bg-zinc-800" />

        <div className="space-y-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="relative pl-16">
              {/* Dot */}
              <div className="absolute left-0 top-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200 bg-amber-100 dark:border-amber-500/20 dark:bg-amber-500/10">
                  <Briefcase className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                </div>
              </div>

              {/* Card */}
              <div
                className="
                  rounded-2xl
                  border border-zinc-200
                  bg-white
                  p-6
                  duration-300
                  hover:-translate-y-1
                  hover:border-amber-400
                  dark:border-zinc-800
                  dark:bg-zinc-900
                  dark:hover:border-amber-500
                "
              >
                {/* Title */}
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {experience.position}
                </h3>

                {/* Company */}
                <p className="mt-1 font-medium text-amber-500 dark:text-amber-400">
                  {experience.company}
                </p>

                {/* Date */}
                <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                  <Calendar className="h-4 w-4" />
                  <span>{experience.duration}</span>
                </div>

                {/* Description */}
                <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}