import { setSwOfflineMode, login, getRequestQueueCount } from "../../utils";

describe('save record offline', () => {
  const url = global.API_URL
  const record = {
    id: '1234',
  }

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login();
    await setSwOfflineMode(true);
  });

  afterAll(async () => {
    await setSwOfflineMode(false);
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
      return response.statusText;
    }, url, record)
    expect(statusText).toBe('queued');
  });

  it('should create queue for record in offline mode', async () => {
    const count = await getRequestQueueCount();

    expect(count).toBe(1)
  });

  // it('should finish queue in online mode', async () => {
  //   await setSwOfflineMode(false);
  //   await page.reload();
  //   await page.waitForNetworkIdle();
  //   const count = await getRequestQueueCount();
  //   expect(count).toBe(0)
  // });
});