# HomeBlog

A modern blog platform built with Next.js and TypeScript, created using Model Context Protocol (MCP). This project demonstrates full-stack development with authentication, markdown support, and automated testing.

## Features

- **Markdown Blog System**: Write posts in Markdown with YAML frontmatter
- **User Authentication**: Login with firstname, lastname, email, and username
- **Blog Editor**: Authenticated users can edit and submit blog content
- **Responsive Design**: Built with Tailwind CSS for modern styling
- **Automated Testing**: Playwright test suite for all features

## Built With MCP

This project was created using the Model Context Protocol (MCP) to accelerate development with AI-assisted coding patterns and best practices.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Structure

```
app/
├── page.tsx              # Home page
├── blog/
│   ├── page.tsx          # Blog listing
│   └── [slug]/page.tsx   # Individual post
├── login/
│   └── page.tsx          # Login page
└── dashboard/
    └── page.tsx          # Post-login editor

lib/
├── posts.ts              # Blog post utilities
└── auth.ts               # Authentication helpers

posts/
└── welcome.md            # Sample blog post
```

## Features in Detail

### Blog System
- Posts stored as Markdown files in `/posts` directory
- Automatic frontmatter parsing (title, date, excerpt)
- Static generation for optimal performance

### Authentication
- User login with firstname, lastname, email, and username
- Session-based authentication
- Protected dashboard/editor routes

### Editor
- Post-login text editor for creating/editing content
- Simple submit functionality
- Form validation

## Testing

Run Playwright tests to validate all features:

```bash
npx playwright test
```

View test report:
```bash
npx playwright show-report
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Playwright Testing](https://playwright.dev)
- [Tailwind CSS](https://tailwindcss.com)

## Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```
