const stats = [
  { label: "Projects Built", value: "15+" },
  { label: "Years Learning", value: "3+" },
  { label: "Technologies", value: "20+" },
  { label: "Hours Coding", value: "1000+" },
];

export default function Stats() {
  return (
    <section className="container-custom border-t border-border py-24">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary"
          >
            <h3 className="text-3xl font-bold text-primary">
              {stat.value}
            </h3>

            <p className="mt-2 text-sm text-secondary">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}