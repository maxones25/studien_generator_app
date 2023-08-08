import { Page } from "puppeteer";
import testData from "../testData";

export const testIdSelector = (testId: string) => {
  return `[data-testid="${testId}"]`;
}

export const login = async (page: Page) => {
  const url = global.API_URL;
  const loginData = {
    id: testData.participant.id,
    password: testData.participant.password
  };
  await page.evaluate(async (url, loginData) => {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": `application/json`
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken)
  }, url, loginData);
  await page.reload();
  await page.waitForNetworkIdle();
}