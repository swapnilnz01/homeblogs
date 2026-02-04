import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { getAllBlogPostsMetadata } from '@/lib/database';

export default async function BlogPage() {
  const posts = getAllPosts();
  const blogPosts = await getAllBlogPostsMetadata();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="mb-16 animate-slideUp">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">Stories & Insights</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Explore our collection of articles covering technology, business, health, and innovation. Discover perspectives that inspire and ideas that matter.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group animate-slideUp"
              style={{ animationDelay: `${(index % 6) * 100}ms` }}
            >
              <div className="h-full bg-white rounded-2xl border border-gray-200 hover:border-blue-400 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                {/* Header Background */}
                <div className="h-32 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-black transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      Featured Story
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {post.author?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{post.author || 'Anonymous'}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded whitespace-nowrap font-medium">
                      {post.commentCount || 0} comments
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-blue-600 font-semibold text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
                      Read story <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg mb-6">No blog posts yet. Be the first to publish!</p>
            <Link
              href="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
