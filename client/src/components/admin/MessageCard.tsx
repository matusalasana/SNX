import { Eye, Trash2, User } from "lucide-react";

interface MessageCardProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  isDeleting: boolean;
  onView: () => void;
  onDelete: () => void;
}

export default function MessageCard({
  name,
  email,
  subject,
  message,
  isDeleting,
  onView,
  onDelete,
}: MessageCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header: User Info & Actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-amber-400">
            <User size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {name}
            </h3>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {email}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onView}
            aria-label="View message"
            className="btn btn-outline p-2"
          >
            <Eye size={18} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            aria-label="Delete message"
            className="btn btn-danger p-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <span className="block h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-red-500" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Body: Subject & Content Preview */}
      <div className="space-y-1 pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
        <h4 className="line-clamp-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {subject}
        </h4>
        <p className="line-clamp-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {message}
        </p>
      </div>
    </article>
  );
}
