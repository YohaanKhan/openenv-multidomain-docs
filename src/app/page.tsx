import Link from 'next/link';
import { BookOpen, Code, Layers, Server } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-1 h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6 lowercase">
            Welcome to openenv<span className="text-[#333]">-</span><span className="text-[#519aba]">multidomain</span>
          </h1>
          <p className="text-lg text-[#aaa] leading-relaxed">
            A plugin-style, domain-pluggable LLM evaluation environment designed for deterministic resets, scalable evaluation, and strict separation of concerns.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-[#333] pb-2">Where to Start?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Link href="/project-overview" className="group p-6 rounded-xl border border-[#333] bg-[#1a1a1a] hover:bg-[#222] transition-all hover:border-[#555] shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-[#2d2d2d] group-hover:bg-[#333] text-[#519aba] mr-4 transition-colors">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-[#519aba] transition-colors">Project Overview</h3>
              </div>
              <p className="text-[#888] text-sm leading-relaxed">
                Understand the high-level goals, the evaluation pipeline, and why the multidomain approach matters.
              </p>
            </Link>

            <Link href="/architecture" className="group p-6 rounded-xl border border-[#333] bg-[#1a1a1a] hover:bg-[#222] transition-all hover:border-[#555] shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-[#2d2d2d] group-hover:bg-[#333] text-[#dcb67a] mr-4 transition-colors">
                  <Layers size={24} />
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-[#dcb67a] transition-colors">Core Architecture</h3>
              </div>
              <p className="text-[#888] text-sm leading-relaxed">
                Dive into the engine design, the plugin registry system, and the underlying repository structure.
              </p>
            </Link>

            <Link href="/saas-domain" className="group p-6 rounded-xl border border-[#333] bg-[#1a1a1a] hover:bg-[#222] transition-all hover:border-[#555] shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-[#2d2d2d] group-hover:bg-[#333] text-[#4ec9b0] mr-4 transition-colors">
                  <Code size={24} />
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-[#4ec9b0] transition-colors">SaaS Benchmark Domain</h3>
              </div>
              <p className="text-[#888] text-sm leading-relaxed">
                Explore our primary showcase domain featuring rich schemas, realistic tooling, and complex billing logic.
              </p>
            </Link>

            <Link href="/environment-api" className="group p-6 rounded-xl border border-[#333] bg-[#1a1a1a] hover:bg-[#222] transition-all hover:border-[#555] shadow-sm">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-[#2d2d2d] group-hover:bg-[#333] text-[#c586c0] mr-4 transition-colors">
                  <Server size={24} />
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-[#c586c0] transition-colors">Environment API</h3>
              </div>
              <p className="text-[#888] text-sm leading-relaxed">
                View the FastAPI endpoints used for state manipulation, baseline step generation, and environment resets.
              </p>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
