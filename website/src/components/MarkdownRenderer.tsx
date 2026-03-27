import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.css';
import CodeBlock from './CodeBlock';

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-4xl mx-auto
      prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0 prose-pre:m-0
      prose-p:text-[#cccccc] prose-headings:text-white marker:text-[#cccccc] 
      prose-a:text-[#3794ff] hover:prose-a:underline prose-a:no-underline
      prose-code:text-[#d4d4d4] prose-code:bg-[#2d2d2d] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      prose-h1:border-b prose-h1:border-[#333] prose-h1:pb-2
      prose-h2:border-b prose-h2:border-[#333] prose-h2:pb-2
      ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          pre: CodeBlock
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
