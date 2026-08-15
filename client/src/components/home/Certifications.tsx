import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import { useCertifications } from "../../hooks/certifications/useCertifications";

export default function Certifications() {
  const {
    data: certifications = [],
    isLoading,
  } = useCertifications();

  if (isLoading) {
    return <p className="text-secondary">Loading...</p>;
  }

  return (
    <section className="container-custom border-t border-border py-24">
      {/* Header */}
      <SectionTitle
        eyebrow="achievements"
        title="Certifications"
        description="Professional courses and verified achievements"
      />

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            className="
              group
              card
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-primary
            "
          >
            {/* Issuer */}
            <div className="mb-3 flex items-center gap-2">
              <Award size={18} className="text-primary" />

              <span className="text-sm font-medium text-secondary">
                {cert.issuer}
              </span>
            </div>

            {/* Name */}
            <h3 className="mb-1 text-lg font-semibold text-content transition-colors group-hover:text-primary">
              {cert.name}
            </h3>

            {/* Date */}
            <p className="mb-4 text-sm text-secondary">
              Completed: {cert.issueDate}
            </p>

            {/* Link */}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-secondary transition-colors hover:text-primary"
              >
                <span className="border-b border-transparent hover:border-primary">
                  View Certificate
                </span>

                <ExternalLink size={14} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}