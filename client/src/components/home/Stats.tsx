const stats = [
  { label: "Projects Built", value: "15+" },
  { label: "Years Learning", value: "3+" },
  { label: "Technologies", value: "20+" },
  { label: "Hours Coding", value: "1000+" },
];

export default function Stats() {
  return (
    <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-800/60 bg-zinc-900/20 p-6 text-center hover:border-amber-500/30 transition"
          >
            <h3 className="text-3xl font-bold text-amber-400">
              {stat.value}
            </h3>
            <p className="text-sm text-zinc-400 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}