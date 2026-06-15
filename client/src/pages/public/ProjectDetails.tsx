// ProjectDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Github, 
  ExternalLink,
  CheckCircle,
  XCircle,
  ChevronRight,
  ChevronLeft,
  Code2,
  Server,
  Database,
  Shield,
  Zap,
  Activity,
  Layers,
  Users,
  Star,
  GitBranch,
  Terminal,
  Link2,
  Copy,
  Check,
  Download,
  Figma,
  Twitter,
  Linkedin
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  tags: string[];
  image: string;
  gallery: string[];
  technologies: Technology[];
  features: Feature[];
  metrics: Metric[];
  client: string;
  year: string;
  role: string;
  duration: string;
  githubUrl?: string;
  liveUrl?: string;
  figmaUrl?: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  team: TeamMember[];
}

interface Technology {
  name: string;
  icon: string;
  description: string;
}

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Metric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'challenges' | 'results'>('overview');

  // Sample project data
  const projectsData: Record<number, Project> = {
    1: {
      id: 1,
      title: "Nexus Data Engine",
      description: "High-throughput data processing pipeline capable of handling 50k events/sec with sub-millisecond latency.",
      fullDescription: "Nexus Data Engine is a revolutionary data processing platform designed for real-time analytics at scale. It processes millions of events per second with minimal latency, enabling businesses to make data-driven decisions instantly.",
      category: "System Core",
      tags: ["RUST", "GRPC", "KAFKA", "REDIS", "POSTGRES"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=800&fit=crop"
      ],
      technologies: [
        { name: "Rust", icon: "🦀", description: "Core engine implementation for maximum performance" },
        { name: "gRPC", icon: "🔌", description: "High-performance RPC framework for service communication" },
        { name: "Apache Kafka", icon: "📨", description: "Distributed streaming platform for event processing" },
        { name: "Redis", icon: "⚡", description: "In-memory caching for sub-millisecond responses" },
        { name: "PostgreSQL", icon: "🐘", description: "Persistent storage for processed data" }
      ],
      features: [
        {
          title: "Real-time Processing",
          description: "Process 50,000 events per second with sub-10ms latency",
          icon: <Zap size={24} />
        },
        {
          title: "Horizontal Scaling",
          description: "Scale out across multiple nodes for increased throughput",
          icon: <Layers size={24} />
        },
        {
          title: "Data Partitioning",
          description: "Intelligent data distribution across partitions",
          icon: <Database size={24} />
        },
        {
          title: "Fault Tolerance",
          description: "Automatic failover and data replication",
          icon: <Shield size={24} />
        }
      ],
      metrics: [
        { label: "Events/sec", value: "50K", change: "+200%", trend: "up" },
        { label: "Latency (p99)", value: "8ms", change: "-60%", trend: "down" },
        { label: "Availability", value: "99.99%", change: "+0.5%", trend: "up" },
        { label: "Data Processed", value: "2.5B", change: "+150%", trend: "up" }
      ],
      client: "Enterprise Financial Services",
      year: "2024",
      role: "Lead Systems Architect",
      duration: "6 months",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      figmaUrl: "https://figma.com",
      challenges: [
        "Processing high-velocity data streams without backpressure",
        "Maintaining exactly-once semantics across distributed systems",
        "Optimizing memory usage for large-scale deployments",
        "Ensuring data consistency during partition rebalancing"
      ],
      solutions: [
        "Implemented backpressure-aware streaming with adaptive batching",
        "Used Kafka transactions and idempotent consumers",
        "Designed zero-copy serialization with memory pooling",
        "Built custom partition rebalancing strategy with state migration"
      ],
      results: [
        "Achieved 50K events/second throughput on standard hardware",
        "Reduced operational costs by 40% through efficient resource usage",
        "Improved data processing latency from 50ms to 8ms",
        "Successfully processed over 2.5 billion events in production"
      ],
      team: [
        { name: "Alex Chen", role: "Lead Architect", avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=c0c1ff&color=1000a9" },
        { name: "Sarah Johnson", role: "Backend Engineer", avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=4edea3&color=003824" },
        { name: "Mike Ross", role: "DevOps Engineer", avatar: "https://ui-avatars.com/api/?name=Mike+Ross&background=ffb783&color=4f2500" }
      ]
    },
    2: {
      id: 2,
      title: "Luminal Analytics",
      description: "Cloud-native visualization platform featuring advanced real-time telemetry and predictive forecasting.",
      fullDescription: "Luminal Analytics is a cutting-edge data visualization platform that transforms complex telemetry data into actionable insights with predictive analytics and real-time monitoring capabilities.",
      category: "Interface",
      tags: ["NEXTJS", "TYPESCRIPT", "D3.JS", "WEBSOCKET", "TAILWIND"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop"
      ],
      technologies: [
        { name: "Next.js", icon: "▲", description: "React framework with SSR and ISR" },
        { name: "TypeScript", icon: "📘", description: "Type-safe development" },
        { name: "D3.js", icon: "📊", description: "Data-driven visualizations" },
        { name: "WebSocket", icon: "🔌", description: "Real-time data streaming" }
      ],
      features: [
        {
          title: "Real-time Dashboards",
          description: "Live updating dashboards with WebSocket connections",
          icon: <Activity size={24} />
        },
        {
          title: "Predictive Analytics",
          description: "ML-powered forecasting and anomaly detection",
          icon: <Star size={24} />
        }
      ],
      metrics: [
        { label: "Daily Users", value: "10K", change: "+300%", trend: "up" },
        { label: "Query Time", value: "120ms", change: "-45%", trend: "down" }
      ],
      client: "Tech Startup",
      year: "2024",
      role: "Frontend Architect",
      duration: "4 months",
      githubUrl: "https://github.com",
      liveUrl: "https://example.com",
      challenges: ["Handling large datasets in browser memory", "Smooth animations for 60fps"],
      solutions: ["Implemented virtual scrolling and data sampling", "Used WebGL for hardware acceleration"],
      results: ["50% reduction in load times", "Improved user engagement by 80%"],
      team: [
        { name: "Alex Chen", role: "Lead Architect", avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=c0c1ff&color=1000a9" }
      ]
    }
  };

  useEffect(() => {
    const projectId = parseInt(id || '1');
    const foundProject = projectsData[projectId];
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/projects');
    }
  }, [id, navigate]);

  const nextImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
    }
  };

  const prevImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-primary">Loading project details...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Back Button */}
      <div className="fixed top-24 left-4 md:left-8 z-40">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 px-3 py-2 bg-surface-container/80 backdrop-blur-sm border border-outline-variant rounded-xl hover:border-primary transition-all"
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline font-label-sm">Back to Projects</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-headline-xl text-headline-xl mb-4 max-w-4xl">
              {project.title}
            </h1>

            {/* Description */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mb-8">
              {project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              {project.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-surface-container border border-outline-variant rounded-xl hover:border-primary hover:bg-surface-variant/50 transition-all"
                >
                  <Github size={20} />
                  View Source
                </motion.a>
              )}
              {project.liveUrl && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl hover:bg-primary-container transition-all"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </motion.a>
              )}
              {project.figmaUrl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-surface-container border border-outline-variant rounded-xl hover:border-primary transition-all"
                >
                  <Figma size={20} />
                  Design Files
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop mb-16">
        <div className="relative group">
          <div className="aspect-video rounded-2xl overflow-hidden bg-surface-container-low">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={project.gallery[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          {project.gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-surface/80 backdrop-blur-sm rounded-full hover:bg-primary/20 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-surface/80 backdrop-blur-sm rounded-full hover:bg-primary/20 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="flex justify-center gap-2 mt-4">
                {project.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentImageIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-outline-variant'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Project Info Tabs */}
      <section className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop mb-16">
        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-outline-variant/30 mb-8">
          {['overview', 'technical', 'challenges', 'results'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-label-md transition-all ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="font-headline-lg text-headline-lg mb-4">Project Overview</h2>
                  <p className="font-body-lg text-on-surface-variant mb-6">{project.fullDescription}</p>
                  
                  <h3 className="font-headline-md text-headline-md mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                        <div className="text-primary">{feature.icon}</div>
                        <div>
                          <h4 className="font-label-md text-label-md mb-1">{feature.title}</h4>
                          <p className="font-body-sm text-on-surface-variant">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
                    <h3 className="font-label-md text-label-md mb-4">Project Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-body-sm text-on-surface-variant">Client</p>
                        <p className="font-label-md">{project.client}</p>
                      </div>
                      <div>
                        <p className="font-body-sm text-on-surface-variant">Year</p>
                        <p className="font-label-md">{project.year}</p>
                      </div>
                      <div>
                        <p className="font-body-sm text-on-surface-variant">Role</p>
                        <p className="font-label-md">{project.role}</p>
                      </div>
                      <div>
                        <p className="font-body-sm text-on-surface-variant">Duration</p>
                        <p className="font-label-md">{project.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30">
                    <h3 className="font-label-md text-label-md mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-surface-variant rounded-lg font-label-sm text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technical' && (
              <div>
                <h2 className="font-headline-lg text-headline-lg mb-6">Technologies Used</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {project.technologies.map((tech, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all"
                    >
                      <div className="text-4xl">{tech.icon}</div>
                      <div>
                        <h3 className="font-headline-md text-headline-md mb-2">{tech.name}</h3>
                        <p className="font-body-sm text-on-surface-variant">{tech.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <h2 className="font-headline-lg text-headline-lg mb-6">Performance Metrics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-surface-container-low rounded-xl p-4 text-center border border-outline-variant/30">
                      <p className="text-3xl font-bold text-primary mb-1">{metric.value}</p>
                      <p className="font-body-sm text-on-surface-variant mb-2">{metric.label}</p>
                      <span className={`inline-flex items-center gap-1 font-label-sm text-xs ${
                        metric.trend === 'up' ? 'text-secondary' : 'text-error'
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'challenges' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="font-headline-lg text-headline-lg mb-4 flex items-center gap-2">
                    <XCircle className="text-error" size={28} />
                    Challenges
                  </h2>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, idx) => (
                      <div key={idx} className="flex gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                        <div className="text-error mt-1">⚠️</div>
                        <p className="font-body-md">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-headline-lg text-headline-lg mb-4 flex items-center gap-2">
                    <CheckCircle className="text-secondary" size={28} />
                    Solutions
                  </h2>
                  <div className="space-y-4">
                    {project.solutions.map((solution, idx) => (
                      <div key={idx} className="flex gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                        <div className="text-secondary mt-1">✓</div>
                        <p className="font-body-md">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div>
                <h2 className="font-headline-lg text-headline-lg mb-6">Key Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {project.results.map((result, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 p-6 bg-surface-container-low rounded-xl border border-outline-variant/30"
                    >
                      <div className="text-primary">
                        <CheckCircle size={24} />
                      </div>
                      <p className="font-body-lg">{result}</p>
                    </motion.div>
                  ))}
                </div>

                <h2 className="font-headline-lg text-headline-lg mb-6">Team</h2>
                <div className="flex flex-wrap gap-6">
                  {project.team.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                      <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
                      <div>
                        <p className="font-label-md">{member.name}</p>
                        <p className="font-body-sm text-on-surface-variant">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Share Section */}
      <section className="py-16 border-t border-outline-variant/30">
        <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-headline-md text-headline-md">Like this project?</h3>
              <p className="font-body-sm text-on-surface-variant">Share it with your network</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-surface-container border border-outline-variant rounded-lg hover:border-primary transition-all"
              >
                <Twitter size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-surface-container border border-outline-variant rounded-lg hover:border-primary transition-all"
              >
                <Linkedin size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(window.location.href)}
                className="flex items-center gap-2 px-4 py-2 bg-surface-container border border-outline-variant rounded-lg hover:border-primary transition-all"
              >
                {copied ? <Check size={20} /> : <Link2 size={20} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;