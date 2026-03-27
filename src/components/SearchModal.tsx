'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow closing with CMD+K if it's already open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
      
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        router.push(`/${results[selectedIndex].slug}`);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setSelectedIndex(0);
      } catch (err) {}
      setIsLoading(false);
    };
    
    const debounce = setTimeout(fetchResults, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-[#1e1e1e] border border-[#333] w-full max-w-xl rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-[#333]">
          <Search size={18} className="text-[#888] mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-[#ccc] placeholder-[#666]"
            placeholder="Search documentation..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 text-[10px] text-[#666] font-mono bg-[#2d2d2d] px-1.5 py-0.5 rounded border border-[#444]">
            ESC
          </div>
        </div>
        
        {results.length > 0 && (
          <div className="max-h-96 overflow-y-auto py-2">
            {results.map((res, idx) => (
              <div
                key={res.slug}
                className={`flex flex-col px-4 py-3 cursor-pointer ${idx === selectedIndex ? 'bg-[#2a2d2e] border-l-2 border-[#007acc]' : 'border-l-2 border-transparent hover:bg-[#2a2d2e]'}`}
                onClick={() => {
                  router.push(`/${res.slug}`);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="flex items-center text-[#ccc]">
                  <FileText size={15} className="mr-2 text-[#519aba]" />
                  <span className="font-medium text-sm">{res.title}</span>
                  {res.category && (
                    <span className="ml-2 text-[10px] text-[#666] uppercase bg-[#111] px-1.5 py-0.5 rounded border border-[#333]">{res.category}</span>
                  )}
                </div>
                {res.snippet && (
                  <div className="text-xs text-[#888] mt-1 pl-6 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                    {res.snippet}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {query && results.length === 0 && !isLoading && (
          <div className="p-8 text-center text-[#888] text-sm">
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
