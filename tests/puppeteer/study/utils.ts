import { Page } from "puppeteer";
import testData from "../testData";

export const testIdSelector = (testId: string) => {
  return `[data-testid="${testId}"]`;
}

export const login = async (page: Page) => {
  await page.click(testIdSelector('id-input'));
  await page.keyboard.type(testData.participant.id);
  await page.click(testIdSelector('password-input'));
  await page.keyboard.type(testData.participant.password);
  await page.click(testIdSelector('login-submit-button'));
  await page.waitForNavigation();
  expect(page.url()).toEqual(`${global.BASE_URL}/`);
}