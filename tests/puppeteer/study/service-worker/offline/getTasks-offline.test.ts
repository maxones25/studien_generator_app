import { login } from "../../utils";

describe('service worker', () => {
  const url = global.API_URL

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login(page);
    await page.setOfflineMode(true);
  });

  afterAll(async () => {
    await page.setOfflineMode(false);
  });

  it('should get tasks in offline mode', async () => {
    const data = await page.evaluate(async (url) => {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${url}/tasks`, {
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