import { Edit, Trash2, ExternalLink, Award } from "lucide-react";

interface CertificationCardProps {
  name: string;
  issuer: string;
  description?: string | null;
  issueDate: string;
  credentialId?: string | null;
  credentialUrl?: string | null;
  isDeleting?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CertificationCard({
  name,
  issuer,
  description,
  issueDate,
  credentialId,
  credentialUrl,
  isDeleting = false,
  onEdit,
  onDelete,
}: CertificationCardProps) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
            <Award size={22} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
              {name}
            </h3>

            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {issuer}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-1 transition">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-amber-500 dark:hover:bg-zinc-800"
            aria-label="Edit certification"
          >
            <Edit size={17} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-lg p-2 text-zinc-500 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-500/10"
            aria-label="Delete certification"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          Issued {issueDate}
        </span>

        {credentialId && (
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            ID: {credentialId}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}

      {credentialUrl && (
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-500"
        >
          View credential
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}