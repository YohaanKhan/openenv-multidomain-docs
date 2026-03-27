import { getDocBySlug, getAllDocs } from '@/lib/docs';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const categoryName = doc.category || 'Root';
  const displayCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="flex w-full h-full max-w-7xl mx-auto">
      <div className="flex-1 p-10 max-w-4xl">
        <div className="mb-8 border-b border-[#333] pb-4 flex items-center text-xs text-[#888] uppercase tracking-wide">
          <span className="cursor-pointer hover:text-white transition-colors">{displayCategory}</span>
          <span className="mx-2">/</span>
          <span className="text-[#ccc]">{doc.title}</span>
        </div>
        <MarkdownRenderer content={doc.content} />
      </div>
      <TableOfContents />
    </div>
  );
}
