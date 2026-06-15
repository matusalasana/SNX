// Contact.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Clock,
  Calendar,
  FileText,
  Coffee,
  Sparkles,
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "hello@snx.dev",
      link: "mailto:hello@snx.dev",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      value: "San Francisco, CA",
      link: null,
      color: "text-tertiary",
      bgColor: "bg-tertiary/10"
    }
  ];

  const socialLinks = [
    { icon: <Github size={20} />, name: "GitHub", username: "@snx-dev", link: "#", color: "hover:text-primary" },
    { icon: <Linkedin size={20} />, name: "LinkedIn", username: "snx-dev", link: "#", color: "hover:text-primary" },
    { icon: <Twitter size={20} />, name: "Twitter", username: "@snx_dev", link: "#", color: "hover:text-primary" },
    { icon: <MessageCircle size={20} />, name: "Discord", username: "snx.dev", link: "#", color: "hover:text-secondary" }
  ];

  const faqs = [
    {
      question: "What's your availability for new projects?",
      answer: "I'm currently available for freelance projects and contract work starting from April 2024. For full-time positions, I'm open to discussing opportunities starting Q3 2024."
    },
    {
      question: "What's your typical response time?",
      answer: "I usually respond to emails within 24 hours on business days. For urgent matters, you can reach me via phone during business hours (9 AM - 6 PM PST)."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! I work with clients worldwide. I've successfully collaborated with teams across North America, Europe, and Asia."
    },
    {
      question: "What's your development process like?",
      answer: "I follow an agile methodology with regular check-ins, transparent communication, and iterative delivery. Each project starts with a discovery phase to understand requirements thoroughly."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 glass-card rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
              Let's Connect
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's create something amazing together.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, idx) => (
            <motion.a
              key={idx}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              href={method.link || '#'}
              className={`block p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all ${!method.link ? 'cursor-default' : ''}`}
              onClick={(e) => {
                if (!method.link) {
                  e.preventDefault();
                  copyToClipboard(method.value);
                }
              }}
            >
              <div className={`w-12 h-12 rounded-xl ${method.bgColor} flex items-center justify-center mb-4 ${method.color}`}>
                {method.icon}
              </div>
              <h3 className="font-headline-md text-headline-md mb-2">{method.title}</h3>
              <div className="flex items-center gap-2">
                <p className="font-body-md text-on-surface-variant">{method.value}</p>
                {!method.link && (
                  <button className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Copy size={14} />
                  </button>
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-surface-container-low rounded-2xl p-6 md:p-8 border border-outline-variant/30"
          >
            <h2 className="font-headline-lg text-headline-lg mb-2">Send a Message</h2>
            <p className="font-body-sm text-on-surface-variant mb-6">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-label-sm text-label-sm mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-surface-container border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-label-sm text-label-sm mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-surface-container border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-label-sm text-label-sm mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-surface-container border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm"
                >
                  <option value="">Select a subject</option>
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="Job Opportunity">Job Opportunity</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block font-label-sm text-label-sm mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-surface-container border border-outline-variant rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-sm resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-primary text-on-primary rounded-xl font-label-md hover:bg-primary-container transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-secondary/20 text-secondary rounded-xl"
                  >
                    <CheckCircle size={18} />
                    <span className="font-body-sm">Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-error/20 text-error rounded-xl"
                  >
                    <AlertCircle size={18} />
                    <span className="font-body-sm">Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right Side - Social & Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Social Links */}
            <motion.div variants={fadeInUp} className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/30">
              <h2 className="font-headline-md text-headline-md mb-4">Connect Online</h2>
              <p className="font-body-sm text-on-surface-variant mb-4">
                Follow me on social media for updates, tech insights, and behind-the-scenes content.
              </p>
              <div className="space-y-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-surface-container rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-primary">{social.icon}</div>
                      <div>
                        <p className="font-label-md text-label-md">{social.name}</p>
                        <p className="font-body-sm text-on-surface-variant">{social.username}</p>
                      </div>
                    </div>
                    <ArrowRight size={18} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Office Hours */}
            <motion.div variants={fadeInUp} className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/30">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={20} className="text-secondary" />
                <h2 className="font-headline-md text-headline-md">Office Hours</h2>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-on-surface-variant">Monday - Friday</span>
                  <span className="font-label-md text-label-md">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-on-surface-variant">Saturday</span>
                  <span className="font-label-md text-label-md">10:00 AM - 2:00 PM PST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body-sm text-on-surface-variant">Sunday</span>
                  <span className="font-label-md text-label-md">Closed</span>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-surface-variant/30 rounded-xl">
                <Coffee size={16} className="text-tertiary" />
                <span className="font-body-sm text-on-surface-variant">Response time: Usually within 24 hours</span>
              </div>
            </motion.div>

            {/* Availability Calendar */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={20} className="text-primary" />
                <h2 className="font-headline-md text-headline-md">Current Availability</h2>
              </div>
              <p className="font-body-md mb-3">
                <span className="text-primary font-bold">Available for:</span>
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-label-sm text-[11px]">Freelance Projects</span>
                <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full font-label-sm text-[11px]">Contract Work</span>
                <span className="px-3 py-1 bg-tertiary/20 text-tertiary rounded-full font-label-sm text-[11px]">Technical Consulting</span>
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-label-sm text-[11px]">Speaking Engagements</span>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-outline-variant/30">
                <Sparkles size={16} className="text-primary" />
                <span className="font-body-sm text-on-surface-variant">Starting from April 2024</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="font-headline-lg text-headline-lg mb-2">Frequently Asked Questions</h2>
            <p className="font-body-md text-on-surface-variant">Everything you need to know before reaching out</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -2 }}
                className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30 hover:border-primary/50 transition-all"
              >
                <h3 className="font-headline-md text-headline-md mb-2 text-primary">{faq.question}</h3>
                <p className="font-body-sm text-on-surface-variant">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Map / Location Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative rounded-2xl overflow-hidden h-64 md:h-96"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-primary mx-auto mb-3" />
              <h3 className="font-headline-md text-headline-md mb-2">Based in San Francisco</h3>
              <p className="font-body-md text-on-surface-variant">Working with clients worldwide remotely</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-body-sm text-on-surface-variant">Available for remote work</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Backup Contact Option */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-8 pt-8 border-t border-outline-variant/30"
        >
          <p className="font-body-sm text-on-surface-variant">
            Prefer a quick call? Schedule a 15-min chat using{' '}
            <a href="#" className="text-primary hover:underline">Calendly</a>
          </p>
        </motion.div>
      </div>

      {/* Floating Notification for Copied Email */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-on-primary rounded-xl px-4 py-2 shadow-lg flex items-center gap-2"
          >
            <Check size={18} />
            <span className="font-body-sm">Email copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;