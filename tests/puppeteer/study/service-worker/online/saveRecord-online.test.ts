import { login, getStoreCount } from "../../utils";

describe('save record online', () => {
  const record = {
    id: '1234',
  };

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login();
  });

  it('should post record in online mode', async () => {
    // const statusText = await page.evaluate(async (url, record) => {
    //   const accessToken = localStorage.getItem('accessToken');
    //   const response = await fetch(`${url}/records`, {
    //     method: "POST",
    //     headers: {
    //       "Authorization": `Bearer ${accessToken}`,
    //       "Content-Type": `application/json`
    //     },
    //     body: JSON.stringify(record),
    //   });
    //   return response.statusText;
    // }, url, record);
    // expect(statusText).toBe('Created');
  });

  // it('should create record in indexedDB', async () => {
  //   const count = await getStoreCount("study-app", "records");
  //   expect(count).toBe(1);
  // })

  // it('should not create queue for record in online mode', async () => {
  //   const count = await getStoreCount("workbox-background-sync", "requests");
  //   expect(count).toBe(0);
  // });
});