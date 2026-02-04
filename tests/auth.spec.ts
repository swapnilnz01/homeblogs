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
