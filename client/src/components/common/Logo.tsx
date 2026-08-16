type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <span
      className={`font-mono text-xl font-bold tracking-tight text-content ${className}`}
    >
      <span className="text-primary">&lt;</span>
      Sana
      <span className="text-primary">/&gt;</span>
    </span>
  );
}
