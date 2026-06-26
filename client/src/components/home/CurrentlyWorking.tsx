import SectionTitle from "../common/SectionTitle";

const work = [
  "SNX Portfolio CMS (Full-stack)",
  "Improving system design skills",
  "Exploring Docker & CI/CD",
  "AI integrations with web apps",
];

export default function CurrentlyWorking() {
  return (
    <section className="mx-auto max-w-5xl border-t border-zinc-200 py-24 dark:border-zinc-800">
      {/* Header */}
      <SectionTitle
        eyebrow="Now"
        title="Currently Working On"
        description="What I'm building and learning right now."
      />

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {work.map((item, i) => (
          <div
            key={i}
            className="
              rounded-2xl
              border border-zinc-200
              bg-white
              p-5
              transition-all duration-300
              hover:-translate-y-1
              hover:border-amber-400
              dark:border-zinc-800
              dark:bg-zinc-900
              dark:hover:border-amber-500
            "
          >
            <p className="text-zinc-700 dark:text-zinc-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}