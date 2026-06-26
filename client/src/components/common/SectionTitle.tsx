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
          <div className="h-px w-10 bg-gradient-to-r from-amber-500 to-transparent" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-amber-500">
            {eyebrow}
          </span>
        </div>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}