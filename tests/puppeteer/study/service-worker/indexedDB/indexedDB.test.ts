import { login } from "../../utils";

describe('service worker', () => {
  const dbName = "study-app"; 

  beforeAll(async () => {
    await page.goto(global.BASE_URL);
    await page.waitForNetworkIdle();
    await page.reload();
    await page.waitForNetworkIdle();
  });

  it("should have an IndexedDB database", async () => {
    const dbExists = await page.evaluate((dbName) => {
      return new Promise((resolve) => {
        let request = indexedDB.open(dbName);
        let existed = true;
        request.onupgradeneeded = () => {
          existed = false;
          request.transaction.abort();
        };
        request.onerror = () => resolve(existed);
        request.onsuccess = () => resolve(existed);
      });
    }, dbName);

    expect(dbExists).toBe(true);
  });

  it("should have specific object stores in the IndexedDB database", async () => {
    const expectedStores = ["forms", "tasks", "records"];

    const objectStores = await page.evaluate((dbName) => {
      return new Promise((resolve, reject) => {
        let request = indexedDB.open(dbName);
        request.onsuccess = () => {
          const storeNames = Array.from(request.result.objectStoreNames);
          resolve(storeNames);
        };
        request.onerror = (event) => {
          reject(new Error("There was an error opening the IndexedDB database."));
        };
      });
    }, dbName);

    expectedStores.forEach(store => {
      expect(objectStores).toContain(store);
    });
  });

  it("should have the correct indexes in the object stores", async () => {
    const expectedIndexesForStores = {
      "forms": ["type"],
      "tasks": ["scheduledAt", "formId"],
      "records": ["createdAt", "taskId"]
    };

    const indexesForStores = await page.evaluate((dbName, expectedIndexesForStores) => {
      return new Promise((resolve, reject) => {
        const result = {};
        const request = indexedDB.open(dbName);


        request.onsuccess = () => {
          const db = request.result;
          const transaction = db.transaction(Object.keys(expectedIndexesForStores), "readonly");
          for (const storeName of Object.keys(expectedIndexesForStores)) {
            const store = transaction.objectStore(storeName);
            result[storeName] = Array.from(store.indexNames);
          }
          transaction.oncomplete = () => resolve(result);
        };

        request.onerror = (event) => {
          reject(new Error("There was an error opening the IndexedDB database."));
        };
      });
    }, dbName, expectedIndexesForStores);

    for (const [storeName, expectedIndexes] of Object.entries(expectedIndexesForStores)) {
      expectedIndexes.forEach(indexName => {
        expect(indexesForStores[storeName]).toContain(indexName);
      });
    }
  });
});


