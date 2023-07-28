describe('service worker', () => {
  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
  });

  it('service worker is registered', async () => {
    const registrations = await page.evaluate(async () => {
      if (navigator.serviceWorker) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        return registrations;
      }
    });
    expect(registrations.length).toEqual(1);
  });

  it('service worker is activated', async () => {
    const serviceWorker = await page.evaluate(() => {
      if (navigator.serviceWorker) {
          return navigator.serviceWorker.controller.state;
      }
    });
    expect(serviceWorker).toEqual('activated');
  });
});