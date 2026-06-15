// About.tsx (Minimal Version)
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  Code2,
  Server,
  Database,
  Cloud,
  Layout,
  CheckCircle
} from 'lucide-react';

const About: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const skills = [
    { category: "Frontend", items: ["React/Next.js", "TypeScript", "Tailwind CSS"], icon: <Layout size={16} /> },
    { category: "Backend", items: ["Go", "Node.js", "Python"], icon: <Server size={16} /> },
    { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis"], icon: <Database size={16} /> },
    { category: "DevOps", items: ["Docker", "Kubernetes", "AWS"], icon: <Cloud size={16} /> }
  ];

  const experiences = [
    {
      role: "Senior Software Architect",
      company: "TechCorp Innovations",
      period: "2022 - Present",
      description: "Leading microservices architecture for high-scale systems"
    },
    {
      role: "Lead Full Stack Developer",
      company: "DataStream AI",
      period: "2020 - 2022",
      description: "Built real-time analytics platform processing 50k events/sec"
    },
    {
      role: "Software Engineer",
      company: "CloudScale Solutions",
      period: "2018 - 2020",
      description: "Developed RESTful APIs and maintained backend services"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
              About Me
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl mb-4">
            Creative Developer & 
            <br />
            <span className="text-primary">Software Architect</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            I build high-performance digital solutions with 7+ years of experience 
            in full-stack development and system architecture.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { value: "7+", label: "Years Exp" },
            { value: "50+", label: "Projects" },
            { value: "20+", label: "Clients" },
            { value: "5", label: "Tech Talks" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="font-body-sm text-on-surface-variant">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="font-headline-lg text-headline-lg mb-6 text-center">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  {skillGroup.icon}
                  <h3 className="font-label-md text-label-md">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-surface-variant rounded-lg font-label-sm text-[11px]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <h2 className="font-headline-lg text-headline-lg mb-6 text-center">Work Experience</h2>
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30 hover:border-primary/50 transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <h3 className="font-headline-md text-headline-md">{exp.role}</h3>
                    <p className="font-label-md text-label-md text-primary">{exp.company}</p>
                  </div>
                  <span className="flex items-center gap-1 text-on-surface-variant font-body-sm mt-2 md:mt-0">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                </div>
                <p className="font-body-sm text-on-surface-variant">{exp.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
              <GraduationCap size={20} className="text-primary" />
              Education
            </h2>
            <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30">
              <h3 className="font-label-md text-label-md">Stanford University</h3>
              <p className="font-body-sm text-primary mb-2">M.S. Computer Science</p>
              <p className="font-body-sm text-on-surface-variant">Specialized in Distributed Systems</p>
              <span className="inline-block mt-3 px-2 py-1 bg-surface-variant rounded-lg font-label-sm text-[10px]">
                2016 - 2018
              </span>
            </div>
          </motion.section>

          {/* Achievements */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-headline-md text-headline-md mb-4 flex items-center gap-2">
              <Award size={20} className="text-secondary" />
              Achievements
            </h2>
            <div className="space-y-3">
              {[
                "Open Source Contributor - React & Next.js",
                "Speaker at 5 international conferences",
                "Published 20+ technical articles",
                "Hackathon Winner 2022"
              ].map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
                  <CheckCircle size={16} className="text-secondary flex-shrink-0 mt-0.5" />
                  <span className="font-body-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Contact & Social Links */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center pt-8 border-t border-outline-variant/30"
        >
          <p className="font-body-md text-on-surface-variant mb-4">Interested in working together?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="mailto:hello@snx.dev" className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:bg-primary-container transition-all">
              <Mail size={16} />
              Get in Touch
            </a>
            <a href="#" className="p-2 bg-surface-container border border-outline-variant rounded-lg hover:border-primary transition-all">
              <Github size={18} />
            </a>
            <a href="#" className="p-2 bg-surface-container border border-outline-variant rounded-lg hover:border-primary transition-all">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 bg-surface-container border border-outline-variant rounded-lg hover:border-primary transition-all">
              <Twitter size={18} />
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;