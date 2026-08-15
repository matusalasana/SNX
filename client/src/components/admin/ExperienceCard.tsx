import { Pencil, Trash2, Briefcase } from "lucide-react";

interface ExperienceCardProps {
  company: string;
  role: string;
  description: string;
  duration: string;
  onDelete: () => void;
  onEdit: () => void;
  isDeleting: boolean;
}

export default function ExperienceCard({
  company,
  role,
  description,
  duration,
  onDelete,
  onEdit,
  isDeleting,
}: ExperienceCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <Briefcase size={21} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {role}
            </h3>

            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
              {company}
            </p>

            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              {duration}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-amber-600 dark:hover:bg-zinc-800 dark:hover:text-amber-400"
            aria-label="Edit experience"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            aria-label="Delete experience"
          >
            {isDeleting ? (
              <span className="block h-[17px] w-[17px] animate-spin rounded-full border-2 border-zinc-300 border-t-red-500" />
            ) : (
              <Trash2 size={17} />
            )}
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </div>
  );
}