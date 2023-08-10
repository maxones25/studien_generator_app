import testData from "../testData";
const API_URL = global.API_URL;

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

export const getStoreCount = async (dbName: string, storeName: string) => {
  const count = await page.evaluate((dbName, storeName) => {
    return new Promise((resolve, reject) => {
      let request = indexedDB.open(dbName);
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(storeName, "readonly");
        const countRequest = transaction.objectStore(storeName).count();
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
  }, dbName, storeName);

  return count;
}

export const getData = async (endpoint: string) => {
  const url = `${API_URL}${endpoint}`
  return await page.evaluate(async (url) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    return response.json();
  }, url);
}

export const postData = async (endpoint: string, data: any) => {
  const url = `${API_URL}${endpoint}`
  return await page.evaluate(async (url, data) => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": `application/json`
      },
      body: JSON.stringify(data),
    });
    return response.statusText;
  }, url, data);
}