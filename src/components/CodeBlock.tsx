'use client';

import { useState, ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children?: ReactNode;
  node?: any;
}

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Robust function to recursively extract text from React children
  const extractText = (node: any): string => {
    if (!node) return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (node.props && node.props.children) return extractText(node.props.children);
    return '';
  };

  const handleCopy = () => {
    const textToCopy = extractText(children);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-5">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 p-1.5 rounded-md bg-[#2d2d2d] text-[#888] hover:text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity border border-[#444] hover:bg-[#333] z-10"
        title="Copy to clipboard"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
      </button>
      <pre {...props} className="overflow-x-auto rounded-md bg-[#1e1e1e] border border-[#333] m-0 relative">
        {children}
      </pre>
    </div>
  );
}
