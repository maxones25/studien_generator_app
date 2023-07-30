import { RequestHeader, apiRequest } from "@modules/core/utils";
import { dbPromise } from "../../indexedDB/setup";

export const fetchAndCache = async (
  endpoint: string,
  headers: RequestHeader,
) => {
  const db = await dbPromise;
  apiRequest(endpoint, {headers}).then(async (data: any) => {
    const tx = db.transaction(endpoint, 'readwrite');
    await Promise.all(data.map((record: any) => 
      tx.store.add(record)
    ));
  }).catch(() => {
  });
}
