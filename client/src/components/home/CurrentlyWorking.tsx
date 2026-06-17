const work = [
  "SNX Portfolio CMS (Full-stack)",
  "Improving system design skills",
  "Exploring Docker & CI/CD",
  "AI integrations with web apps",
];

export default function CurrentlyWorking() {
  return (
    <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">
          Currently Working On
        </h2>
        <p className="text-zinc-400 mt-2">
          What I'm building and learning right now.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {work.map((item, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 hover:border-amber-500/30 transition"
          >
            <p className="text-zinc-200">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}