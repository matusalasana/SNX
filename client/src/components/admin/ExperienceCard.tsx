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
    <div className="card transition-default hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        {/* Experience info */}
        <div className="flex min-w-0 gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Briefcase size={21} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-content">
              {role}
            </h3>

            <p className="text-sm font-medium text-primary">
              {company}
            </p>

            <p className="mt-1 text-xs text-secondary">
              {duration}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="btn-ghost h-9 w-9 p-0 text-secondary hover:text-primary"
            aria-label="Edit experience"
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="btn-ghost h-9 w-9 p-0 text-secondary hover:text-danger"
            aria-label="Delete experience"
          >
            {isDeleting ? (
              <span className="block size-[17px] animate-spin rounded-full border-2 border-border border-t-danger" />
            ) : (
              <Trash2 size={17} />
            )}
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-secondary">
        {description}
      </p>
    </div>
  );
}