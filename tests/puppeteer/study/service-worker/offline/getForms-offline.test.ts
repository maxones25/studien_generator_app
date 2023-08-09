import { login, setSwOfflineMode } from "../../utils";

describe('service worker', () => {
  const url = global.API_URL

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
    const data = await page.evaluate(async (url) => {
      const accessToken = localStorage.getItem('accessToken')
      const response = await fetch(`${url}/forms`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      return response.json()
    }, url)
    expect(data).toBeTruthy();
  });
});