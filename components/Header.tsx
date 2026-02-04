import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-black hover:opacity-70 transition">
          HomeBlog
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/blog" className="text-sm text-gray-600 hover:text-black transition">
            Blog
          </Link>
          <Link href="/login" className="text-sm text-gray-600 hover:text-black transition">
            Login
          </Link>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:outline-2 focus:outline-blue-500">
            Skip to main content
          </a>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  About HomeBlog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <p className="text-sm text-gray-600 mb-2">Email: hello@homeblog.com</p>
            <p className="text-sm text-gray-600 mb-2">Phone: +1 (555) 123-4567</p>
            <p className="text-sm text-gray-600">Address: San Francisco, CA</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12 pb-12 border-t border-gray-200 pt-12" id="faq">
          <h3 className="font-semibold text-gray-900 mb-6 text-lg">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">How do I create a blog post?</h4>
              <p className="text-sm text-gray-600">
                Log in to your dashboard and fill out the blog creation form with title, excerpt, and content.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Is HomeBlog free?</h4>
              <p className="text-sm text-gray-600">
                Yes, HomeBlog is completely free to use. Create an account and start publishing immediately.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Can I edit my posts?</h4>
              <p className="text-sm text-gray-600">
                Currently, posts are immutable once published. We're working on edit functionality.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">How do comments work?</h4>
              <p className="text-sm text-gray-600">
                Anyone can leave comments on published posts. Comments appear immediately on the post page.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            &copy; 2026 HomeBlog. All rights reserved. Built with Next.js and ❤️
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
              Privacy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
