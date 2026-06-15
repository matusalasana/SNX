// BlogDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Heart, 
  Bookmark,
  Share2,
  MessageCircle,
  Send,
  Twitter,
  Linkedin,
  Link2,
  Check,
  ChevronRight,
  ChevronDown,
  Code2,
  Copy,
  Terminal,
  AlertCircle,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

// Syntax highlighting styles (you can add prism.js or highlight.js for better highlighting)
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: string;
  authorAvatar: string;
  authorBio: string;
  authorRole: string;
  category: 'Code Insight' | 'Event' | 'Tutorial' | 'News' | 'Architecture';
  tags: string[];
  likes: number;
  comments: Comment[];
  image: string;
  tableOfContents: TocItem[];
}

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  date: string;
  content: string;
  likes: number;
  replies?: Comment[];
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

// Sample blog post data with full content
const blogPostData: Record<number, BlogPost> = {
  1: {
    id: 1,
    title: "Building Scalable Microservices with Go and Kafka",
    excerpt: "Learn how to build event-driven microservices using Go and Apache Kafka for high-throughput systems.",
    content: `
      <h2 id="introduction">Introduction</h2>
      <p>Microservices architecture has become the go-to pattern for building scalable, maintainable applications. When combined with event-driven communication using Apache Kafka, you can achieve unprecedented levels of decoupling and scalability. In this article, we'll explore how to build robust microservices using Go and Kafka.</p>
      
      <h2 id="why-go">Why Go for Microservices?</h2>
      <p>Go (Golang) has emerged as a top choice for microservices development due to several key features:</p>
      <ul>
        <li><strong>Excellent concurrency support</strong> with goroutines and channels</li>
        <li><strong>Fast compilation</strong> to single binary executables</li>
        <li><strong>Built-in garbage collection</strong> and memory safety</li>
        <li><strong>Strong standard library</strong> with HTTP server and client</li>
        <li><strong>Small memory footprint</strong> ideal for containerized deployments</li>
      </ul>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-language">Go</span>
          <button class="copy-code-btn" onclick="copyCode(this)">Copy</button>
        </div>
        <pre><code>package main

import (
    "context"
    "encoding/json"
    "log"
    "net/http"
    
    "github.com/gorilla/mux"
    "github.com/segmentio/kafka-go"
)

type Order struct {
    ID     string  ` + "`json:\"id\"`" + `
    Amount float64 ` + "`json:\"amount\"`" + `
    Status string  ` + "`json:\"status\"`" + `
}

func main() {
    router := mux.NewRouter()
    router.HandleFunc("/orders", createOrder).Methods("POST")
    
    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", router))
}

func createOrder(w http.ResponseWriter, r *http.Request) {
    var order Order
    if err := json.NewDecoder(r.Body).Decode(&order); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    // Produce to Kafka
    produceOrder(order)
    
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(order)
}</code></pre>
      </div>
      
      <h2 id="kafka-setup">Setting Up Kafka</h2>
      <p>Apache Kafka provides a distributed streaming platform perfect for event-driven architectures. Here's a basic setup using Docker Compose:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-language">YAML</span>
          <button class="copy-code-btn" onclick="copyCode(this)">Copy</button>
        </div>
        <pre><code>version: '3'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
    ports:
      - "9092:9092"</code></pre>
      </div>
      
      <div class="info-box">
        <Lightbulb size={20} />
        <div>
          <strong>Pro Tip:</strong> Use Kafka partitions to parallelize message processing across multiple consumer instances for better throughput.
        </div>
      </div>
      
      <h2 id="producer-consumer">Implementing Producer and Consumer</h2>
      <p>Let's implement a Kafka producer that publishes order events and a consumer that processes them:</p>
      
      <div class="code-block">
        <div class="code-header">
          <span class="code-language">Go</span>
          <button class="copy-code-btn" onclick="copyCode(this)">Copy</button>
        </div>
        <pre><code>func produceOrder(order Order) error {
    writer := kafka.NewWriter(kafka.WriterConfig{
        Brokers: []string{"localhost:9092"},
        Topic:   "orders",
    })
    defer writer.Close()
    
    value, err := json.Marshal(order)
    if err != nil {
        return err
    }
    
    return writer.WriteMessages(context.Background(),
        kafka.Message{
            Key:   []byte(order.ID),
            Value: value,
        },
    )
}

func consumeOrders() {
    reader := kafka.NewReader(kafka.ReaderConfig{
        Brokers: []string{"localhost:9092"},
        Topic:   "orders",
        GroupID: "order-processor",
    })
    defer reader.Close()
    
    for {
        msg, err := reader.ReadMessage(context.Background())
        if err != nil {
            log.Printf("Error reading message: %v", err)
            continue
        }
        
        var order Order
        if err := json.Unmarshal(msg.Value, &order); err != nil {
            log.Printf("Error unmarshaling: %v", err)
            continue
        }
        
        // Process order
        processOrder(order)
    }
}</code></pre>
      </div>
      
      <div class="warning-box">
        <AlertTriangle size={20} />
        <div>
          <strong>Important:</strong> Always implement proper error handling and dead-letter queues for failed message processing.
        </div>
      </div>
      
      <h2 id="scaling">Scaling Considerations</h2>
      <p>When scaling your Kafka-based microservices, consider these best practices:</p>
      <ul>
        <li><strong>Partition Strategy:</strong> Choose appropriate partition keys to distribute load evenly</li>
        <li><strong>Consumer Groups:</strong> Use consumer groups to scale processing horizontally</li>
        <li><strong>Idempotency:</strong> Design consumers to handle duplicate messages gracefully</li>
        <li><strong>Monitoring:</strong> Implement metrics for lag, throughput, and error rates</li>
      </ul>
      
      <h2 id="conclusion">Conclusion</h2>
      <p>Building microservices with Go and Kafka provides a powerful, scalable architecture for modern applications. The combination of Go's performance and Kafka's durability makes it an excellent choice for event-driven systems.</p>
      
      <p>Remember to start small, iterate, and gradually add complexity as your needs grow. The patterns shown here will serve as a solid foundation for your microservices journey.</p>
    `,
    date: "March 15, 2024",
    readTime: "8 min read",
    author: "Alex Chen",
    authorAvatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=c0c1ff&color=1000a9",
    authorBio: "Senior Software Architect with 10+ years of experience in distributed systems. Passionate about Go, Kafka, and event-driven architectures.",
    authorRole: "Principal Engineer",
    category: "Code Insight",
    tags: ["Go", "Kafka", "Microservices", "Event-Driven", "Distributed Systems"],
    likes: 127,
    comments: [
      {
        id: 1,
        author: "Sarah Johnson",
        authorAvatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=4edea3&color=003824",
        date: "March 16, 2024",
        content: "This is incredibly helpful! The code examples are clear and the Kafka setup guide saved me hours of research.",
        likes: 12,
        replies: [
          {
            id: 2,
            author: "Alex Chen",
            authorAvatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=c0c1ff&color=1000a9",
            date: "March 16, 2024",
            content: "Glad you found it useful! Let me know if you have any questions about implementing this in production.",
            likes: 5,
            replies: []
          }
        ]
      },
      {
        id: 3,
        author: "Michael Park",
        authorAvatar: "https://ui-avatars.com/api/?name=Michael+Park&background=ffb783&color=4f2500",
        date: "March 17, 2024",
        content: "Great article! Would you recommend using Kafka over RabbitMQ for high-throughput systems?",
        likes: 8,
        replies: []
      }
    ],
    tableOfContents: [
      { id: "introduction", title: "Introduction", level: 2 },
      { id: "why-go", title: "Why Go for Microservices?", level: 2 },
      { id: "kafka-setup", title: "Setting Up Kafka", level: 2 },
      { id: "producer-consumer", title: "Implementing Producer and Consumer", level: 2 },
      { id: "scaling", title: "Scaling Considerations", level: 2 },
      { id: "conclusion", title: "Conclusion", level: 2 }
    ]
  }
};

// Related posts data
const relatedPosts = [
  {
    id: 2,
    title: "Optimizing Database Queries for 100x Performance",
    excerpt: "Practical techniques for indexing, query optimization, and caching strategies.",
    date: "March 5, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
    category: "Tutorial"
  },
  {
    id: 3,
    title: "Rust vs Go: Performance Comparison for Network Services",
    excerpt: "A deep dive into memory management, concurrency models, and real-world benchmarks.",
    date: "February 20, 2024",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop",
    category: "Code Insight"
  },
  {
    id: 4,
    title: "Building a Real-time Dashboard with WebSockets and React",
    excerpt: "Step-by-step tutorial for creating live data visualizations with minimal latency.",
    date: "February 15, 2024",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    category: "Tutorial"
  }
];

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [showToc, setShowToc] = useState(true);

  useEffect(() => {
    // Load post data
    const postId = parseInt(id || '1');
    const foundPost = blogPostData[postId];
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  useEffect(() => {
    // Intersection Observer for active heading detection
    const headings = document.querySelectorAll('h2[id], h3[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -400px 0px', threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [post]);

  const handleLike = () => {
    setLiked(!liked);
    // API call to update likes would go here
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // API call to update bookmarks would go here
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // API call to submit comment would go here
      alert('Comment submitted! (Demo)');
      setNewComment('');
    }
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Back to Blog Button */}
      <div className="fixed top-24 left-4 md:left-8 z-40">
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 px-3 py-2 bg-surface-container/80 backdrop-blur-sm border border-outline-variant rounded-xl hover:border-primary transition-all"
        >
          <ArrowLeft size={18} />
          <span className="hidden md:inline font-label-sm">Back to Blog</span>
        </motion.button>
      </div>

      {/* Table of Contents - Desktop */}
      {post.tableOfContents && post.tableOfContents.length > 0 && showToc && (
        <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:block z-30 w-64">
          <div className="bg-surface-container-low/90 backdrop-blur-sm border border-outline-variant rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-label-md text-label-md text-primary">Table of Contents</h4>
              <button onClick={() => setShowToc(false)} className="text-on-surface-variant hover:text-primary">
                <ChevronDown size={16} />
              </button>
            </div>
            <nav className="space-y-2">
              {post.tableOfContents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block text-left w-full text-sm transition-colors hover:text-primary ${
                    activeHeading === item.id 
                      ? 'text-primary font-medium' 
                      : 'text-on-surface-variant'
                  } ${item.level === 3 ? 'pl-4' : ''}`}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Collapsed TOC Button */}
      {post.tableOfContents && post.tableOfContents.length > 0 && !showToc && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setShowToc(true)}
          className="fixed left-8 top-1/2 -translate-y-1/2 hidden xl:flex z-30 w-10 h-10 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full items-center justify-center hover:bg-primary/30 transition-all"
        >
          <ChevronRight size={18} className="text-primary" />
        </motion.button>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 hero-gradient pointer-events-none" />
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-headline-xl text-headline-xl mb-6">
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-8 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-label-md text-label-md">{post.author}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-on-surface-variant">
                  <Calendar size={16} />
                  <span className="font-body-sm">{post.date}</span>
                </span>
                <span className="flex items-center gap-1 text-on-surface-variant">
                  <Clock size={16} />
                  <span className="font-body-sm">{post.readTime}</span>
                </span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img src={post.image} alt={post.title} className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-grow prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Sidebar - Desktop */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Action Buttons */}
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4">
                <div className="flex justify-around">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <Heart 
                      size={24} 
                      className={liked ? 'fill-primary text-primary' : 'text-on-surface-variant group-hover:text-primary'} 
                    />
                    <span className="font-body-sm">{post.likes + (liked ? 1 : 0)}</span>
                  </motion.button>
                  
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleBookmark}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <Bookmark 
                      size={24} 
                      className={bookmarked ? 'fill-primary text-primary' : 'text-on-surface-variant group-hover:text-primary'} 
                    />
                    <span className="font-body-sm">Save</span>
                  </motion.button>
                  
                  <div className="relative">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <Share2 size={24} className="text-on-surface-variant group-hover:text-primary" />
                      <span className="font-body-sm">Share</span>
                    </motion.button>
                    
                    <AnimatePresence>
                      {showShareMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface-container-high border border-outline-variant rounded-xl shadow-lg p-2 min-w-[160px]"
                        >
                          <button
                            onClick={() => handleShare('twitter')}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-variant rounded-lg transition-colors"
                          >
                            <Twitter size={18} /> Twitter
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-variant rounded-lg transition-colors"
                          >
                            <Linkedin size={18} /> LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-surface-variant rounded-lg transition-colors"
                          >
                            {copied ? <Check size={18} /> : <Link2 size={18} />}
                            {copied ? 'Copied!' : 'Copy Link'}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full" />
                  <div>
                    <h4 className="font-label-md text-label-md">{post.author}</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{post.authorRole}</p>
                  </div>
                </div>
                <p className="font-body-sm text-on-surface-variant">{post.authorBio}</p>
              </div>

              {/* Tags */}
              <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4">
                <h4 className="font-label-md text-label-md mb-3 flex items-center gap-2">
                  <Tag size={16} /> Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-surface-variant rounded-lg font-label-sm text-[10px] text-on-surface-variant"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-lg text-headline-lg mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related, idx) => (
              <motion.article
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/blog/${related.id}`)}
                className="bg-surface-container border border-outline-variant/30 rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={related.image} alt={related.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded-full font-label-sm text-[10px] uppercase">
                      {related.category}
                    </span>
                    <span className="flex items-center gap-1 text-on-surface-variant font-body-sm">
                      <Clock size={12} />
                      {related.readTime}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="font-body-sm text-on-surface-variant line-clamp-2">{related.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <section className="py-16 max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center gap-2 mb-8">
          <MessageCircle size={24} className="text-secondary" />
          <h2 className="font-headline-lg text-headline-lg">Comments ({post.comments.length})</h2>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="flex gap-3">
            <img
              src="https://ui-avatars.com/api/?name=You&background=c0c1ff&color=1000a9"
              alt="Your avatar"
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-grow">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm resize-none"
              />
              <div className="flex justify-end mt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md flex items-center gap-2"
                >
                  <Send size={16} />
                  Post Comment
                </motion.button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-surface-container-low rounded-xl p-4">
              <div className="flex gap-3">
                <img src={comment.authorAvatar} alt={comment.author} className="w-10 h-10 rounded-full" />
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-label-md text-label-md">{comment.author}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{comment.date}</span>
                  </div>
                  <p className="font-body-md mb-2">{comment.content}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-body-sm">
                      <Heart size={14} />
                      {comment.likes}
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-body-sm">
                      Reply
                    </button>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-outline-variant/30">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3 mt-4">
                          <img src={reply.authorAvatar} alt={reply.author} className="w-8 h-8 rounded-full" />
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-label-md text-label-md">{reply.author}</span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">{reply.date}</span>
                            </div>
                            <p className="font-body-sm">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Copy code functionality script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.copyCode = function(btn) {
            const codeBlock = btn.closest('.code-block').querySelector('code');
            const text = codeBlock.innerText;
            navigator.clipboard.writeText(text);
            btn.textContent = 'Copied!';
            setTimeout(() => {
              btn.textContent = 'Copy';
            }, 2000);
          };
        `
      }} />
    </div>
  );
};

export default BlogDetails;