import Link from 'next/link';
import { getPost, getAllPosts } from '@/lib/posts';
import { getBlogPost, getAllBlogPostsMetadata } from '@/lib/database';
import { notFound } from 'next/navigation';
import { CommentSection } from '@/components/CommentSection';

export async function generateStaticParams() {
  // Generate params from both markdown posts and database blogs
  const markdownPosts = getAllPosts();
  const dbPosts = await getAllBlogPostsMetadata();
  
  const markdownParams = markdownPosts.map((post) => ({
    slug: post.slug,
  }));
  
  const dbParams = dbPosts.map((post) => ({
    slug: post.id,
  }));
  
  return [...markdownParams, ...dbParams];
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to get from markdown posts first
  let post = getPost(slug);
  let blogData = null;
  
  // If not found in markdown, try database
  if (!post) {
    blogData = getBlogPost(slug);
    if (!blogData) {
      notFound();
    }
  }

  const title = post?.title || blogData?.title;
  const author = post?.author || blogData?.author;
  const date = post?.date || blogData?.date;
  const content = post?.content;
  const excerpt = blogData?.excerpt;
  const blogId = slug;

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <Link href="/blog" className="text-blue-600 hover:text-blue-800 mb-8 inline-block font-medium flex items-center gap-2">
          <span>←</span> Back to blog
        </Link>

        {/* Article Header */}
        <div className="mb-10 animate-slideUp">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{title}</h1>
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
              {author?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{author || 'Anonymous'}</p>
              <p className="text-sm text-gray-500">
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        {content && (
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
        
        {excerpt && !content && (
          <div className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{excerpt}</p>
            <p className="text-gray-600">Full article content would appear here in a database blog.</p>
          </div>
        )}

        {/* Comments Section */}
        <CommentSection blogId={blogId} />
      </article>
    </main>
  );
}
