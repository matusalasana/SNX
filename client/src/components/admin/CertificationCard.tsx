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
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Award size={22} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-content">
              {name}
            </h3>

            <p className="mt-1 text-sm text-secondary">
              {issuer}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="
              rounded-lg p-2 text-secondary
              transition-colors
              hover:bg-muted hover:text-primary
            "
            aria-label="Edit certification"
          >
            <Edit size={17} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="
              rounded-lg p-2 text-secondary
              transition-colors
              hover:bg-danger/10 hover:text-danger
              disabled:cursor-not-allowed disabled:opacity-50
            "
            aria-label="Delete certification"
          >
            {isDeleting ? (
              <span className="block size-[17px] animate-spin rounded-full border-2 border-border border-t-danger" />
            ) : (
              <Trash2 size={17} />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span className="badge">
          Issued {issueDate}
        </span>

        {credentialId && (
          <span className="badge">
            ID: {credentialId}
          </span>
        )}
      </div>

      {description && (
        <p className="truncate-2 mt-4 text-sm leading-6 text-secondary">
          {description}
        </p>
      )}

      {credentialUrl && (
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          View credential
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}