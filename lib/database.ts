import fs from 'fs';
import path from 'path';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
}

interface BlogData {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  comments: Comment[];
}

const dataDir = path.join(process.cwd(), '.data');

// Ensure data directory exists
export function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Save blog post to database
export function saveBlogPost(blog: BlogData) {
  ensureDataDir();
  const filePath = path.join(dataDir, `${blog.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(blog, null, 2), 'utf8');
}

// Get blog post from database
export function getBlogPost(id: string): BlogData | null {
  ensureDataDir();
  const filePath = path.join(dataDir, `${id}.json`);
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch {
    return null;
  }
  return null;
}

// Get all blog posts metadata
export function getAllBlogPostsMetadata(): Array<{ id: string; title: string; excerpt: string; author: string; date: string; commentCount: number }> {
  ensureDataDir();
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  return files.map(file => {
    const data = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const blog = JSON.parse(data) as BlogData;
    return {
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      date: blog.date,
      commentCount: blog.comments?.length || 0,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Add comment to blog post
export function addCommentToBlog(blogId: string, comment: Omit<Comment, 'id' | 'date'>) {
  ensureDataDir();
  const blog = getBlogPost(blogId);
  if (!blog) return null;

  const newComment: Comment = {
    id: `comment-${Date.now()}`,
    ...comment,
    date: new Date().toISOString().split('T')[0],
  };

  if (!blog.comments) {
    blog.comments = [];
  }
  blog.comments.push(newComment);
  saveBlogPost(blog);
  return newComment;
}

// Get comments for blog post
export function getBlogComments(blogId: string): Comment[] {
  const blog = getBlogPost(blogId);
  return blog?.comments || [];
}

// Initialize sample data if it doesn't exist
export function initializeSampleData() {
  ensureDataDir();

  const sampleBlogs: BlogData[] = [
    {
      id: 'ai-in-2026',
      title: 'AI in 2026: The Year of Practical Intelligence',
      excerpt: 'Exploring the advancements and practical applications of artificial intelligence in 2026.',
      author: 'Sarah Chen',
      date: '2026-02-04',
      comments: [
        {
          id: 'comment-1',
          author: 'Alex Mitchell',
          email: 'alex@example.com',
          content: 'Great insights into the future of AI. Really looking forward to seeing these developments.',
          date: '2026-02-04',
        },
      ],
    },
    {
      id: 'cancer-and-medical',
      title: 'Cancer Research: Breakthrough Therapies of 2026',
      excerpt: 'Latest developments in cancer treatment and immunotherapy showing promising results.',
      author: 'Dr. James Rivera',
      date: '2026-02-03',
      comments: [
        {
          id: 'comment-2',
          author: 'Maria Santos',
          email: 'maria@example.com',
          content: 'This gives me hope. Thank you for sharing these important updates.',
          date: '2026-02-03',
        },
      ],
    },
    {
      id: 'tesla-stock-report',
      title: 'Tesla Stock Report Q1 2026: Growth and Innovation',
      excerpt: 'Analysis of Tesla\'s financial performance and upcoming product launches.',
      author: 'Michael Chen',
      date: '2026-02-02',
      comments: [
        {
          id: 'comment-3',
          author: 'David Park',
          email: 'david@example.com',
          content: 'Interesting analysis. The upcoming models look very promising.',
          date: '2026-02-02',
        },
      ],
    },
    {
      id: 'trumps-tariffs',
      title: 'Understanding Global Tariffs and Trade Policy in 2026',
      excerpt: 'Impact analysis of new trade policies on global markets and supply chains.',
      author: 'Economic Times',
      date: '2026-02-01',
      comments: [
        {
          id: 'comment-4',
          author: 'Emma Wilson',
          email: 'emma@example.com',
          content: 'Very comprehensive analysis. Helps understand the complex trade dynamics.',
          date: '2026-02-01',
        },
      ],
    },
    {
      id: 'social-media-addiction',
      title: 'Social Media Addiction: The Digital Wellness Crisis',
      excerpt: 'Exploring the psychological impacts of social media and strategies for healthy digital habits.',
      author: 'Dr. Lisa Anderson',
      date: '2026-01-31',
      comments: [
        {
          id: 'comment-5',
          author: 'John Thompson',
          email: 'john@example.com',
          content: 'This is such an important topic. We need more awareness about digital wellness.',
          date: '2026-01-31',
        },
      ],
    },
  ];

  // Only initialize if no data exists
  if (fs.readdirSync(dataDir).length === 0) {
    sampleBlogs.forEach(blog => saveBlogPost(blog));
  }
}
