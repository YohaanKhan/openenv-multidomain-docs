import { NextResponse } from 'next/server';
import { getAllDocs } from '@/lib/docs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  const docs = getAllDocs();
  
  const results = docs.map(doc => {
    const titleMatch = doc.title.toLowerCase().includes(query);
    const contentMatch = doc.content.toLowerCase().includes(query);
    
    let snippet = '';
    if (contentMatch && !titleMatch) {
      const idx = doc.content.toLowerCase().indexOf(query);
      const start = Math.max(0, idx - 40);
      const end = Math.min(doc.content.length, idx + query.length + 40);
      snippet = '...' + doc.content.substring(start, end).replace(/\n/g, ' ') + '...';
    }

    if (titleMatch || contentMatch) {
      return {
        slug: doc.slug,
        title: doc.title,
        category: doc.category,
        snippet,
      };
    }
    return null;
  }).filter(Boolean);

  return NextResponse.json(results.slice(0, 10));
}
