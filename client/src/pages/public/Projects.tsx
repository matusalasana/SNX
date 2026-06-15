// Projects.tsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Search, 
  ExternalLink, 
  ChevronDown,
  Github,
  Linkedin,
  Twitter,
  FileText,
  Sparkles
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  type: 'System Core' | 'Interface' | 'Infrastructure' | 'DevOps' | 'Tools' | 'Security';
  color: string;
}

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const techStack = ['All', 'React', 'TypeScript', 'Node.js', 'Rust', 'Next.js'];
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Nexus Data Engine",
      description: "High-throughput data processing pipeline capable of handling 50k events/sec with sub-millisecond latency.",
      category: "System Core",
      tags: ["RUST", "GRPC", "KAFKA"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      type: "System Core",
      color: "text-secondary"
    },
    {
      id: 2,
      title: "Luminal Analytics",
      description: "Cloud-native visualization platform featuring advanced real-time telemetry and predictive forecasting.",
      category: "Interface",
      tags: ["NEXTJS", "TYPESCRIPT", "D3.JS"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      type: "Interface",
      color: "text-tertiary"
    },
    {
      id: 3,
      title: "Orbit Ledger",
      description: "Scalable distributed ledger implementation optimized for secure, cross-chain enterprise transactions.",
      category: "Infrastructure",
      tags: ["GO", "SOLIDITY", "DOCKER"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
      type: "Infrastructure",
      color: "text-primary"
    },
    {
      id: 4,
      title: "Prism Deploy",
      description: "Automated CI/CD orchestration engine for containerized microservices across hybrid cloud providers.",
      category: "DevOps",
      tags: ["KUBERNETES", "TERRAFORM", "AWS"],
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop",
      type: "DevOps",
      color: "text-secondary"
    },
    {
      id: 5,
      title: "Syntax Forge",
      description: "Extensible code generation toolkit and custom CLI for streamlining boilerplate in large-scale monorepos.",
      category: "Tools",
      tags: ["TYPESCRIPT", "NODE.JS", "SHELL"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      type: "Tools",
      color: "text-tertiary"
    },
    {
      id: 6,
      title: "Aegis Vault",
      description: "Zero-trust credential management system with hardware-accelerated encryption and audit trails.",
      category: "Security",
      tags: ["PYTHON", "REDIS", "POSTGRES"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      type: "Security",
      color: "text-primary"
    },
    {
      id: 7,
      title: "Quantum Mesh",
      description: "Distributed computing framework for complex event processing and real-time anomaly detection.",
      category: "System Core",
      tags: ["ELIXIR", "RABBITMQ", "MONGODB"],
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop",
      type: "System Core",
      color: "text-secondary"
    },
    {
      id: 8,
      title: "Aether UI",
      description: "Component library with advanced theming and runtime performance optimization tools.",
      category: "Interface",
      tags: ["REACT", "TAILWIND", "STORYBOOK"],
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
      type: "Interface",
      color: "text-tertiary"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = selectedTech === 'All' || 
                        project.tags.some(tag => tag.toLowerCase().includes(selectedTech.toLowerCase()));
    return matchesSearch && matchesTech;
  });

  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMore = visibleProjects < filteredProjects.length;

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, filteredProjects.length));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md relative overflow-x-hidden">
      {/* Animated background gradient that follows mouse */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(192, 193, 255, 0.15) 0%, transparent 50%)`
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />

      {/* TopNavBar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30"
      >
        <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 max-w-container-max mx-auto">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="font-headline-md text-headline-md font-bold text-on-surface cursor-pointer"
          >
            SNX
          </motion.div>
          
          <div className="hidden md:flex gap-md items-center">
            {['Projects', 'Experience', 'Skills', 'Contact'].map((item) => (
              <motion.a
                key={item}
                whileHover={{ scale: 1.05 }}
                className={`font-label-md text-label-md ${item === 'Projects' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-primary transition-colors'} cursor-pointer`}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-sm">
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="text-primary"
            >
              <Terminal size={24} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-on-primary-container px-md py-xs rounded-full font-label-md hover:brightness-110 transition-all"
            >
              Hire Me
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <main className="flex-grow pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative z-10">
        {/* Header Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-xl"
        >
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-surface mb-sm">
            Engineered Solutions / <span className="text-primary">Selected Works</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            A showcase of high-performance architectural systems, cloud-native platforms, and sophisticated developer tools built for the modern web.
          </p>
        </motion.section>

        {/* Filters & Search */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-lg flex flex-col md:flex-row md:items-center justify-between gap-md"
        >
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm text-on-surface placeholder:text-outline"
              placeholder="Search repositories..."
            />
          </div>
          
          <div className="flex flex-wrap gap-xs items-center">
            <span className="font-label-sm text-label-sm text-outline mr-2">TECH STACK:</span>
            {techStack.map((tech) => (
              <motion.button
                key={tech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTech(tech)}
                className={`px-sm py-1 rounded-full font-label-sm transition-colors ${
                  selectedTech === tech 
                    ? 'bg-primary-container/20 text-primary border border-primary/30' 
                    : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:border-primary/50'
                }`}
              >
                {tech}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Project Grid */}
        <motion.section 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter"
        >
          <AnimatePresence>
            {displayedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="aspect-video overflow-hidden relative">
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                    src={project.image}
                    alt={project.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-60" />
                </div>
                
                <div className="p-md flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-xs">
                    <span className={`font-label-sm text-label-sm ${project.color} tracking-widest uppercase`}>
                      {project.type}
                    </span>
                    <ExternalLink size={16} className="text-outline opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">{project.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-md line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto flex flex-wrap gap-xs">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 bg-surface-variant text-on-surface-variant rounded font-label-sm text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {/* Pagination */}
        {filteredProjects.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-xl flex flex-col items-center gap-md"
          >
            {hasMore && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMore}
                className="px-lg py-sm bg-surface-container border border-outline-variant/50 text-on-surface rounded-xl font-label-md hover:bg-surface-variant/50 hover:border-primary transition-all active:scale-95 flex items-center gap-sm"
              >
                <span>Load More Projects</span>
                <ChevronDown size={18} />
              </motion.button>
            )}
            <p className="font-body-sm text-body-sm text-outline">
              Showing {displayedProjects.length} of {filteredProjects.length} engineering projects
            </p>
          </motion.div>
        )}

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Sparkles className="text-primary w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="font-body-lg text-on-surface-variant">No projects found matching your criteria.</p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-surface-dim border-t border-outline-variant py-xl mt-xl relative z-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-md max-w-container-max mx-auto">
          <div className="flex flex-col gap-xs items-center md:items-start">
            <span className="font-label-md text-label-md font-bold text-on-surface">SNX Portfolio</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">© 2024 SNX Portfolio. Engineered for performance.</span>
          </div>
          <div className="flex gap-md">
            {[
              { icon: Github, label: "Github" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Twitter, label: "Twitter" },
              { icon: FileText, label: "Resume" }
            ].map((item) => (
              <motion.a
                key={item.label}
                whileHover={{ scale: 1.1, y: -2 }}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors duration-200 flex items-center gap-1 cursor-pointer"
              >
                <item.icon size={14} />
                {item.label}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Projects;