import { test, expect } from '@playwright/test';

test.describe('TurnBold Solutions - E2E Form Submission Tests', () => {

  // Teste para o Formulário de Lead na Página Inicial
  test('should successfully submit the homepage lead form', async ({ page }) => {
    await page.goto('/');

    // Rola até a seção de contato
    const contactForm = page.locator('section:has-text("Consultoria Personalizada")');
    await contactForm.scrollIntoViewIfNeeded();

    // Preenche o formulário com dados de teste
    await page.locator('input[placeholder*="Seu nome completo"]').fill('Lead Test User');
    await page.locator('input[placeholder*="Seu melhor e-mail"]').fill(`lead.test.${Date.now()}@example.com`);
    await page.locator('input[placeholder*="Seu telefone com DDD"]').fill('(11) 98765-4321');
    await page.locator('textarea[placeholder*="Conte-nos sobre seu projeto"]').fill('This is an automated test for the homepage lead form.');

    // Envia o formulário
    await page.locator('button:has-text("Solicitar Consultoria")').click();

    // Verifica a notificação de sucesso (toast)
    const successToast = page.locator('[role="status"]:has-text("Obrigado! Nossa equipe entrará em contato em breve.")');
    await expect(successToast).toBeVisible({ timeout: 10000 });
  });

  // Teste para o Formulário da Página de Contato
  test('should successfully submit the contact page form', async ({ page }) => {
    await page.goto('/contact');

    // Preenche o formulário com dados de teste
    await page.locator('input[placeholder*="Seu nome completo"]').fill('Contact Test User');
    await page.locator('input[placeholder*="seu@email.com"]').fill(`contact.test.${Date.now()}@example.com`);
    await page.locator('input[placeholder*="(11) 99999-9999"]').fill('(21) 91234-5678');
    await page.locator('input[placeholder*="Nome da sua empresa"]').fill('Test Corp');
    await page.locator('input[placeholder*="Sobre o que gostaria de conversar?"]').fill('E2E Test Inquiry');
    await page.locator('textarea[placeholder*="Conte-nos mais sobre seu projeto"]').fill('This is an automated test for the dedicated contact page form.');

    // Seleciona uma opção no dropdown de interesse
    await page.locator('button[role="combobox"]').click();
    await page.locator('div[role="option"]:has-text("Solução Personalizada")').click();

    // Envia o formulário
    await page.locator('button:has-text("Enviar Mensagem")').click();

    // Verifica a notificação de sucesso (toast)
    const successToast = page.locator('[role="status"]:has-text("Mensagem enviada com sucesso! Entraremos em contato em breve.")');
    await expect(successToast).toBeVisible({ timeout: 10000 });
  });

  // Teste para o Formulário de Briefing na Página On-Demand
  test('should successfully submit the on-demand project briefing form', async ({ page }) => {
    await page.goto('/projects/on-demand');

    // Rola até o formulário de briefing
    const briefingForm = page.locator('form:has-text("Solicite um Orçamento")');
    await briefingForm.scrollIntoViewIfNeeded();

    // Preenche o formulário com dados de teste
    await page.locator('input[placeholder*="Nome Completo"]').fill('Briefing Test User');
    await page.locator('input[placeholder*="E-mail"]').fill(`briefing.test.${Date.now()}@example.com`);
    await page.locator('input[placeholder*="Telefone"]').fill('(31) 95555-4444');
    await page.locator('input[placeholder*="Empresa"]').fill('Innovate Inc.');
    await page.locator('textarea[placeholder*="Descrição detalhada do projeto"]').fill('This is an automated test for the on-demand project briefing form.');

    // Seleciona opções nos dropdowns
    await page.locator('button:has-text("Tipo de Projeto")').click();
    await page.locator('div[role="option"]:has-text("Site/App Web")').click();

    await page.locator('button:has-text("Orçamento Estimado")').click();
    await page.locator('div[role="option"]:has-text("R$5.000 - R$15.000")').click();

    await page.locator('button:has-text("Prazo Desejado")').click();
    await page.locator('div[role="option"]:has-text("3-6 meses")').click();

    // Envia o formulário
    await page.locator('button:has-text("Enviar Briefing")').click();

    // Verifica a notificação de sucesso (toast)
    const successToast = page.locator('[role="status"]:has-text("Briefing enviado com sucesso! Nossa equipe entrará em contato em até 4 horas úteis.")');
    await expect(successToast).toBeVisible({ timeout: 10000 });
  });

});