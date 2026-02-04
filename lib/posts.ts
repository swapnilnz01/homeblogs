import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    return getPost(slug);
  }).filter((post): post is Post => post !== null);

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert date to string if it's a Date object
    let dateStr = data.date || new Date().toISOString().split('T')[0];
    if (dateStr instanceof Date) {
      dateStr = dateStr.toISOString().split('T')[0];
    } else if (typeof dateStr !== 'string') {
      dateStr = String(dateStr);
    }

    return {
      slug,
      title: data.title || 'Untitled',
      date: dateStr,
      excerpt: data.excerpt || '',
      content,
    };
  } catch {
    return null;
  }
}
