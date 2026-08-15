import {
  Code2,
  Server,
  Database,
  Cloud,
  Terminal,
} from "lucide-react";

import { useSkills } from "../../hooks/skills/useSkills";
import { useCategories } from "../../hooks/categories/useCategories";
import { Skeleton } from "../../utils/skeleton";
import SectionTitle from "../common/SectionTitle";

const categoryIcons = [
  Code2,
  Server,
  Database,
  Cloud,
  Terminal,
];

export default function Skills() {
  const {
    data: skills = [],
    isLoading: loadingSkills,
  } = useSkills();

  const {
    data: categories = [],
    isLoading: loadingCats,
  } = useCategories();

  if (loadingSkills || loadingCats) {
    return (
      <section className="container-custom border-t border-border py-24">
        {/* Heading Skeleton */}
        <div className="mb-14">
          <Skeleton className="mb-4 h-4 w-24" />
          <Skeleton className="mb-4 h-10 w-64" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="card"
            >
              <div className="mb-5 flex items-center gap-3">
                <Skeleton className="size-10 rounded-xl" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-24 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
                <Skeleton className="h-8 w-28 rounded-lg" />
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>
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
        eyebrow="Expertise"
        title="Technical Stack"
        description="Technologies I use to build modern web applications, scalable APIs, and production-ready systems."
      />

      {/* Categories */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const categorySkills = skills.filter(
            (skill) =>
              skill.category.toLowerCase() ===
              category.name.toLowerCase()
          );

          if (!categorySkills.length) return null;

          const Icon =
            categoryIcons[index % categoryIcons.length];

          return (
            <div
              key={category.id}
              className="card transition-all duration-300 hover:-translate-y-1 hover:border-primary"
            >
              {/* Header */}
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold text-content">
                    {category.name}
                  </h3>

                  <p className="text-xs text-secondary">
                    {categorySkills.length} technologies
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="
                      rounded-lg
                      border border-border
                      bg-muted
                      px-3 py-1.5
                      text-xs font-medium
                      text-secondary
                      transition-colors
                      hover:border-primary/30
                      hover:text-primary
                    "
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}