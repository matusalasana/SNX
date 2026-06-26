const stats = [
  { label: "Projects Built", value: "15+" },
  { label: "Years Learning", value: "3+" },
  { label: "Technologies", value: "20+" },
  { label: "Hours Coding", value: "1000+" },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-5xl border-t border-zinc-200 py-24 dark:border-zinc-800">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="
              rounded-2xl
              border border-zinc-200
              bg-white
              p-6
              text-center
              transition-all duration-300
              hover:-translate-y-1
              hover:border-amber-400
              dark:border-zinc-800
              dark:bg-zinc-900
              dark:hover:border-amber-500
            "
          >
            <h3 className="text-3xl font-bold text-amber-500 dark:text-amber-400">
              {stat.value}
            </h3>

            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}