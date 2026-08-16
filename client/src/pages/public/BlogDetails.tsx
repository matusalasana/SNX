import { useParams, Link, useNavigate } from "react-router-dom";
import { useBlog } from "../../hooks/blogs/useBlog";
import { Clock, ArrowLeft, Star } from "lucide-react";
import { Skeleton } from "../../utils/skeleton";
import MarkdownContent from "../../utils/MarkdownContent";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading } = useBlog(id!);

  if (isLoading) return <BlogDetailsSkeleton />;

  if (!blog) {
    return (
      <div className="grid-center container-custom section text-center">
        <p className="subheading">Blog post not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="btn-ghost text-primary mt-4"
        >
          <ArrowLeft className="h-4 w-4" /> Go back
        </button>
      </div>
    );
  }

  return (
    <article className="container-custom section max-w-3xl">
      <div className="flex-start mb-10 gap-4 text-xs">
        <Link
          to="/blog"
          className="link flex-start gap-1"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Articles
        </Link>
        <span className="subheading">
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Header */}
      <header className="mb-10 space-y-4">
        {/* META */}
        <div className="flex-start flex-wrap gap-3 text-xs">
          <span className="subheading flex-start gap-1">
            <Clock className="h-3.5 w-3.5" />
            {blog.readTime}
          </span>
          {blog.category && (
            <span className="badge-success uppercase tracking-wider font-medium">
              {blog.category}
            </span>
          )}
          {blog.featured && (
            <span className="badge-warning flex-start gap-1">
              <Star className="h-3 w-3 fill-current" /> Featured
            </span>
          )}
        </div>

        {/* TITLE */}
        <h1 className="heading text-3xl sm:text-4xl">
          {blog.title}
        </h1>
      </header>

      {/* Thumbnail */}
      {blog.thumbnailUrl && (
        <img
          src={blog.thumbnailUrl}
          alt={blog.title}
          className="image image-cover max-h-[450px]"
        />
      )}

      {/* Content */}
      <MarkdownContent content={blog.content} />

      {/* Tags */}
      <div className="mt-10 flex flex-wrap gap-2">
        {(blog.tags ?? []).map((tag: string) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="card mt-16 p-8">
        <h3 className="heading mb-2 text-lg">
          Enjoyed this article?
        </h3>
        <p className="subheading mb-4 text-sm">
          Let’s connect and build something interesting together.
        </p>
        <Link to="/contact" className="btn-primary inline-flex">
          Contact Me
        </Link>
      </div>
    </article>
  );
}

const BlogDetailsSkeleton = () => (
  <div className="container-custom section max-w-3xl space-y-6">
    <Skeleton className="skeleton h-6 w-32" />
    <Skeleton className="skeleton h-12 w-full" />
    <Skeleton className="skeleton h-64 w-full rounded-2xl" />
    <Skeleton className="skeleton h-40 w-full" />
  </div>
);
