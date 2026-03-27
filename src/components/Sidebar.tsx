'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronDown, FileText, Folder, FolderOpen, Search } from 'lucide-react';
import { SidebarCategory, DocFile } from '@/lib/docs';
import clsx from 'clsx';
import SearchModal from './SearchModal';

export default function Sidebar({ categories }: { categories: SidebarCategory[] }) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // By default, keep folders closed unless it contains the active file
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    categories.forEach(cat => {
      const isActive = cat.files.some(f => `/${f.slug}` === pathname);
      if (isActive) {
        initial[cat.name] = true;
      }
    });
    return initial;
  });

  const toggleFolder = (name: string) => {
    setOpenFolders(prev => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const rootDocs = categories.find(c => c.name === 'Root' || c.name === '')?.files || [];
  const folderCategories = categories.filter(c => c.name && c.name !== 'Root');

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <div className="w-64 bg-[#181818] border-r border-[#2b2d31] flex-shrink-0 flex flex-col h-full text-[#cccccc] text-sm select-none">
        
        <div className="p-4 border-b border-[#2b2d31]">
          <div className="text-xs font-semibold tracking-wider text-[#999999] uppercase mb-3">
            OpenEnv Multidomain
          </div>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center justify-between w-full bg-[#252526] hover:bg-[#2d2d2d] border border-[#3c3c3c] rounded px-3 py-1.5 transition-colors text-xs text-[#999]"
          >
            <div className="flex items-center">
              <Search size={14} className="mr-2" />
              <span>Search</span>
            </div>
            <div className="flex gap-0.5">
              <span className="bg-[#1e1e1e] rounded px-[3px] border border-[#333] font-mono text-[9px]">⌘</span>
              <span className="bg-[#1e1e1e] rounded px-[3px] border border-[#333] font-mono text-[9px]">K</span>
            </div>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-2">
        {folderCategories.map(category => (
          <div key={category.name} className="flex flex-col">
            <div 
              className="flex items-center px-4 py-[6px] cursor-pointer hover:bg-[#2a2d2e] group"
              onClick={() => toggleFolder(category.name)}
            >
              <div className="mr-1 text-[#cccccc] group-hover:text-white transition-colors">
                {openFolders[category.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <div className="mr-2 text-[#dcb67a]">
                {openFolders[category.name] ? <FolderOpen size={16} /> : <Folder size={16} />}
              </div>
              <span className="truncate font-medium">{category.name}</span>
            </div>
            
            {openFolders[category.name] && (
              <div className="flex flex-col mt-1 mb-1">
                {category.files.map(file => (
                  <FileLink key={file.slug} file={file} pathname={pathname} indent />
                ))}
              </div>
            )}
          </div>
        ))}

        {rootDocs.length > 0 && (
          <div className="mt-4 border-t border-[#2b2d31] pt-4">
            <div className="px-5 pb-2 text-xs font-semibold tracking-wider text-[#999999] uppercase">
              Root Files
            </div>
            {rootDocs.map(file => (
              <FileLink key={file.slug} file={file} pathname={pathname} />
            ))}
          </div>
        )}
      </div>
      </div>
    </>
  );
}

function FileLink({ file, pathname, indent = false }: { file: DocFile; pathname: string; indent?: boolean }) {
  const href = `/${file.slug}`;
  const isActive = pathname === href || (pathname === '/' && file.slug === 'project-overview');

  return (
    <Link 
      href={href}
      className={clsx(
        "flex items-center py-[6px] pr-4 cursor-pointer group decoration-transparent relative transition-colors",
        indent ? "pl-11" : "pl-5",
        isActive ? "bg-[#37373d] text-white" : "hover:bg-[#2a2d2e]"
      )}
    >
      <div className="mr-2 text-[#519aba]">
        <FileText size={16} />
      </div>
      <span className={clsx("truncate", isActive ? "text-white" : "text-[#cccccc]")}>
        {file.title}
      </span>
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#007acc]" />
      )}
    </Link>
  );
}
