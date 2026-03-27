import fs from 'fs';
import path from 'path';

// The docs directory is one level up from the website directory
const docsDirectory = path.join(process.cwd(), '../docs');

export interface DocFile {
  slug: string;
  title: string;
  category: string;
  content: string;
}

export interface SidebarCategory {
  name: string;
  files: DocFile[];
}

export function getAllDocs(): DocFile[] {
  if (!fs.existsSync(docsDirectory)) return [];
  
  const fileNames = fs.readdirSync(docsDirectory);
  const docs = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(docsDirectory, fileName);
      const content = fs.readFileSync(fullPath, 'utf8');

      // Simple category extraction based on prefix
      const knownCategories = ['hr', 'legal', 'saas', 'server', 'project'];
      let category = ''; // No folder by default, just root level
      let title = slug;
      
      const parts = slug.split('-');
      if (parts.length > 1 && knownCategories.includes(parts[0])) {
        category = parts[0];
        title = parts.slice(1).join('-');
      }

      // Keep original file name as title to match the VS Code look
      title = fileName;

      return {
        slug,
        title,
        category,
        content,
      };
    });

  return docs;
}

export function getSidebarCategories(): SidebarCategory[] {
  const docs = getAllDocs();
  const categoriesMap: Record<string, DocFile[]> = {};

  docs.forEach(doc => {
    if (!categoriesMap[doc.category]) {
      categoriesMap[doc.category] = [];
    }
    categoriesMap[doc.category].push(doc);
  });

  // Convert to array and sort
  const categories = Object.keys(categoriesMap).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    files: categoriesMap[key].sort((a, b) => a.title.localeCompare(b.title))
  }));

  // Sort categories: "Root" or similar could go first, otherwise alphabetical
  categories.sort((a, b) => {
    if (a.name === 'Root') return -1;
    if (b.name === 'Root') return 1;
    return a.name.localeCompare(b.name);
  });

  return categories;
}

export function getDocBySlug(slug: string): DocFile | null {
  const docs = getAllDocs();
  return docs.find((doc) => doc.slug === slug) || null;
}
