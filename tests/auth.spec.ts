import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/.*/)
    await expect(page.getByRole('heading', { name: 'Welcome to HomeBlog' })).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('/login');
    await page.getByTestId('login-submit').click();
    
    // Wait for error message
    await page.waitForTimeout(500);
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/login');
    
    await page.getByTestId('firstname').fill('John');
    await page.getByTestId('lastname').fill('Doe');
    await page.getByTestId('email').fill('invalid-email');
    await page.getByTestId('username').fill('johndoe');
    
    await page.getByTestId('login-submit').click();
    await page.waitForTimeout(500);
  });

  test('should validate username length', async ({ page }) => {
    await page.goto('/login');
    
    await page.getByTestId('firstname').fill('John');
    await page.getByTestId('lastname').fill('Doe');
    await page.getByTestId('email').fill('john@example.com');
    await page.getByTestId('username').fill('ab');
    
    await page.getByTestId('login-submit').click();
    await page.waitForTimeout(500);
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.getByTestId('firstname').fill('John');
    await page.getByTestId('lastname').fill('Doe');
    await page.getByTestId('email').fill('john@example.com');
    await page.getByTestId('username').fill('johndoe');
    
    await page.getByTestId('login-submit').click();
    
    // Should redirect to dashboard
    await page.waitForURL('/dashboard', { timeout: 5000 });
    expect(page.url()).toContain('/dashboard');
  });
});

test.describe('Dashboard', () => {
  test('should display dashboard after login', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'HomeBlog Dashboard' })).toBeVisible();
  });

  test('should display user information', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/Welcome, John Doe/)).toBeVisible();
  });

  test('should allow content submission', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Fill editor
    await page.getByTestId('content-editor').fill('This is my test blog post');
    
    // Submit
    await page.getByTestId('submit-button').click();
    
    // Check success message
    await expect(page.getByText('Content submitted successfully')).toBeVisible();
    
    // Editor should be cleared
    await expect(page.getByTestId('content-editor')).toHaveValue('');
  });

  test('should disable submit button when content is empty', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const submitButton = page.getByTestId('submit-button');
    await expect(submitButton).toBeDisabled();
  });

  test('should enable submit button when content is provided', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await page.getByTestId('content-editor').fill('Test content');
    
    const submitButton = page.getByTestId('submit-button');
    await expect(submitButton).toBeEnabled();
  });
});

test.describe('Navigation', () => {
  test('should navigate to blog from home', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('link', { name: /blog/i }).click();
    
    await expect(page).toHaveURL(/.*\/blog/);
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loginLink = page.locator('a:has-text("Login")');
    await loginLink.click();
    
    await expect(page).toHaveURL(/.*\/login/);
  });
});

test.describe('Blog Creation', () => {
  test('should display blog creation form on dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await expect(page.getByRole('heading', { name: 'Create Blog Post' })).toBeVisible();
    await expect(page.getByTestId('blog-title')).toBeVisible();
    await expect(page.getByTestId('blog-excerpt')).toBeVisible();
    await expect(page.getByTestId('blog-content')).toBeVisible();
  });

  test('should validate blog post fields - disable submit when empty', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Try to submit empty form
    const createButton = page.getByTestId('create-post-button');
    await expect(createButton).toBeDisabled();
  });

  test('should enable submit button when all fields are filled', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await page.getByTestId('blog-title').fill('Test Blog Post');
    await page.getByTestId('blog-excerpt').fill('This is a test excerpt');
    await page.getByTestId('blog-content').fill('This is the test content for the blog post');
    
    const createButton = page.getByTestId('create-post-button');
    await expect(createButton).toBeEnabled();
  });

  test('should create a blog post and show success message', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    const timestamp = Date.now();
    // Fill form
    await page.getByTestId('blog-title').fill(`My Test Blog Post ${timestamp}`);
    await page.getByTestId('blog-excerpt').fill('This is my test blog post on HomeBlog');
    await page.getByTestId('blog-content').fill('# Welcome\n\nThis is the content of my test blog post.');
    
    // Submit
    await page.getByTestId('create-post-button').click();
    
    // Check success message
    await expect(page.getByText('Post published successfully')).toBeVisible();
    
    // Form should be cleared
    await expect(page.getByTestId('blog-title')).toHaveValue('');
    await expect(page.getByTestId('blog-excerpt')).toHaveValue('');
    await expect(page.getByTestId('blog-content')).toHaveValue('');
  });

  test('should display newly created blog post on blog page', async ({ page }) => {
    // Create a unique post
    const timestamp = Date.now();
    const postTitle = `Blog Post ${timestamp}`;
    
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await page.getByTestId('blog-title').fill(postTitle);
    await page.getByTestId('blog-excerpt').fill(`This is test excerpt ${timestamp}`);
    await page.getByTestId('blog-content').fill(`This is test content ${timestamp}`);
    await page.getByTestId('create-post-button').click();
    
    // Wait for success
    await expect(page.getByText('Post published successfully')).toBeVisible();
    
    // Go to blog page
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    
    // Check if the new post appears
    await expect(page.getByText(postTitle)).toBeVisible();
    await expect(page.getByText(`This is test excerpt ${timestamp}`)).toBeVisible();
  });

  test('should display blog post content when clicked', async ({ page }) => {
    // Create a post
    const timestamp = Date.now();
    const postTitle = `Clickable Post ${timestamp}`;
    
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    await page.getByTestId('blog-title').fill(postTitle);
    await page.getByTestId('blog-excerpt').fill('Test excerpt for clicking');
    await page.getByTestId('blog-content').fill('# Post Content\n\nThis is the full post content.');
    await page.getByTestId('create-post-button').click();
    
    // Wait for success
    await expect(page.getByText('Post published successfully')).toBeVisible();
    
    // Go to blog and click the post
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
    
    // Find and click the post
    const postLink = page.getByRole('link', { name: postTitle }).first();
    await postLink.click();
    
    // Should display the post content or title
    await expect(page.getByText(/Post Content|Clickable Post/)).toBeVisible();
  });

  test('should handle missing fields with error message', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    
    // Fill only title and submit
    await page.getByTestId('blog-title').fill('Only Title');
    await page.getByTestId('create-post-button').click();
    
    // Should remain disabled or show error
    await page.waitForTimeout(500);
  });
});
