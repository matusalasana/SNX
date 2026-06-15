// Home.tsx
import React, { useEffect, useRef, useState } from 'react';
import { 
  Terminal, 
  ArrowRight, 
  Download, 
  ChevronRight,
  Layers, 
  Database, 
  Mail,
  ChevronUp,
  Github,
  Linkedin,
  FileText,
  Sparkles
} from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const Home: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLElement>(null);
  
  // Parallax effect for grid
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBackToTop(latest > 500);
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      title: "Quantum Analytics Engine",
      description: "Real-time data processing and visualization for enterprise IoT networks.",
      tags: ["TypeScript", "Three.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      gradient: "from-surface-container-lowest"
    },
    {
      title: "CoreShield OS",
      description: "A lightweight, security-first runtime for decentralized edge computing.",
      tags: ["Rust", "WebAssembly"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      gradient: "from-surface-container-lowest"
    }
  ];

  const blogPosts = [
    { date: "MAR 12, 2024", title: "Optimizing Next.js for WebGL Performance" },
    { date: "FEB 28, 2024", title: "Architecture: Building Scalable Microservices with Go" }
  ];

  const skills = {
    frontend: ["React/Next.js", "Tailwind CSS", "TypeScript", "Three.js"],
    backend: ["Node.js", "Go-lang", "PostgreSQL", "Redis"],
    tools: ["Docker", "Kubernetes", "CI-CD"]
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden relative">
      {/* Animated Grid Background */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: `
            linear-gradient(to right, rgba(192, 193, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(192, 193, 255, 0.05) 1px, transparent 1px)
          `,
          x: mousePosition.x,
          y: mousePosition.y,
          transition: "transform 0.1s ease-out"
        }}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30"
      >
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 max-w-container-max mx-auto">
          <motion.div 
            className="font-headline-md text-headline-md font-bold text-on-surface cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('hero')}
          >
            SNX
          </motion.div>
          
          <div className="hidden md:flex items-center gap-lg">
            {['projects', 'skills', 'blog', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors capitalize"
              >
                {section}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-md">
            <motion.button 
              className="text-on-surface-variant hover:text-primary transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Terminal size={24} />
            </motion.button>
            <motion.button 
              className="bg-primary text-on-primary px-sm py-xs rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section 
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden px-margin-mobile pt-16"
        >
          <div className="absolute inset-0 hero-gradient pointer-events-none"></div>
          
          <motion.div 
            className="relative z-10 text-center max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full mb-md"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">Available for new projects</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface mb-sm"
            >
              SNX / Creative Developer <br className="hidden md:block"/> &amp; Architect
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-lg"
            >
              Crafting high-performance digital experiences with a focus on technical precision and premium SaaS aesthetics.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col md:flex-row gap-md justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-lg py-sm bg-primary text-on-primary rounded-xl font-label-md text-label-md flex items-center justify-center gap-xs hover:bg-primary-container transition-all group cursor-pointer"
                onClick={() => scrollToSection('projects')}
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-lg py-sm border border-outline-variant text-on-surface rounded-xl font-label-md text-label-md hover:bg-surface-variant/30 transition-all flex items-center justify-center gap-xs group"
              >
                Read Resume
                <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-sm">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Selected Works</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Engineering solutions for complex problems.</p>
            </div>
            <button className="font-label-md text-label-md text-primary flex items-center gap-xs group">
              View Archive <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group relative aspect-video rounded-xl overflow-hidden border border-outline-variant bg-surface-container-low hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 p-lg w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-xs mb-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="font-label-sm text-label-sm px-xs py-1 rounded bg-surface-variant/80 text-primary border border-outline-variant">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{project.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-xl bg-surface-container-low scroll-mt-20">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xl">Technical Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {[
                { icon: Layers, title: "Frontend", skills: skills.frontend, color: "text-primary" },
                { icon: Database, title: "Backend", skills: skills.backend, color: "text-secondary" },
                { icon: Terminal, title: "Tools", skills: skills.tools, color: "text-tertiary" }
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-lg rounded-xl border border-outline-variant bg-surface-container flex flex-col gap-md hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center gap-sm">
                    <category.icon className={category.color} size={24} />
                    <h3 className="font-headline-md text-headline-md">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-xs">
                    {category.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full font-label-sm text-label-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto scroll-mt-20">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xl">Technical Writing</h2>
          <div className="flex flex-col border-t border-outline-variant">
            {blogPosts.map((post, idx) => (
              <motion.a
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="group py-lg border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-md hover:bg-surface-variant/10 transition-colors px-md -mx-md cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm text-primary">{post.date}</span>
                  <h3 className="font-headline-md text-headline-md group-hover:text-primary transition-colors">{post.title}</h3>
                </div>
                <ChevronRight size={20} className="text-on-surface-variant group-hover:translate-x-2 transition-transform" />
              </motion.a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-xl mb-xl px-margin-mobile md:px-margin-desktop scroll-mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-container-max mx-auto glass-card rounded-2xl p-xl flex flex-col items-center text-center gap-lg border border-primary/20 relative overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
            
            <Sparkles className="text-primary w-12 h-12" />
            <h2 className="font-headline-xl-mobile md:font-headline-lg text-headline-xl-mobile md:text-headline-lg">Let's Build Something Together</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              I am currently open to freelance opportunities, contract roles, or collaborating on open-source projects.
            </p>
            <div className="flex gap-md">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-on-primary px-xl py-sm rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all"
              >
                Send a Message
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-xl hover:bg-surface-variant/30 transition-all"
              >
                <Mail size={24} />
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-dim border-t border-outline-variant py-xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-md max-w-container-max mx-auto">
          <div className="flex flex-col gap-xs items-center md:items-start">
            <div className="font-label-md text-label-md font-bold text-on-surface">SNX Portfolio</div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">© 2024 SNX Portfolio. Engineered for performance.</p>
          </div>
          <div className="flex gap-lg">
            {[
              { icon: Github, label: "Github" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: FileText, label: "Resume" }
            ].map((item, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.1, y: -2 }}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-1 cursor-pointer"
              >
                <item.icon size={16} />
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary rounded-full flex items-center justify-center z-50 hover:bg-primary hover:text-on-primary group shadow-lg shadow-primary/10 cursor-pointer"
        onClick={scrollToTop}
      >
        <ChevronUp size={24} className="transition-transform group-hover:-translate-y-1" />
      </motion.button>
    </div>
  );
};

export default Home;