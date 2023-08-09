import { Browser, Page } from "puppeteer";
import testData from "../testData";

export const testIdSelector = (testId: string) => {
  return `[data-testid="${testId}"]`;
}

export const login = async () => {
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

export const setSwOfflineMode = async (value: boolean) => {
  await page.setOfflineMode(value);
  const targets = browser.targets();
  const serviceWorker = targets.find((t) => t.type() === 'service_worker');
  const serviceWorkerConnection = await serviceWorker.createCDPSession();
  await serviceWorkerConnection.send('Network.enable');
  await serviceWorkerConnection.send('Network.emulateNetworkConditions', {
    offline: value,
    latency: 0,
    downloadThroughput: 0,
    uploadThroughput: 0,
  });
}

export const getRequestQueueCount = async () => {
  const count = await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open("workbox-background-sync");
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("requests", "readonly");
        const countRequest = transaction.objectStore("requests").count();
        countRequest.onsuccess = function() {
          resolve(countRequest.result);
        };

        countRequest.onerror = function() {
          reject(new Error('Fehler beim Zählen der Einträge.'));
        };
      };
      request.onerror = (event) => {
        reject(new Error("There was an error opening the IndexedDB database."));
      };
    });
  });

  return count;
}