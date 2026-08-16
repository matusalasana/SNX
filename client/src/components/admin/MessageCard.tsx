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
    <article className="card transition-default hover:-translate-y-0.5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-secondary">
            <User size={20} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-content">
              {name}
            </h3>

            <p className="truncate text-xs text-secondary">
              {email}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onView}
            aria-label="View message"
            className="btn-ghost h-9 w-9 p-0 text-secondary hover:text-primary"
          >
            <Eye size={18} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            aria-label="Delete message"
            className="btn-ghost h-9 w-9 p-0 text-secondary hover:text-danger"
          >
            {isDeleting ? (
              <span className="block size-4 animate-spin rounded-full border-2 border-border border-t-danger" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Message Preview */}
      <div className="space-y-1 border-t border-border pt-3">
        <h4 className="truncate-1 text-sm font-medium text-content">
          {subject}
        </h4>

        <p className="truncate-2 text-xs leading-relaxed text-secondary">
          {message}
        </p>
      </div>
    </article>
  );
}