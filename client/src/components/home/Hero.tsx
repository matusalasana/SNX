import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DownloadResumeBtn from "../common/DownloadResumeBtn";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const technologies = [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Tailwind",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(to_right,#64748b10_1px,transparent_1px),linear-gradient(to_bottom,#64748b10_1px,transparent_1px)]
            bg-[size:70px_70px]
            dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
          "
        />
      </div>

      {/* Gradient Blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl dark:bg-cyan-500/20" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/20" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/20" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12">
          {/* Left Content */}
          <motion.div
            className="lg:col-span-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div
              className="
                relative
                rounded-3xl
                border
                border-slate-200/70
                bg-white/60
                p-8
                backdrop-blur-xl
                shadow-[0_20px_80px_rgba(0,0,0,0.08)]
                md:p-12
                dark:border-white/10
                dark:bg-white/5
                dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)]
              "
            >
              {/* Status */}
              <motion.div variants={itemVariants}>
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-cyan-500/20
                    bg-cyan-500/10
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
                  Open to Work
                </span>
              </motion.div>

              {/* Name */}
              <motion.p
                variants={itemVariants}
                className="mt-8 text-sm font-medium uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400"
              >
                Sana Matusala
              </motion.p>

              {/* Main Heading */}
              <motion.h1
                variants={itemVariants}
                className="
                  mt-4
                  text-5xl
                  font-black
                  leading-[0.95]
                  tracking-tight
                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl
                "
              >
                Building
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Modern Digital
                </span>
                Experiences
              </motion.h1>

              {/* Subtitle */}
              <motion.h2
                variants={itemVariants}
                className="mt-8 text-xl font-semibold text-slate-700 md:text-2xl dark:text-slate-200"
              >
                Full-Stack Developer
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="
                  mt-6
                  max-w-2xl
                  text-base
                  leading-relaxed
                  text-slate-600
                  md:text-lg
                  dark:text-slate-400
                "
              >
                I build fast, scalable, and user-focused web applications
                using React, TypeScript, Node.js, Express, PostgreSQL, and
                MongoDB. Passionate about transforming ideas into polished
                digital products.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link
                  to="/projects"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    px-7
                    py-4
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    hover:shadow-cyan-500/25
                  "
                >
                  Explore Projects

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <DownloadResumeBtn />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side Tech Cards */}
          <div className="relative hidden lg:col-span-4 lg:flex lg:justify-center">
            <div className="flex flex-col gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white/70
                    px-6
                    py-4
                    backdrop-blur-xl
                    shadow-lg
                    dark:border-white/10
                    dark:bg-white/5
                  "
                >
                  <span className="font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;