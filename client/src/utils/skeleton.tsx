type SkeletonProps = {
  className?: string;
};

export const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`skeleton ${className}`}
      aria-hidden="true"
    />
  );
};