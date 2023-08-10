import { login, getStoreCount } from "../../utils";

describe('get form by id', () => {

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login();
  });

  it('should get form successfully', async () => {

  });


});