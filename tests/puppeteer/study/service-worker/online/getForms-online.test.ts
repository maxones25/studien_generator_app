import { getData, login } from "../../utils";

describe('service worker', () => {

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login();
  });

  it('should get forms in online mode', async () => {
    const data = await getData('/forms');
    expect(data).toBeTruthy();
  });
});