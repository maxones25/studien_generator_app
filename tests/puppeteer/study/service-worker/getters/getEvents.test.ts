import { login, getStoreCount } from "../../utils";

describe('get events', () => {

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login();
  });

  it('should get events successfully', async () => {

  });


});