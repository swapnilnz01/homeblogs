import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">HomeBlog</h1>
          <div className="flex gap-6">
            <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
              Blog
            </Link>
            <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Welcome to HomeBlog</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            A modern blogging platform built with Next.js, featuring user authentication, markdown support, and a content editor. Created using Model Context Protocol (MCP).
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/blog"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Read Blog
            </Link>
            <Link
              href="/login"
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
