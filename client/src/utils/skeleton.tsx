type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-800/70 ${className}`}
    />
  );
}