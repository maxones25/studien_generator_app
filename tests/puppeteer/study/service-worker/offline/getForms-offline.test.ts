import { getData, login, setSwOfflineMode } from "../../utils";

describe('service worker', () => {

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login();
    await setSwOfflineMode(true);
  });

  afterAll(async () => {
    await setSwOfflineMode(false);
  });

  it('should get forms in offline mode', async () => {
    const data = await getData('/forms');
    expect(data).toBeTruthy();
  });
});