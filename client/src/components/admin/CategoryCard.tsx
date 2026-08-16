import { Tag, Trash2 } from "lucide-react";

interface CategoryCardProps {
  name: string;
  isDeleting: boolean;
  onDelete: () => void;
}

export default function CategoryCard({
  name,
  isDeleting,
  onDelete,
}: CategoryCardProps) {
  return (
    <div
      className="
        card
        flex-between
        p-4
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-primary/40
      "
    >
      <div className="flex-start min-w-0 gap-3">
        <div className="flex-center h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary">
          <Tag className="h-[18px] w-[18px]" />
        </div>

        <h3 className="truncate text-sm font-semibold text-content">
          {name}
        </h3>
      </div>

      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        aria-label={`Delete ${name}`}
        className="
          flex-center
          h-9 w-9 shrink-0
          rounded-lg
          text-secondary
          transition-colors
          hover:bg-danger/10
          hover:text-danger
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        {isDeleting ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-danger" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}