import { Briefcase, Calendar } from "lucide-react";
import { useExperiences } from "../../hooks/experiences/useExperiences";
import { Skeleton } from "../../utils/skeleton";
import SectionTitle from "../common/SectionTitle";

export default function Experiences() {
  const {
    data: experiences = [],
    isLoading,
  } = useExperiences();

  if (isLoading) {
    return (
      <section className="container-custom border-t border-border py-24">
        <SectionTitle
          eyebrow="Career"
          title="Experience"
          description="Professional experience, internships, and impactful projects that shaped my journey as a developer."
        />

        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="card"
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
    <section className="container-custom border-t border-border py-24">
      {/* Heading */}
      <SectionTitle
        eyebrow="Career"
        title="Experience"
        description="Professional experience, internships, and impactful projects that shaped my journey as a developer."
      />

      {/* Timeline */}
      <div className="relative">
        <div className="absolute bottom-0 left-5 top-0 w-px bg-border" />

        <div className="space-y-8">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="relative pl-16"
            >
              {/* Timeline Icon */}
              <div className="absolute left-0 top-1">
                <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Briefcase className="size-4 text-primary" />
                </div>
              </div>

              {/* Card */}
              <div className="card transition-all duration-300 hover:-translate-y-1 hover:border-primary">
                {/* Title */}
                <h3 className="text-xl font-semibold text-content">
                  {experience.position}
                </h3>

                {/* Company */}
                <p className="mt-1 font-medium text-primary">
                  {experience.company}
                </p>

                {/* Date */}
                <div className="mt-3 flex items-center gap-2 text-sm text-secondary">
                  <Calendar className="size-4" />
                  <span>{experience.duration}</span>
                </div>

                {/* Description */}
                <p className="mt-4 leading-relaxed text-secondary">
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