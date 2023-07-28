import { login } from "../../utils";

describe('service worker', () => {
  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login(page);
  });

  it('caches forms', async () => {
    const hasCache = await page.evaluate(() => {
      return window.caches.has('forms');
    });
    expect(hasCache).toBe(true);
  });
});


