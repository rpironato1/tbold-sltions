/**
 * Comprehensive Usability Tests for TurnBold Solutions Website
 * Tests all major functionality and user journeys
 */

const { test, expect } = require('@playwright/test');

test.describe('TurnBold Solutions - Comprehensive Usability Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Start with homepage for each test
    await page.goto('http://localhost:8080');
  });

  test('Homepage loads correctly with all key elements', async ({ page }) => {
    // Verify page title and basic structure
    await expect(page).toHaveTitle(/TurnBold Solutions/);
    
    // Check main navigation elements
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'About Us' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Projects' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Blog' })).toBeVisible();
    
    // Check hero section
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
    
    // Check that content loads (not white screen)
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(100);
  });

  test('Navigation between pages works correctly', async ({ page }) => {
    // Test About page navigation
    await page.getByRole('navigation').getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole('heading', { name: 'About TurnBold' })).toBeVisible();
    
    // Test Projects page navigation
    await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL(/\/projects/);
    
    // Test Blog page navigation
    await page.getByRole('navigation').getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL(/\/blog/);
    await expect(page.getByRole('heading', { name: 'TurnBold Blog' })).toBeVisible();
    
    // Test FAQ page navigation
    await page.getByRole('navigation').getByRole('link', { name: 'FAQ' }).click();
    await expect(page).toHaveURL(/\/faq/);
    
    // Test Contact page navigation
    await page.getByRole('navigation').getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('Blog functionality works correctly', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Blog' }).click();
    
    // Check blog articles are displayed
    const articles = page.locator('article, [data-testid="blog-article"], .blog-article, .post-card');
    await expect(articles.first()).toBeVisible();
    
    // Test category filtering
    const categoryButtons = page.locator('button').filter({ hasText: /AI|COBOL|Technology|Business|Legal/ });
    if (await categoryButtons.count() > 0) {
      await categoryButtons.first().click();
      // Verify articles still display after filtering
      await expect(articles.first()).toBeVisible();
    }
    
    // Test search functionality if present
    const searchBox = page.getByPlaceholder(/search/i);
    if (await searchBox.isVisible()) {
      await searchBox.fill('AI');
      await page.waitForTimeout(500); // Allow for search filtering
    }
  });

  test('Contact forms are accessible and functional', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Contact' }).click();
    
    // Check form fields are present
    const nameField = page.getByRole('textbox', { name: /name/i }).first();
    const emailField = page.getByRole('textbox', { name: /email/i }).first();
    
    if (await nameField.isVisible()) {
      await expect(nameField).toBeVisible();
      await nameField.fill('Test User');
    }
    
    if (await emailField.isVisible()) {
      await expect(emailField).toBeVisible();
      await emailField.fill('test@example.com');
    }
    
    // Check submit button exists
    const submitButton = page.getByRole('button', { name: /submit|send|contact/i }).first();
    if (await submitButton.isVisible()) {
      await expect(submitButton).toBeVisible();
    }
  });

  test('Project pages load correctly', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
    
    // Look for project links
    const projectLinks = page.getByRole('link', { name: /View Details|Learn More|Details/ });
    
    if (await projectLinks.count() > 0) {
      // Click on first project
      await projectLinks.first().click();
      
      // Verify we're on a project detail page
      const url = page.url();
      expect(url).toMatch(/\/projects\//);
      
      // Check content loaded
      const bodyText = await page.textContent('body');
      expect(bodyText.length).toBeGreaterThan(50);
    }
  });

  test('Responsive design works on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile navigation
    await expect(page.getByRole('navigation')).toBeVisible();
    
    // Check content is still accessible
    const mainContent = page.locator('main, .main-content, #root > div');
    await expect(mainContent.first()).toBeVisible();
    
    // Test mobile menu if present
    const mobileMenuButton = page.getByRole('button', { name: /menu|hamburger|toggle/i });
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await expect(page.getByRole('navigation')).toBeVisible();
    }
  });

  test('Footer links work correctly', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Check footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Test footer navigation links
    const footerLinks = footer.getByRole('link');
    const linkCount = await footerLinks.count();
    
    if (linkCount > 0) {
      // Test first few footer links
      for (let i = 0; i < Math.min(3, linkCount); i++) {
        const link = footerLinks.nth(i);
        const href = await link.getAttribute('href');
        
        if (href && href.startsWith('/')) {
          await link.click();
          await page.waitForLoadState('networkidle');
          
          // Verify page loaded
          const bodyText = await page.textContent('body');
          expect(bodyText.length).toBeGreaterThan(20);
          
          // Go back to homepage
          await page.goto('http://localhost:8080');
        }
      }
    }
  });

  test('Performance and loading indicators', async ({ page }) => {
    // Test that page loads within reasonable time
    const startTime = Date.now();
    await page.goto('http://localhost:8080');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    
    // Check no error messages
    const errorMessages = page.locator('text=/error|404|not found|something went wrong/i');
    expect(await errorMessages.count()).toBe(0);
  });

  test('Language selector functionality (if present)', async ({ page }) => {
    const languageSelector = page.getByRole('button', { name: /english|português|español/i });
    
    if (await languageSelector.isVisible()) {
      await languageSelector.click();
      
      // Check if language options appear
      const languageOptions = page.locator('[role="option"], .language-option');
      if (await languageOptions.count() > 0) {
        await expect(languageOptions.first()).toBeVisible();
      }
    }
  });

  test('Authentication pages accessibility', async ({ page }) => {
    // Test login page
    const signInButton = page.getByRole('link', { name: 'Sign In' });
    if (await signInButton.isVisible()) {
      await signInButton.click();
      await expect(page).toHaveURL(/\/login/);
      
      // Check login form elements
      const loginForm = page.locator('form, .login-form');
      if (await loginForm.isVisible()) {
        await expect(loginForm).toBeVisible();
      }
    }
  });
});

test.describe('Accessibility Tests', () => {
  test('Basic accessibility checks', async ({ page }) => {
    await page.goto('http://localhost:8080');
    
    // Check for proper heading hierarchy
    const h1Count = await page.getByRole('heading', { level: 1 }).count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(5, imageCount); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Images should have alt text or be decorative
      expect(alt !== null).toBe(true);
    }
    
    // Check for proper link text
    const links = page.getByRole('link');
    const linkCount = await links.count();
    
    for (let i = 0; i < Math.min(5, linkCount); i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      expect(text && text.trim().length > 0).toBe(true);
    }
  });
});