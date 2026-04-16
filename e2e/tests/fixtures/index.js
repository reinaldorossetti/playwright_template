/* eslint-disable import/no-extraneous-dependencies */
import { test as base } from '@playwright/test';
import PageBase from '../pages/pageBase';

/**
 * @typedef {object} PageBaseFixture
 * @property {PageBase} pageBase
 */

/** @type {import('@playwright/test').TestType<
 *  import('@playwright/test').PlaywrightTestArgs &
 *  import('@playwright/test').PlaywrightTestOptions &
 *  PageBaseFixture,
 *  import('@playwright/test').PlaywrightWorkerArgs &
 *  import('@playwright/test').PlaywrightWorkerOptions
 * >} */
export const test = base.extend({
  pageBase: async ({ page }, use) => {
    const pageBase = new PageBase(page);
    await use(pageBase);
  },
});

export { expect } from '@playwright/test';
