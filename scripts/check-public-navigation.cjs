// Read-only navigation checks. No forms are submitted and no account is created.
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.argv[2] || 'playwright');

async function main() {
  const output = path.resolve(__dirname, '../evidence/public-navigation');
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = { startedAt: new Date().toISOString(), browser: browser.version(), checks: [] };
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto('https://datalife.uz/', { waitUntil: 'networkidle' });
    // Trigger viewport-based reveal animations before capturing the whole page.
    for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 700) {
      await page.evaluate(pos => window.scrollTo(0, pos), y);
      await page.waitForTimeout(150);
    }
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(output, 'home-desktop-after-scroll.png'), fullPage: true });
    for (const label of ['Qupıyalıq', 'Paydalanıw shártleri', 'Cookie']) {
      const link = page.getByRole('link', { name: label, exact: true });
      const beforeText = await page.locator('body').innerText();
      const beforePages = page.context().pages().length;
      await link.click();
      await page.waitForTimeout(600);
      report.checks.push({ name: 'Footer link', label, href: await link.getAttribute('href'), finalUrl: page.url(), bodyTextChanged: beforeText !== await page.locator('body').innerText(), openedNewPage: page.context().pages().length > beforePages, visibleDialogs: await page.locator('[role="dialog"]:visible,dialog[open]').count() });
    }
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(output, 'footer-after-clicks.png') });
    await page.goto('https://datalife.uz/login', { waitUntil: 'networkidle' });
    await page.locator('input').first().waitFor();
    report.checks.push({ name: 'Login page', url: page.url(), title: await page.title(), headings: await page.locator('h1,h2').allTextContents(), fields: await page.locator('input').evaluateAll(els => els.map(el => ({ type: el.type, name: el.name, placeholder: el.placeholder }))), buttons: await page.getByRole('button').allTextContents() });
    await page.screenshot({ path: path.join(output, 'login-desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('https://datalife.uz/', { waitUntil: 'networkidle' });
    for (let y = 0; y < await page.evaluate(() => document.documentElement.scrollHeight); y += 650) {
      await page.evaluate(pos => window.scrollTo(0, pos), y);
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(output, 'home-mobile-after-scroll.png'), fullPage: true });
    report.checks.push({ name: 'Mobile width after scroll', ...await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth })) });
  } finally {
    report.finishedAt = new Date().toISOString();
    await fs.writeFile(path.join(output, 'observations.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');
    await browser.close();
  }
  console.log(JSON.stringify(report, null, 2));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
