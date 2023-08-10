import { setSwOfflineMode, login, getStoreCount, postData } from "../../utils";

describe('save record offline', () => {
  const url = global.API_URL;
  const record = {
    id: '1234',
  };

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
    const statusText = await postData('/records', record)
    expect(statusText).toBe('Queued');
  });

  it('should create record in indexedDB', async () => {
    const count = await getStoreCount("study-app", "records");
    expect(count).toBe(1);
  })

  it('should create queue for record in offline mode', async () => {
    const count = await getStoreCount("workbox-background-sync", "requests");
    expect(count).toBe(1);
  });

  // it('should finish queue in online mode', async () => {
  //   await setSwOfflineMode(false);
  //   await page.reload();
  //   await page.waitForNetworkIdle();
  //   const count = await getStoreCount();
  //   expect(count).toBe(0)
  // });
});