// Blog.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ChevronRight, 
  Heart, 
  Bookmark,
  MessageCircle,
  Share2,
  Search,
  Filter,
  Code2,
  Lightbulb,
  Calendar as CalendarIcon,
  Mic,
  ArrowRight,
  Mail,
  Bell,
  X,
  CheckCircle
} from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  authorAvatar: string;
  category: 'Code Insight' | 'Event' | 'Tutorial' | 'News' | 'Architecture';
  tags: string[];
  likes: number;
  comments: number;
  image: string;
  featured?: boolean;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'Workshop' | 'Meetup' | 'Conference' | 'Webinar';
  image: string;
  link: string;
  spots: number;
}

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([]);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const categories = ['All', 'Code Insight', 'Event', 'Tutorial', 'News', 'Architecture'];

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable Microservices with Go and Kafka",
      excerpt: "Learn how to build event-driven microservices using Go and Apache Kafka for high-throughput systems.",
      content: "Full article content here...",
      date: "March 15, 2024",
      readTime: "8 min read",
      author: "SNX",
      authorAvatar: "https://ui-avatars.com/api/?name=SNX&background=c0c1ff&color=1000a9",
      category: "Code Insight",
      tags: ["Go", "Kafka", "Microservices", "Event-Driven"],
      likes: 127,
      comments: 23,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "React Server Components: The Future of Web Development",
      excerpt: "Exploring RSC architecture and how it changes the way we build React applications.",
      content: "Full article content here...",
      date: "March 10, 2024",
      readTime: "6 min read",
      author: "SNX",
      authorAvatar: "https://ui-avatars.com/api/?name=SNX&background=c0c1ff&color=1000a9",
      category: "Code Insight",
      tags: ["React", "RSC", "Next.js", "Performance"],
      likes: 98,
      comments: 15,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop"
    },
    {
      id: 3,
      title: "Optimizing Database Queries for 100x Performance",
      excerpt: "Practical techniques for indexing, query optimization, and caching strategies.",
      content: "Full article content here...",
      date: "March 5, 2024",
      readTime: "10 min read",
      author: "SNX",
      authorAvatar: "https://ui-avatars.com/api/?name=SNX&background=c0c1ff&color=1000a9",
      category: "Tutorial",
      tags: ["PostgreSQL", "Performance", "Optimization", "SQL"],
      likes: 203,
      comments: 34,
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop"
    },
    {
      id: 4,
      title: "DevOps Days 2024: Key Takeaways from Industry Leaders",
      excerpt: "A recap of the biggest DevOps conference of the year and emerging trends.",
      content: "Full article content here...",
      date: "February 28, 2024",
      readTime: "5 min read",
      author: "SNX",
      authorAvatar: "https://ui-avatars.com/api/?name=SNX&background=c0c1ff&color=1000a9",
      category: "Event",
      tags: ["DevOps", "Conference", "Cloud Native", "Kubernetes"],
      likes: 67,
      comments: 8,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop"
    },
    {
      id: 5,
      title: "Rust vs Go: Performance Comparison for Network Services",
      excerpt: "A deep dive into memory management, concurrency models, and real-world benchmarks.",
      content: "Full article content here...",
      date: "February 20, 2024",
      readTime: "12 min read",
      author: "SNX",
      authorAvatar: "https://ui-avatars.com/api/?name=SNX&background=c0c1ff&color=1000a9",
      category: "Code Insight",
      tags: ["Rust", "Go", "Performance", "Benchmark"],
      likes: 312,
      comments: 47,
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop"
    },
    {
      id: 6,
      title: "Building a Real-time Dashboard with WebSockets and React",
      excerpt: "Step-by-step tutorial for creating live data visualizations with minimal latency.",
      content: "Full article content here...",
      date: "February 15, 2024",
      readTime: "9 min read",
      author: "SNX",
      authorAvatar: "https://ui-avatars.com/api/?name=SNX&background=c0c1ff&color=1000a9",
      category: "Tutorial",
      tags: ["WebSocket", "React", "Real-time", "Socket.io"],
      likes: 156,
      comments: 28,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
    },
    {
      id: 7,
      title: "The Architecture of High-Frequency Trading Systems",
      excerpt: "Understanding low-latency design patterns and hardware optimization techniques.",
      content: "Full article content here...",
      date: "February 10, 2024",
      readTime: "15 min read",
      author: "SNX",
      authorAvatar: "https://ui-avatars.com/api/?name=SNX&background=c0c1ff&color=1000a9",
      category: "Architecture",
      tags: ["HFT", "Low-Latency", "C++", "FPGA"],
      likes: 245,
      comments: 31,
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=500&fit=crop",
      featured: true
    },
    {
      id: 8,
      title: "Weekly Dev Roundup: March 2024",
      excerpt: "Latest updates in the JavaScript ecosystem, new tools, and community highlights.",
      content: "Full article content here...",
      date: "March 1, 2024",
      readTime: "4 min read",
      author: "SNX",
      authorAvatar: "https://ui-avatars.com/api/?name=SNX&background=c0c1ff&color=1000a9",
      category: "News",
      tags: ["JavaScript", "News", "Community", "Tools"],
      likes: 45,
      comments: 5,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop"
    }
  ];

  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "WebAssembly Workshop: From Zero to Hero",
      description: "Hands-on workshop learning WebAssembly and integrating with JavaScript applications.",
      date: "April 10, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Online / Zoom",
      type: "Workshop",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=500&fit=crop",
      link: "#",
      spots: 45
    },
    {
      id: 2,
      title: "Cloud Native Meetup: Kubernetes Best Practices",
      description: "Monthly meetup discussing Kubernetes patterns, operators, and production pitfalls.",
      date: "April 15, 2024",
      time: "6:30 PM - 9:00 PM",
      location: "San Francisco, CA",
      type: "Meetup",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=500&fit=crop",
      link: "#",
      spots: 120
    },
    {
      id: 3,
      title: "AI Engineering Conference 2024",
      description: "Two-day conference on LLMs, vector databases, and AI infrastructure.",
      date: "April 25-26, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "New York, NY",
      type: "Conference",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
      link: "#",
      spots: 500
    },
    {
      id: 4,
      title: "Rust for Systems Programming Webinar",
      description: "Live coding session exploring memory safety and zero-cost abstractions in Rust.",
      date: "May 5, 2024",
      time: "12:00 PM - 1:30 PM",
      location: "Online / Crowdcast",
      type: "Webinar",
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop",
      link: "#",
      spots: 200
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      showToastMessage('Removed like');
    } else {
      setLikedPosts([...likedPosts, postId]);
      showToastMessage('Post liked!');
    }
  };

  const handleBookmark = (postId: number) => {
    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(bookmarkedPosts.filter(id => id !== postId));
      showToastMessage('Removed bookmark');
    } else {
      setBookmarkedPosts([...bookmarkedPosts, postId]);
      showToastMessage('Bookmarked!');
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setShowNewsletter(false);
        setNewsletterSuccess(false);
        setNewsletterEmail('');
      }, 2000);
    }
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
    <div className="min-h-screen bg-background text-on-surface">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-surface-container-high border border-primary/30 rounded-xl px-4 py-2 shadow-lg flex items-center gap-2"
          >
            <CheckCircle size={18} className="text-secondary" />
            <span className="font-body-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16 px-margin-mobile md:px-margin-desktop">
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="max-w-container-max mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full mb-md">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">Thoughts & Insights</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-sm">
              Dev Blog
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-2xl mx-auto">
              Exploring software architecture, development insights, and the future of technology.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-xl flex flex-col md:flex-row gap-md justify-between items-center"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles, tags, or topics..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-xs justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full font-label-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container border border-outline-variant text-on-surface-variant hover:border-primary'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && selectedCategory === 'All' && !searchTerm && (
          <motion.section
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-xl"
          >
            <div className="flex items-center gap-2 mb-lg">
              <Lightbulb className="text-primary" size={24} />
              <h2 className="font-headline-lg text-headline-lg">Featured Articles</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
              {featuredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-xl border border-primary/20 bg-surface-container-low hover:border-primary/50 transition-all duration-300"
                >
                  <div className="aspect-[2/1] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded-full font-label-sm text-[10px] uppercase">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-on-surface-variant font-body-sm">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body-sm text-on-surface-variant mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-label-sm text-label-sm">{post.author}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{post.date}</p>
                        </div>
                      </div>
                      <button className="text-primary flex items-center gap-1 font-label-sm group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

  {/* Blog Posts Grid */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-xl"
        >
          <div className="flex items-center justify-between mb-lg">
            <div className="flex items-center gap-2">
              <Code2 className="text-secondary" size={24} />
              <h2 className="font-headline-lg text-headline-lg">
                {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory}s`}
              </h2>
            </div>
            <p className="font-body-sm text-on-surface-variant">{filteredPosts.length} articles</p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <Search className="text-primary w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="font-body-lg text-on-surface-variant">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {regularPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 right-3 flex gap-1">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleBookmark(post.id)}
                        className="p-1.5 bg-surface/80 backdrop-blur-sm rounded-full hover:bg-primary/20 transition-colors"
                      >
                        <Bookmark size={16} className={bookmarkedPosts.includes(post.id) ? 'text-primary fill-primary' : 'text-on-surface-variant'} />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-md">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded-full font-label-sm text-[10px] uppercase">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-on-surface-variant font-body-sm">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h3 className="font-headline-md text-headline-md mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="font-body-sm text-on-surface-variant mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-surface-variant rounded font-label-sm text-[10px] text-on-surface-variant">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30">
                      <div className="flex items-center gap-2">
                        <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full" />
                        <span className="font-body-sm text-body-sm">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"
                        >
                          <Heart size={16} className={likedPosts.includes(post.id) ? 'fill-primary text-primary' : ''} />
                          <span className="font-body-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                        </motion.button>
                        <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
                          <MessageCircle size={16} />
                          <span className="font-body-sm">{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </motion.section>

        {/* Upcoming Events Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-xl"
        >
          <div className="flex items-center gap-2 mb-lg">
            <CalendarIcon className="text-tertiary" size={24} />
            <h2 className="font-headline-lg text-headline-lg">Upcoming Events</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col md:flex-row gap-4 bg-surface-container-low border border-outline-variant/30 rounded-xl p-md hover:border-tertiary/50 transition-all duration-300"
              >
                <div className="md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full font-label-sm text-[10px] uppercase ${
                      event.type === 'Workshop' ? 'bg-secondary/20 text-secondary' :
                      event.type === 'Meetup' ? 'bg-tertiary/20 text-tertiary' :
                      event.type === 'Conference' ? 'bg-primary/20 text-primary' :
                      'bg-surface-variant text-on-surface-variant'
                    }`}>
                      {event.type}
                    </span>
                    <span className="font-body-sm text-on-surface-variant">{event.date}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-2">{event.title}</h3>
                  <p className="font-body-sm text-on-surface-variant mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3 text-on-surface-variant font-body-sm">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {event.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-body-sm text-primary">{event.spots} spots left</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-lg font-label-sm text-label-sm hover:bg-primary/30 transition-all"
                      >
                        Register
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-xl"
        >
          <div className="glass-card rounded-2xl p-xl text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
            
            <Mail className="text-primary w-12 h-12 mx-auto mb-4" />
            <h2 className="font-headline-lg text-headline-lg mb-2">Subscribe to Newsletter</h2>
            <p className="font-body-md text-on-surface-variant mb-6 max-w-md mx-auto">
              Get the latest articles, code insights, and event updates delivered to your inbox.
            </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-grow px-4 py-2 bg-surface-container-low border border-outline-variant rounded-xl focus:outline-none focus:border-primary transition-all font-body-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary-container transition-all flex items-center gap-2 justify-center"
              >
                Subscribe
                <Bell size={16} />
              </motion.button>
            </form>
            
            <p className="font-body-sm text-on-surface-variant mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.section>
      </div>

      {/* Newsletter Success Modal */}
      <AnimatePresence>
        {showNewsletter && !newsletterSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewsletter(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-surface-container-high border border-primary/30 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-headline-md">Subscribe to Newsletter</h3>
                <button onClick={() => setShowNewsletter(false)} className="text-on-surface-variant hover:text-primary">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-surface-container-low border border-outline-variant rounded-xl mb-4 focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary-container transition-all"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {newsletterSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 bg-primary text-on-primary rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 z-50"
        >
          <CheckCircle size={18} />
          <span>Subscribed successfully!</span>
        </motion.div>
      )}
    </div>
  );
};

export default Blog;