import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 mb-8">Welcome to my blog. Here you'll find articles about web development, technology, and more.</p>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-8">
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm mb-3">{post.date}</p>
              <p className="text-gray-700">{post.excerpt}</p>
              <Link 
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium mt-4 inline-block"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
