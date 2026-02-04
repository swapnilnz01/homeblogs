import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { title, excerpt, content } = await request.json();

    // Validate input
    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, excerpt, and content are required' },
        { status: 400 }
      );
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Create posts directory if it doesn't exist
    const postsDir = path.join(process.cwd(), 'posts');
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    // Create markdown file with frontmatter
    const today = new Date().toISOString().split('T')[0];
    const markdown = `---
title: ${title}
date: ${today}
excerpt: ${excerpt}
---

${content}
`;

    const filePath = path.join(postsDir, `${slug}.md`);

    // Check if post already exists
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 409 }
      );
    }

    // Write file
    fs.writeFileSync(filePath, markdown, 'utf8');

    return NextResponse.json(
      { slug, message: 'Post created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
