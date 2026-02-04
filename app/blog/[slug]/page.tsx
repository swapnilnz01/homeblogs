import Link from 'next/link';
import { getPost, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-2xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Back to blog
        </Link>

        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-8">{post.date}</p>

        <div className="prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </main>
  );
}
