// Simple in-memory session storage (for demo purposes)
// In production, use a proper database and session management

interface User {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
}

const sessions = new Map<string, User>();

export function createSession(user: User): string {
  const sessionId = Math.random().toString(36).substring(2, 15);
  sessions.set(sessionId, user);
  return sessionId;
}

export function getSession(sessionId: string): User | null {
  return sessions.get(sessionId) || null;
}

export function validateUser(firstname: string, lastname: string, email: string, username: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!firstname.trim()) errors.push('First name is required');
  if (!lastname.trim()) errors.push('Last name is required');
  if (!email.includes('@')) errors.push('Valid email is required');
  if (!username.trim() || username.length < 3) errors.push('Username must be at least 3 characters');

  return { valid: errors.length === 0, errors };
}
