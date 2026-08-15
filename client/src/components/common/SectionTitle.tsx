type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mb-14">
      {eyebrow && (
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-primary to-transparent" />

          <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-content">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}