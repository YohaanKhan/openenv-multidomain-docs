'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    // Reset TOC when path changes
    setItems([]);
    
    // Wait for react-markdown to render headings with IDs
    const timer = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('h2[id], h3[id]'));
      const newItems = elements.map(el => ({
        id: el.id,
        text: el.textContent || '',
        level: Number(el.tagName.charAt(1)),
      }));
      setItems(newItems);

      const scrollContainer = document.querySelector('main');
      if (!scrollContainer) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        { root: scrollContainer, rootMargin: '-10% 0px -80% 0px' }
      );

      elements.forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (items.length === 0) return null;

  return (
    <div className="w-64 flex-shrink-0 hidden lg:block pl-8 pr-4 py-10">
      <div className="sticky top-10">
        <h4 className="text-xs font-semibold text-[#888] mb-4 uppercase tracking-wider">On this page</h4>
        <ul className="space-y-1.5 border-l border-[#333]">
          {items.map(item => (
            <li key={item.id} className={clsx(item.level === 3 && 'ml-3')}>
              <a
                href={`#${item.id}`}
                className={clsx(
                  'block pl-4 py-1 text-[13px] border-l -ml-px transition-colors duration-200 truncate',
                  activeId === item.id
                    ? 'border-[#007acc] text-[#fff]'
                    : 'border-transparent text-[#888] hover:text-[#ccc] hover:border-[#555]'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(`#${item.id}`);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    setActiveId(item.id);
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
