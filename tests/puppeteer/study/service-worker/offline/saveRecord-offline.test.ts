import { login } from "../../utils";

describe('save record offline', () => {
  const url = global.API_URL
  const record = {
    id: '1234',
  }

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login(page);
    await page.setOfflineMode(true);
    await page.reload();
  });

  afterAll(async () => {
    await page.setOfflineMode(false);
  });

  it('should post record in offline mode', async () => {
    const statusText = await page.evaluate(async (url, record) => {
      const accessToken = localStorage.getItem('accessToken');
      const response = await fetch(`${url}/records`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": `application/json`
        },
        body: JSON.stringify(record),
      });
      return response.statusText
    }, url, record)
    // expect(statusText).toBe('queued');
  });

  // it('should create queue for record in offline mode', async () => {
  //   const data = await page.evaluate(async (url) => {
  //     const accessToken = localStorage.getItem('accessToken');
  //     const response = await fetch(`${url}/records`, {
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${accessToken}`
  //       }
  //     });
  //     return response.json()
  //   }, url)
  //   expect(data).toBeTruthy();
  // });

  // it('should work finish queue in online mode', async () => {
  //   const data = await page.evaluate(async (url) => {
  //     const accessToken = localStorage.getItem('accessToken');
  //     const response = await fetch(`${url}/records`, {
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${accessToken}`
  //       }
  //     });
  //     return response.json()
  //   }, url)
  //   expect(data).toBeTruthy();
  // });
});