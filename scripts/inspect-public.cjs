// Read-only discovery: opens the public homepage; does not submit forms or log in.
// Usage: node scripts/inspect-public.cjs [path-to-playwright-module]
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.argv[2] || 'playwright');

async function main() {
  const output = path.resolve(__dirname, '../evidence/public-discovery');
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = { startedAt: new Date().toISOString(), url: 'https://datalife.uz/', browser: browser.version(), observations: [] };
  try {
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
      const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [];
      const failedRequests = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('requestfailed', request => failedRequests.push({ url: request.url().split('?')[0], error: request.failure()?.errorText }));
      const response = await page.goto(report.url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.locator('h1').first().waitFor({ timeout: 15000 });
      await page.evaluate(() => document.fonts.ready);
      const content = await page.evaluate(() => ({
        title: document.title,
        language: document.documentElement.lang,
        headings: [...document.querySelectorAll('h1,h2,h3')].map(el => ({ tag: el.tagName, text: el.innerText })),
        links: [...document.querySelectorAll('a[href]')].map(el => ({ text: el.innerText || el.getAttribute('aria-label') || '', href: el.getAttribute('href') })),
        buttons: [...document.querySelectorAll('button')].map(el => ({ text: el.innerText, ariaLabel: el.getAttribute('aria-label') })),
        forms: [...document.querySelectorAll('form')].map(el => ({ fields: [...el.querySelectorAll('input,textarea,select')].map(field => ({ tag: field.tagName, type: field.type, name: field.name, required: field.required })) })),
        viewportWidth: innerWidth,
        documentWidth: document.documentElement.scrollWidth
      }));
      const screenshot = `home-${viewport.width}.png`;
      await page.screenshot({ path: path.join(output, screenshot), fullPage: true });
      report.observations.push({ capturedAt: new Date().toISOString(), viewport, finalUrl: page.url(), httpStatus: response?.status(), ...content, errors, failedRequests, screenshot });
      await context.close();
    }
  } finally {
    report.finishedAt = new Date().toISOString();
    await fs.writeFile(path.join(output, 'observations.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');
    await browser.close();
  }
  console.log(JSON.stringify({ output, observations: report.observations.map(o => ({ viewport: o.viewport, httpStatus: o.httpStatus, errors: o.errors, failedRequests: o.failedRequests })) }, null, 2));
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
