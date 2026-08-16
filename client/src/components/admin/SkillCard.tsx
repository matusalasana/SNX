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
  Expert: "badge-success",
  Intermediate: "badge-warning",
  Beginner: "badge",
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
      <div className="flex-between items-start gap-3">
        <div className="min-w-0 space-y-1">
          <h3 className="heading truncate text-base" title={name}>
            {name}
          </h3>
          <p className="subheading truncate text-xs font-medium uppercase tracking-wider">
            {category}
          </p>
        </div>

        <span className={`shrink-0 ${PROFICIENCY_STYLES[proficiency]}`}>
          {proficiency}
        </span>
      </div>

      <div className="flex-end mt-5 gap-1.5 border-t border-border pt-3">
        <button
          type="button"
          onClick={onEdit}
          className="btn-outline"
        >
          <Pencil className="h-3.5 w-3.5" />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="btn-danger"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </button>
      </div>
    </div>
  );
}
