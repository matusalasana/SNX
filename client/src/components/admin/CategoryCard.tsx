import { Trash2, Tag } from "lucide-react";

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
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
          <Tag size={19} />
        </div>

        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
          {name}
        </h3>
      </div>

      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        aria-label="Delete category"
      >
        {isDeleting ? (
          <span className="block h-[17px] w-[17px] animate-spin rounded-full border-2 border-zinc-300 border-t-red-500" />
        ) : (
          <Trash2 size={17} />
        )}
      </button>
    </div>
  );
}