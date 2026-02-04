import { NextRequest, NextResponse } from 'next/server';
import { addCommentToBlog, getBlogComments } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comments = getBlogComments(id);
    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { author, email, content } = await request.json();

    if (!author || !email || !content) {
      return NextResponse.json(
        { error: 'Author, email, and content are required' },
        { status: 400 }
      );
    }

    const comment = addCommentToBlog(id, { author, email, content });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
