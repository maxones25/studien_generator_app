import { login, getStoreCount } from "../../utils";

describe('get data by date', () => {

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await login();
  });

  it('should get taskless records successfully', async () => {

  });

  it('should get tasks successfully', async () => {

  });

  it('should get appointments successfully', async () => {

  });


});