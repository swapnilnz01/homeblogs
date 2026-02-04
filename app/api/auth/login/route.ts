import { NextRequest, NextResponse } from 'next/server';
import { validateUser, createSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, email, username } = await request.json();

    const { valid, errors } = validateUser(firstname, lastname, email, username);

    if (!valid) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const sessionId = createSession({
      firstname,
      lastname,
      email,
      username,
    });

    return NextResponse.json({ sessionId }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { errors: ['An error occurred'] },
      { status: 500 }
    );
  }
}
