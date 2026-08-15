import { Pencil, Trash2 } from "lucide-react";

type SkillCardProps = {
  name: string;
  category: string;
  proficiency: "Beginner" | "Intermediate" | "Expert";
  isDeleting?: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

const PROFICIENCY_STYLES = {
  Expert:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  Intermediate:
    "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/20",
  Beginner:
    "bg-zinc-100 text-zinc-700 ring-zinc-500/10 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-400/20",
} as const;

export default function SkillCard({
  name,
  category,
  proficiency,
  isDeleting = false,
  onEdit,
  onDelete,
}: SkillCardProps) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-100" title={name}>
            {name}
          </h3>
          <p className="truncate text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {category}
          </p>
        </div>

        <span
          className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
            PROFICIENCY_STYLES[proficiency]
          }`}
        >
          {proficiency}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-end gap-1.5 border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
        <button
          type="button"
          onClick={onEdit}
          className="btn btn-secondary"
        >
          <Pencil className="h-3.5 w-3.5" />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="btn btn-danger"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </button>
      </div>
    </div>
  );
}
