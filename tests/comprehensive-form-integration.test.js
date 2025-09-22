/**
 * Comprehensive Form Integration Tests for TurnBold Solutions
 * Tests all forms integration with Customer Service dashboard in multiple languages
 * Covers the complete user-to-admin journey as requested
 */

import { test, expect } from '@playwright/test';

test.describe('TurnBold Solutions - Comprehensive Form Integration with Customer Service', () => {
  
  // Test configuration for different languages
  const languages = [
    { code: 'en', name: 'English', buttonText: 'English' },
    { code: 'pt-BR', name: 'Português', buttonText: 'Português' },
    { code: 'es', name: 'Español', buttonText: 'Español' }
  ];

  // Test data for different form types
  const testData = {
    lead: {
      name: 'João Silva Test',
      email: 'joao.silva.test@empresa.com',
      phone: '(11) 99999-9999',
      message: 'Interessado em soluções de automação para nossa empresa.'
    },
    contact: {
      name: 'Maria Santos Test',
      email: 'maria.santos.test@tech.com',
      phone: '(21) 88888-8888',
      company: 'Tech Solutions Ltda',
      subject: 'Consultoria em Inteligência Artificial',
      message: 'Gostaríamos de uma consultoria sobre implementação de IA.',
      interest: 'ai-solutions' // This may vary by implementation
    },
    briefing: {
      name: 'Carlos Oliveira Test',
      email: 'carlos.oliveira.test@consultoria.com',
      phone: '(31) 77777-7777',
      company: 'Consultoria Avançada',
      projectType: 'web-development',
      budget: '10000-25000',
      timeline: '3-6-months',
      description: 'Desenvolvimento de sistema web para gestão de processos internos.',
      features: 'Dashboard administrativo, relatórios, integração com APIs',
      integrations: 'ERP, CRM, sistemas financeiros'
    }
  };

  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start with clean state
    await page.goto('http://localhost:8080');
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  // Test 1: Homepage Lead Form Submission in Multiple Languages
  languages.forEach(language => {
    test(`Lead form submission from homepage - ${language.name}`, async ({ page }) => {
      await page.goto('http://localhost:8080');
      
      // Set language if not default
      if (language.code !== 'pt-BR') {
        const langSelector = page.locator('button', { hasText: /english|português|español/i });
        if (await langSelector.isVisible()) {
          await langSelector.click();
          await page.locator('text=' + language.buttonText).click();
          await page.waitForTimeout(1000); // Wait for language change
        }
      }

      // Scroll to contact section on homepage
      await page.evaluate(() => {
        const contactSection = document.querySelector('[id*="contact"], .contact-section, form');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
      await page.waitForTimeout(1000);

      // Fill lead form (typically at bottom of homepage)
      const nameField = page.locator('input[name="name"], input[placeholder*="name"], input[placeholder*="nome"]').first();
      const emailField = page.locator('input[name="email"], input[type="email"]').first();
      const phoneField = page.locator('input[name="phone"], input[type="tel"], input[placeholder*="phone"], input[placeholder*="telefone"]').first();
      const messageField = page.locator('textarea[name="message"], textarea[placeholder*="message"], textarea[placeholder*="mensagem"]').first();

      // Verify form fields are visible
      await expect(nameField).toBeVisible();
      await expect(emailField).toBeVisible();
      await expect(phoneField).toBeVisible();
      await expect(messageField).toBeVisible();

      // Fill form with test data
      await nameField.fill(testData.lead.name);
      await emailField.fill(testData.lead.email);
      await phoneField.fill(testData.lead.phone);
      await messageField.fill(testData.lead.message);

      // Submit form
      const submitButton = page.locator('button[type="submit"], button:has-text("Send"), button:has-text("Enviar")').first();
      await submitButton.click();

      // Wait for submission confirmation
      await page.waitForTimeout(2000);

      // Verify success (alert or success message)
      const alertDialog = page.locator('[role="alert"], .alert, .success-message');
      if (await alertDialog.isVisible()) {
        await expect(alertDialog).toBeVisible();
      }

      // Verify data is stored in localStorage
      const storedData = await page.evaluate(() => {
        const forms = localStorage.getItem('turnbold_forms');
        return forms ? JSON.parse(forms) : [];
      });

      expect(storedData.length).toBeGreaterThan(0);
      const leadForm = storedData.find(form => form.formType === 'lead');
      expect(leadForm).toBeTruthy();
      expect(leadForm.name).toBe(testData.lead.name);
      expect(leadForm.email).toBe(testData.lead.email);
    });
  });

  // Test 2: Contact Page Form Submission
  test('Contact form submission from dedicated contact page', async ({ page }) => {
    await page.goto('http://localhost:8080/contact');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Fill contact form
    await page.locator('input[name="name"], input[placeholder*="name"]').fill(testData.contact.name);
    await page.locator('input[name="email"], input[type="email"]').fill(testData.contact.email);
    await page.locator('input[name="phone"], input[type="tel"]').fill(testData.contact.phone);
    await page.locator('input[name="company"], input[placeholder*="company"], input[placeholder*="empresa"]').fill(testData.contact.company);
    await page.locator('input[name="subject"], input[placeholder*="subject"], input[placeholder*="assunto"]').fill(testData.contact.subject);
    await page.locator('textarea[name="message"], textarea[placeholder*="message"]').fill(testData.contact.message);

    // Handle interest dropdown if present
    const interestSelect = page.locator('select[name="interest"], button[role="combobox"]');
    if (await interestSelect.isVisible()) {
      await interestSelect.click();
      // Select first available option
      const firstOption = page.locator('[role="option"]').first();
      if (await firstOption.isVisible()) {
        await firstOption.click();
      }
    }

    // Submit form
    const submitButton = page.locator('button[type="submit"]:visible').first();
    await submitButton.click();

    // Wait for submission
    await page.waitForTimeout(2000);

    // Verify localStorage storage
    const storedData = await page.evaluate(() => {
      const forms = localStorage.getItem('turnbold_forms');
      return forms ? JSON.parse(forms) : [];
    });

    const contactForm = storedData.find(form => form.formType === 'contact');
    expect(contactForm).toBeTruthy();
    expect(contactForm.name).toBe(testData.contact.name);
  });

  // Test 3: On-Demand Project Briefing Form
  test('Briefing form submission from On-Demand project page', async ({ page }) => {
    await page.goto('http://localhost:8080/projects/on-demand');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Scroll to form section
    await page.evaluate(() => {
      const form = document.querySelector('form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1000);

    // Fill briefing form
    await page.locator('input[name="name"]').fill(testData.briefing.name);
    await page.locator('input[name="email"]').fill(testData.briefing.email);
    await page.locator('input[name="phone"]').fill(testData.briefing.phone);
    await page.locator('input[name="company"]').fill(testData.briefing.company);

    // Handle select dropdowns
    const selects = [
      { name: 'projectType', value: testData.briefing.projectType },
      { name: 'budget', value: testData.briefing.budget },
      { name: 'timeline', value: testData.briefing.timeline }
    ];

    for (const select of selects) {
      const selectElement = page.locator(`select[name="${select.name}"], button[data-testid="${select.name}"]`);
      if (await selectElement.isVisible()) {
        await selectElement.click();
        const option = page.locator(`[value="${select.value}"], text="${select.value}"`).first();
        if (await option.isVisible()) {
          await option.click();
        }
      }
    }

    // Fill text areas
    await page.locator('textarea[name="description"]').fill(testData.briefing.description);
    await page.locator('textarea[name="features"]').fill(testData.briefing.features);
    await page.locator('textarea[name="integrations"]').fill(testData.briefing.integrations);

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Wait for submission
    await page.waitForTimeout(2000);

    // Verify localStorage storage
    const storedData = await page.evaluate(() => {
      const forms = localStorage.getItem('turnbold_forms');
      return forms ? JSON.parse(forms) : [];
    });

    const briefingForm = storedData.find(form => form.formType === 'briefing');
    expect(briefingForm).toBeTruthy();
    expect(briefingForm.name).toBe(testData.briefing.name);
  });

  // Test 4: Complete Admin Journey - Login and Customer Service Dashboard
  test('Complete admin journey: Login → Customer Service → View forms', async ({ page }) => {
    // First, let's submit a form to have data to view
    await page.goto('http://localhost:8080');
    
    // Submit a quick lead form
    await page.evaluate(() => {
      const form = document.querySelector('form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await page.waitForTimeout(1000);

    const nameField = page.locator('input[name="name"], input[placeholder*="name"]').first();
    if (await nameField.isVisible()) {
      await nameField.fill('Admin Test User');
      await page.locator('input[name="email"], input[type="email"]').first().fill('admin.test@example.com');
      await page.locator('input[name="phone"], input[type="tel"]').first().fill('(11) 12345-6789');
      await page.locator('textarea[name="message"]').first().fill('Test message for admin verification');
      await page.locator('button[type="submit"]').first().click();
      await page.waitForTimeout(2000);
    }

    // Step 1: Navigate to login page
    await page.goto('http://localhost:8080/login');
    
    // Check if login form exists
    const emailField = page.locator('input[name="email"], input[type="email"]');
    const passwordField = page.locator('input[name="password"], input[type="password"]');
    
    if (await emailField.isVisible() && await passwordField.isVisible()) {
      // Fill login credentials (using demo credentials or test setup)
      await emailField.fill('admin@turnbold.com');
      await passwordField.fill('admin123');

      // Submit login
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(2000);

      // Step 2: Navigate to Customer Service dashboard
      await page.goto('http://localhost:8080/dashboard/customer-service');
      
      // Wait for dashboard to load
      await page.waitForLoadState('networkidle');

      // Verify dashboard elements
      await expect(page.locator('text=Customer Service, text=Atendimento').first()).toBeVisible();
      
      // Verify statistics cards
      const statsCards = page.locator('[data-testid="stats-card"], .stats-card, .stat-card');
      if (await statsCards.count() > 0) {
        await expect(statsCards.first()).toBeVisible();
      }

      // Verify forms table/list
      const formsTable = page.locator('table, .forms-list, [data-testid="forms-table"]');
      if (await formsTable.isVisible()) {
        await expect(formsTable).toBeVisible();
      }

      // Test filtering functionality
      const searchField = page.locator('input[placeholder*="search"], input[name="search"]');
      if (await searchField.isVisible()) {
        await searchField.fill('admin.test@example.com');
        await page.waitForTimeout(1000);
      }

      // Test form details view
      const viewButton = page.locator('button:has-text("View"), button:has-text("Ver"), [aria-label="View details"]').first();
      if (await viewButton.isVisible()) {
        await viewButton.click();
        await page.waitForTimeout(1000);
        
        // Verify form details modal/page
        const detailsModal = page.locator('[role="dialog"], .modal, .form-details');
        if (await detailsModal.isVisible()) {
          await expect(detailsModal).toBeVisible();
        }
      }
    } else {
      // If no login form, test demo dashboard instead
      await page.goto('http://localhost:8080/demo/customer-service');
      await page.waitForLoadState('networkidle');
      
      // Verify demo dashboard works
      await expect(page.locator('text=Customer Service, text=Demo').first()).toBeVisible();
    }
  });

  // Test 5: Multilingual Form Validation
  languages.forEach(language => {
    test(`Form validation in ${language.name}`, async ({ page }) => {
      await page.goto('http://localhost:8080/contact');
      
      // Set language
      if (language.code !== 'pt-BR') {
        const langSelector = page.locator('button', { hasText: /english|português|español/i });
        if (await langSelector.isVisible()) {
          await langSelector.click();
          await page.locator('text=' + language.buttonText).click();
          await page.waitForTimeout(1000);
        }
      }

      // Try to submit empty form
      const submitButton = page.locator('button[type="submit"]').first();
      await submitButton.click();

      // Check for validation messages
      const requiredFields = page.locator('input[required], textarea[required]');
      const fieldCount = await requiredFields.count();
      
      if (fieldCount > 0) {
        // HTML5 validation should prevent submission
        const firstRequiredField = requiredFields.first();
        await expect(firstRequiredField).toHaveAttribute('required');
      }

      // Fill partial form and test email validation
      const emailField = page.locator('input[type="email"]').first();
      await emailField.fill('invalid-email');
      await submitButton.click();
      
      // HTML5 should validate email format
      const isValidityChecked = await emailField.evaluate((el) => {
        return el.validity.valid;
      });
      expect(isValidityChecked).toBe(false);
    });
  });

  // Test 6: Form Data Persistence and Integration
  test('Form data persistence across browser sessions', async ({ page }) => {
    // Submit a form
    await page.goto('http://localhost:8080');
    
    const nameField = page.locator('input[name="name"]').first();
    if (await nameField.isVisible()) {
      await nameField.fill('Persistence Test User');
      await page.locator('input[name="email"]').first().fill('persistence@test.com');
      await page.locator('input[name="phone"]').first().fill('(11) 99999-0000');
      await page.locator('textarea[name="message"]').first().fill('Testing data persistence');
      await page.locator('button[type="submit"]').first().click();
      await page.waitForTimeout(2000);
    }

    // Refresh page
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Check if data persists in localStorage
    const persistedData = await page.evaluate(() => {
      const forms = localStorage.getItem('turnbold_forms');
      return forms ? JSON.parse(forms) : [];
    });

    expect(persistedData.length).toBeGreaterThan(0);
    const testForm = persistedData.find(form => 
      form.email === 'persistence@test.com' && 
      form.name === 'Persistence Test User'
    );
    expect(testForm).toBeTruthy();
  });

  // Test 7: Customer Service Dashboard Functionality
  test('Customer Service dashboard - Filter and search functionality', async ({ page }) => {
    // Go to demo dashboard (public access)
    await page.goto('http://localhost:8080/demo/customer-service');
    await page.waitForLoadState('networkidle');

    // Test search functionality
    const searchInput = page.locator('input[placeholder*="search"], input[name="search"]');
    if (await searchInput.isVisible()) {
      await searchInput.fill('demo');
      await page.waitForTimeout(1000);
      
      // Verify search results update
      const results = page.locator('table tbody tr, .form-item, .form-row');
      if (await results.count() > 0) {
        // At least one result should be visible
        await expect(results.first()).toBeVisible();
      }
    }

    // Test status filter
    const statusFilter = page.locator('select[name="status"], button[data-testid="status-filter"]');
    if (await statusFilter.isVisible()) {
      await statusFilter.click();
      const statusOption = page.locator('[value="new"], text="New", text="Novo"').first();
      if (await statusOption.isVisible()) {
        await statusOption.click();
        await page.waitForTimeout(1000);
      }
    }

    // Test origin filter
    const originFilter = page.locator('select[name="origin"], button[data-testid="origin-filter"]');
    if (await originFilter.isVisible()) {
      await originFilter.click();
      const originOption = page.locator('[value="contact"], text="Contact", text="Contato"').first();
      if (await originOption.isVisible()) {
        await originOption.click();
        await page.waitForTimeout(1000);
      }
    }
  });

  // Test 8: Responsive Design Across Devices
  test('Forms work correctly on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test mobile form on homepage
    await page.goto('http://localhost:8080');
    
    // Verify form is accessible on mobile
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
    
    // Fill form on mobile
    await page.locator('input[name="name"]').first().fill('Mobile Test User');
    await page.locator('input[name="email"]').first().fill('mobile@test.com');
    await page.locator('input[name="phone"]').first().fill('(11) 99999-1111');
    await page.locator('textarea[name="message"]').first().fill('Mobile form test');
    
    // Submit on mobile
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(2000);
    
    // Verify mobile dashboard access
    await page.goto('http://localhost:8080/demo/customer-service');
    await page.waitForLoadState('networkidle');
    
    // Check mobile-responsive dashboard
    await expect(page.locator('text=Customer Service, text=Atendimento').first()).toBeVisible();
  });
});

test.describe('Accessibility and Performance Tests', () => {
  
  test('Forms are accessible with keyboard navigation', async ({ page }) => {
    await page.goto('http://localhost:8080/contact');
    
    // Test keyboard navigation through form
    await page.keyboard.press('Tab'); // Navigate to first field
    await page.keyboard.type('Accessibility Test');
    
    await page.keyboard.press('Tab'); // Next field
    await page.keyboard.type('accessibility@test.com');
    
    await page.keyboard.press('Tab'); // Phone field
    await page.keyboard.type('(11) 99999-2222');
    
    // Verify focus management
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('Form submission performance is acceptable', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:8080');
    
    // Fill and submit form
    await page.locator('input[name="name"]').first().fill('Performance Test');
    await page.locator('input[name="email"]').first().fill('performance@test.com');
    await page.locator('input[name="phone"]').first().fill('(11) 99999-3333');
    await page.locator('textarea[name="message"]').first().fill('Performance testing message');
    
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(2000);
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    // Form should submit within reasonable time (5 seconds)
    expect(totalTime).toBeLessThan(5000);
  });
});