import fs from 'node:fs/promises';
import path from 'node:path';

export function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

export async function takeTimestampScreenshot(
  page,
  prefix = 'afterEach-screenshot',
  folder = 'imgs',
  fullPage = true,
) {
  const outputDir = path.resolve(process.cwd(), folder);
  const filePath = path.join(outputDir, `${prefix}-${getTimestamp()}.png`);

  await fs.mkdir(outputDir, { recursive: true });
  await page.screenshot({
    path: filePath,
    fullPage,
  });

  return filePath;
}
