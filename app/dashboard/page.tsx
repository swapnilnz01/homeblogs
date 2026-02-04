'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user from session
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      // For demo purposes, allow access anyway
      // In production, redirect to login
    }

    // In a real app, fetch user from API using sessionId
    // For demo, we'll show a generic user
    setUser({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      username: 'johndoe',
    });
    setIsLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setContent('');
      setSubmitted(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('sessionId');
    router.push('/login');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">HomeBlog Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {user.firstname} {user.lastname}</p>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/blog" className="text-blue-600 hover:text-blue-800">
              View Blog
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">First Name</p>
                <p className="font-medium text-gray-800">{user.firstname}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Name</p>
                <p className="font-medium text-gray-800">{user.lastname}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Username</p>
                <p className="font-medium text-gray-800">{user.username}</p>
              </div>
            </div>
          </div>

          <hr className="my-8" />

          <div>
            <h2 className="text-xl font-semibold mb-4">Create Content</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content Editor
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  data-testid="content-editor"
                  className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="Write your blog post, notes, or any content here..."
                />
              </div>

              <button
                type="submit"
                disabled={!content.trim()}
                data-testid="submit-button"
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded transition duration-200"
              >
                Submit
              </button>
            </form>

            {submitted && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded text-green-700">
                ✓ Content submitted successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
