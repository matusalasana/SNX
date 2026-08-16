import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="prose max-w-none text-content prose-headings:heading prose-a:text-secondary hover:prose-a:underline prose-a:no-underline prose-blockquote:border-border mb-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
