import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="prose
    prose-zinc
    dark:prose-invert
    max-w-none
    prose-headings:font-bold
    prose-a:text-amber-500
    prose-a:no-underline
    hover:prose-a:underline
    prose-blockquote:border-amber-500">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}