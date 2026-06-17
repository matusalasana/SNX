import { ArrowUpRight, Clock } from "lucide-react";
import { useBlogs } from "../../hooks/blogs/useBlogs";
import { Skeleton } from "../../utils/skeleton";

type BlogPost = {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  category: string;
  tags: string[];
  createdAt: string;
};

export default function BlogPosts() {
  const { data: blogs = [], isLoading } = useBlogs();

  const sortedBlogs = [...blogs].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  if (isLoading) {
    return (
      <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
        <div className="mb-14">
          <Skeleton className="h-4 w-24 mb-4" />
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-800/60 p-6"
            >
              <Skeleton className="h-5 w-40 mb-3" />
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!sortedBlogs.length) {
    return (
      <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900 text-center">
        <p className="text-zinc-500">No blog posts yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-24 border-t border-zinc-900">
      {/* Heading */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-px bg-gradient-to-r from-amber-400 to-transparent" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Writing
          </span>
        </div>

        <h2 className="text-3xl font-bold text-white">Recent Posts</h2>

        <p className="text-zinc-400 mt-3 max-w-2xl">
          Thoughts, engineering notes, and things I learn while building
          full-stack systems.
        </p>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {sortedBlogs.slice(0, 4).map((post: BlogPost) => (
          <div
            key={post.id}
            className="
              group relative overflow-hidden
              p-5 rounded-2xl
              border border-zinc-800/60
              bg-zinc-900/20
              hover:border-amber-500/30
              transition-all duration-300
            "
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 blur-3xl" />
            </div>

            <div className="relative flex items-start justify-between gap-4">
              {/* Left */}
              <div className="flex-1">
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-2">
                  <span className="text-amber-400">{post.category}</span>

                  <span>•</span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>

                  <span>•</span>

                  <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-medium group-hover:text-amber-300 transition line-clamp-1">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-zinc-400 mt-2 line-clamp-2">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags?.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="
                        text-xs px-2 py-1
                        rounded-md
                        border border-zinc-800
                        bg-zinc-900/40
                        text-zinc-400
                        hover:text-amber-300
                        hover:border-amber-500/30
                        transition
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 transition" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}