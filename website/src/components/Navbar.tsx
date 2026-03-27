import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="h-14 border-b border-[#333] bg-black flex items-center justify-between px-6 flex-shrink-0 z-50 shadow-sm relative">
      <div className="flex items-center">
        <Link href="/" className="text-white font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity lowercase group">
          openenv<span className="text-[#333] group-hover:text-[#555]">-</span><span className="text-[#519aba]">multidomain</span>
        </Link>
      </div>
      
      <div className="flex items-center space-x-5">
        <a 
          href="https://huggingface.co/spaces/Yokohamas/openenv-multidomain" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#888] hover:text-white transition-colors flex items-center bg-[#252526] hover:bg-[#2d2d2d] px-3 py-1.5 rounded-md border border-[#3c3c3c] text-[11px] font-medium"
        >
          <svg className="mr-2 fill-current" viewBox="0 0 100 100" width="18" height="18">
            <path d="M91.3,42.4c-0.1-0.2-1.3-3.6-4.6-6.6c-3-2.7-6.8-4-11-4c-3.1,0-5.9,0.7-8.5,2.1c-1.3-1-2.9-1.6-4.5-1.6 c-2.9,0-5.5,1.9-6.4,4.7c-1.6-1.1-3.5-1.8-5.6-1.8c-2.3,0-4.3,0.8-5.9,2.2c-0.8-2.6-3.2-4.5-6.1-4.5c-1.7,0-3.3,0.7-4.5,1.8 c-2.4-1.3-5-1.9-7.9-1.9c-4,0-7.7,1.2-10.7,3.6c-3.5,2.9-5,6.4-5.2,6.8C5,52.2,5,61.8,11.2,71.7 c3.5,5.6,8.7,9.3,15.1,10.7c2.1,0.5,4.3,0.7,6.4,0.7c4.6,0,8.9-1,12.7-3c1.5,1,3.2,1.5,5,1.5c1.8,0,3.5-0.5,5-1.5 c3.8,1.9,8.1,3,12.7,3c2.1,0,4.3-0.2,6.4-0.7c6.4-1.4,11.6-5.1,15.1-10.7C100,61.8,100,52.2,91.3,42.4z M40.7,46.5 c2.1,0,3.8,1.7,3.8,3.8s-1.7,3.8-3.8,3.8c-2.1,0-3.8-1.7-3.8-3.8S38.6,46.5,40.7,46.5z M47.8,66.6c-1.2,1.3-3.1,2.1-5,2.1 c-1.9,0-3.8-0.8-5-2.1c-1.5-1.7-1.5-4.4,0.1-6.1c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.2-0.2,0.4-0.2c1.1-0.9,2.6-1.4,4.2-1.4 c1.6,0,3.1,0.5,4.2,1.4c0.1,0.1,0.2,0.1,0.3,0.2c0.1,0.1,0.2,0.2,0.3,0.3C49.3,62.1,49.2,64.9,47.8,66.6z M59.3,54.1 c-2.1,0-3.8-1.7-3.8-3.8s1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8S61.4,54.1,59.3,54.1z M67.5,66.6c-1.2,1.3-3.1,2.1-5,2.1 c-1.9,0-3.8-0.8-5-2.1c-1.5-1.7-1.5-4.4,0.1-6.1c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.2-0.2,0.4-0.2c1.1-0.9,2.6-1.4,4.2-1.4 c1.6,0,3.1,0.5,4.2,1.4c0.1,0.1,0.2,0.1,0.3,0.2c0.1,0.1,0.2,0.2,0.3,0.3C69,62.1,68.9,64.9,67.5,66.6z"/>
          </svg>
          HF Space
        </a>
        <a 
          href="https://github.com/YohaanKhan/openenv_multidomain" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#888] hover:text-white transition-colors pb-0.5"
          aria-label="GitHub Repository"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
      </div>
    </header>
  );
}
