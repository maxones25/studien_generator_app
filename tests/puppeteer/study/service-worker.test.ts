describe('Google', () => {
  beforeAll(async () => {
    await page.goto(global.BASE_URL);
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Vite + React + TS');
  });
});