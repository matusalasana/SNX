import SectionTitle from "../common/SectionTitle";

const work = [
  "SNX Portfolio CMS (Full-stack)",
  "Improving system design skills",
  "Exploring Docker & CI/CD",
  "AI integrations with web apps",
];

export default function CurrentlyWorking() {
  return (
    <section className="container-custom border-t border-border py-24">
      {/* Header */}
      <SectionTitle
        eyebrow="Now"
        title="Currently Working On"
        description="What I'm building and learning right now."
      />

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {work.map((item, index) => (
          <div
            key={index}
            className="card transition-all duration-300 hover:-translate-y-1 hover:border-primary"
          >
            <p className="text-content">
              {item}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}