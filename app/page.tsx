import Link from "next/link";
import { getAllBlogPostsMetadata } from "@/lib/database";

export default async function Home() {
  const blogs = await getAllBlogPostsMetadata();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center mb-16 animate-slideUp">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stories that <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">inspire</span> and
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">connect</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover thoughtful perspectives on technology, business, health, and more. Join our community of writers and readers.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/blog"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105 active:scale-95"
            >
              Explore Blog
            </Link>
            <Link
              href="/login"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105 active:scale-95"
            >
              Write a Post
            </Link>
          </div>
        </div>

        {/* Featured Blogs Grid */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Featured Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(0, 6).map((blog, index) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="group animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-full bg-white rounded-2xl border border-gray-200 hover:border-blue-300 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Category Badge */}
                  <div className="h-24 bg-gradient-to-br from-blue-500 to-purple-500 relative group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm opacity-90">Featured</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition">
                      {blog.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                        {blog.author?.charAt(0).toUpperCase() || "A"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{blog.author || "Anonymous"}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(blog.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        {blog.commentCount} comments
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          {blogs.length > 6 && (
            <div className="text-center mt-16">
              <Link
                href="/blog"
                className="inline-block text-blue-600 hover:text-blue-700 font-semibold text-lg group"
              >
                View all stories
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200 pt-16">
          <div className="text-center animate-slideUp" style={{ animationDelay: "200ms" }}>
            <h4 className="text-4xl font-bold text-blue-600 mb-2">{blogs.length}+</h4>
            <p className="text-gray-600">Blog Posts</p>
          </div>
          <div className="text-center animate-slideUp" style={{ animationDelay: "400ms" }}>
            <h4 className="text-4xl font-bold text-purple-600 mb-2">
              {blogs.reduce((sum, blog) => sum + (blog.commentCount || 0), 0)}+
            </h4>
            <p className="text-gray-600">Community Comments</p>
          </div>
          <div className="text-center animate-slideUp" style={{ animationDelay: "600ms" }}>
            <h4 className="text-4xl font-bold text-pink-600 mb-2">1000+</h4>
            <p className="text-gray-600">Active Readers</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-4xl font-bold mb-4">Ready to share your story?</h3>
          <p className="text-lg opacity-90 mb-8">Join our community of writers and start publishing today.</p>
          <Link
            href="/login"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105 active:scale-95"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
