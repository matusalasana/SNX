const skills = {
  Frontend: ["React", "Next.js", "Tailwind", "Three.js"],
  Backend: ["Node.js", "Go", "PostgreSQL", "Redis"],
  DevOps: ["Docker", "Kubernetes", "Terraform", "CI/CD"],
};

export default function Skills() {
  return (
    <section className="bg-[#1b1b23] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Technical Stack</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([key, value]) => (
            <div key={key} className="p-6 border border-white/10 rounded-xl">
              <h3 className="text-xl mb-4">{key}</h3>

              <div className="flex flex-wrap gap-2">
                {value.map((v) => (
                  <span
                    key={v}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}