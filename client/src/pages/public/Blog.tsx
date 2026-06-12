import { useMemo, useState } from "react";
import { Search, Calendar, Tag } from "lucide-react";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Building Scalable React Applications",
      excerpt:
        "Learn how to structure large React apps using clean architecture and reusable patterns.",
      category: "React",
      date: "2026-01-10",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Node.js Performance Optimization Tips",
      excerpt:
        "Improve backend performance with caching, indexing, and async patterns.",
      category: "Backend",
      date: "2026-02-05",
      readTime: "7 min",
    },
    {
      id: 3,
      title: "TypeScript Best Practices for 2026",
      excerpt:
        "Write safer and more scalable TypeScript with modern patterns.",
      category: "TypeScript",
      date: "2026-03-12",
      readTime: "6 min",
    },
    {
      id: 4,
      title: "REST API Design Principles",
      excerpt:
        "Understand how to design clean and maintainable REST APIs.",
      category: "Backend",
      date: "2026-04-01",
      readTime: "8 min",
    },
    {
      id: 5,
      title: "Modern UI Design with Tailwind CSS",
      excerpt:
        "Build beautiful and responsive interfaces faster using utility-first CSS.",
      category: "Frontend",
      date: "2026-05-18",
      readTime: "4 min",
    },
  ];

  const categories = useMemo(() => {
    const all = posts.map((p) => p.category);
    return ["All", ...Array.from(new Set(all))];
  }, [posts]);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" ||
      post.category === activeCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* HEADER */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-cyan-400">BLOG</p>

          <h1 className="mt-4 text-5xl font-black md:text-7xl">
            Articles & Insights
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-400">
            Thoughts, tutorials, and learnings about full-stack development,
            system design, and modern web technologies.
          </p>

          {/* SEARCH */}
          <div className="relative mt-12 max-w-lg">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 outline-none backdrop-blur focus:border-cyan-400"
            />
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_3fr]">
          {/* CATEGORIES */}
          <aside>
            <h2 className="mb-6 text-xl font-bold">Categories</h2>

            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    activeCategory === cat
                      ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                      : "border-white/10 text-slate-300 hover:border-cyan-400"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Tag size={16} />
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* BLOG LIST */}
          <div>
            <h2 className="mb-6 text-xl font-bold">
              Latest Posts
            </h2>

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-cyan-400"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-400">
                      {post.category}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>

                    <span>{post.readTime} read</span>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold">
                    {post.title}
                  </h3>

                  <p className="mb-6 text-slate-400 leading-7">
                    {post.excerpt}
                  </p>

                  <button className="text-cyan-400 hover:text-cyan-300">
                    Read More →
                  </button>
                </article>
              ))}

              {filteredPosts.length === 0 && (
                <div className="py-20 text-center text-slate-400">
                  No articles found.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}