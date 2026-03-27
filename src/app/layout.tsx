import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { getSidebarCategories } from '@/lib/docs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpenEnv Multidomain Docs',
  description: 'Documentation site for OpenEnv Multidomain Engine.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getSidebarCategories();
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full overflow-hidden flex flex-col bg-[#1e1e1e] text-[#cccccc]`}>
        <Navbar />
        <div className="flex-1 flex overflow-hidden w-full">
          <Sidebar categories={categories} />
          <main className="flex-1 h-full overflow-y-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
