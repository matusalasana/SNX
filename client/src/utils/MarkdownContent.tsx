import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <article className="prose
    prose-zinc
    dark:prose-invert
    max-w-none
    prose-headings:font-bold
    prose-a:text-amber-500
    prose-a:no-underline
    hover:prose-a:underline
    prose-blockquote:border-amber-500 mb-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </article>
  );
}