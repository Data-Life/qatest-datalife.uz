// Public navigation and client-side validation only; no real accounts or messages.
// Usage: node scripts/check-public-flows.cjs [path-to-playwright-module]
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.argv[2] || 'playwright');

async function main() {
  const output = path.resolve(__dirname, '../evidence', process.argv[3] || 'public-flows');
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = { startedAt: new Date().toISOString(), browser: browser.version(), checks: [] };
  async function check(id, viewport, action) {
    if (process.argv[4] && !process.argv[4].split(',').includes(id)) return;
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(60000);
    const result = { id, viewport, startedAt: new Date().toISOString(), errors: [] };
    page.on('pageerror', error => result.errors.push(error.message));
    try { await action(page, result); }
    catch (error) {
      result.automationError = error.message;
      result.pageAtError = await page.evaluate(() => ({ title: document.title, headings: [...document.querySelectorAll('h1,h2')].map(e=>e.innerText), visibleButtons: [...document.querySelectorAll('button')].filter(e=>e.getClientRects().length).map(e=>({text:e.innerText,label:e.getAttribute('aria-label'),html:e.outerHTML.slice(0,1200)})) })).catch(() => null);
    }
    try { await page.screenshot({ path: path.join(output, `${id}.png`), fullPage: false }); }
    catch (error) { result.screenshotError = error.message; }
    result.finalUrl = page.url();
    result.finishedAt = new Date().toISOString();
    report.checks.push(result);
    await fs.writeFile(path.join(output, 'observations.json'), JSON.stringify(report, null, 2) + '\n');
    await context.close();
    console.log(JSON.stringify({ id: result.id, finalUrl: result.finalUrl, automationError: result.automationError, finishedAt: result.finishedAt }));
  }
  const desktop = { width: 1440, height: 1000 };
  try {
    await check('TC-010', desktop, async (page, result) => {
      await page.goto('https://datalife.uz/', { waitUntil: 'domcontentloaded' });
      await page.getByRole('button', { name: /^Til:/ }).click();
      result.languageMenu = await page.locator('body').innerText();
      await page.screenshot({ path: path.join(output, 'language-menu.png') });
      await page.getByText("O'zbekcha", { exact: true }).click();
      await page.waitForURL(/\/uz\/?$/, { waitUntil: 'domcontentloaded' });
      await page.getByRole('button', { name: 'Til: Uzbek', exact: true }).waitFor();
      await page.getByRole('link', { name: 'Bosh sahifa', exact: true }).first().click({ trial: true });
      result.afterSwitch = { url: page.url(), lang: await page.locator('html').getAttribute('lang'), headings: await page.locator('h1,h2').allTextContents(), homeLink: await page.getByRole('link', { name: 'Bosh sahifa', exact: true }).first().innerText() };
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.getByRole('button', { name: /^Til:/ }).waitFor();
      await page.getByRole('link', { name: 'Bosh sahifa', exact: true }).first().click({ trial: true });
      await page.getByText("O'rgatamiz, chunki o'zimiz ishlab chiqamiz", { exact: true }).waitFor();
      result.afterReload = { url: page.url(), lang: await page.locator('html').getAttribute('lang'), homeLink: await page.getByRole('link', { name: 'Bosh sahifa', exact: true }).first().innerText(), hero: await page.getByText("O'rgatamiz, chunki o'zimiz ishlab chiqamiz", { exact: true }).innerText() };
    });
    await check('TC-011', { width: 390, height: 844 }, async (page, result) => {
      await page.goto('https://datalife.uz/', { waitUntil: 'domcontentloaded' });
      const menu = page.locator('button').filter({ has: page.locator('svg.lucide-menu') });
      await menu.click();
      const courses = page.getByRole('link', { name: 'Kurslar', exact: true }).filter({ visible: true });
      result.visibleCourseLinks = await courses.count();
      await page.screenshot({ path: path.join(output, 'mobile-menu-open.png') });
      await courses.first().click();
      await page.waitForURL('**/courses');
      await page.getByRole('heading', { name: 'Barlıq kurslar', exact: true }).waitFor();
      result.headings = await page.locator('h1,h2').allTextContents();
    });
    await check('TC-012', desktop, async (page, result) => {
      await page.goto('https://datalife.uz/courses', { waitUntil: 'domcontentloaded' });
      const course = page.locator('a[href="/courses/python"]').first();
      await course.waitFor();
      result.selectedCourseHref = await course.getAttribute('href');
      await course.click();
      await page.waitForURL('**/courses/python');
      await page.locator('h1').filter({ hasText: /^Python$/ }).waitFor();
      result.headings = await page.locator('h1,h2').allTextContents();
      result.mainText = (await page.locator('main').innerText()).slice(0,3500);
    });
    await check('TC-003', desktop, async (page, result) => {
      await page.goto('https://datalife.uz/login', { waitUntil: 'domcontentloaded' });
      const form = page.locator('form').filter({ has: page.locator('input[name="password"]') });
      await form.waitFor();
      result.blockedSubmissions = [];
      await page.route('**/*', async route => {
        const request = route.request();
        if (!['GET','HEAD','OPTIONS'].includes(request.method())) {
          result.blockedSubmissions.push({ method: request.method(), url: request.url().split('?')[0] });
          await route.abort();
        } else await route.continue();
      });
      await form.getByRole('button', { name: 'Kiriw', exact: true }).click();
      await page.waitForTimeout(500);
      result.fields = await form.locator('input').evaluateAll(els => els.map(el => ({ name: el.name, type: el.type, required: el.required, empty: el.value === '', valid: el.validity.valid, valueMissing: el.validity.valueMissing, validationMessage: el.validationMessage })));
      result.formText = await form.innerText();
      result.focusedField = await page.evaluate(() => document.activeElement?.getAttribute('name'));
    });
  } finally {
    report.finishedAt = new Date().toISOString();
    await fs.writeFile(path.join(output, 'observations.json'), JSON.stringify(report, null, 2) + '\n');
    await browser.close();
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
