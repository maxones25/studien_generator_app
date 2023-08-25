import { IDBPDatabase } from 'idb';
import { StrategyHandler } from 'workbox-strategies';
import { addLastUpdatedParams } from '../utils/utils';
import { AbstractStrategy } from './abstract';

export class GetData extends AbstractStrategy {

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string) {
    super(dbPromise, dbName, 'GET');
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    // create new last updated date to set at the end. Important to do it now 
    // so you don't run the risk of it being newer than the actual data
    const newLastUpdated = new Date();
    const db = await this.dbPromise;
    const lastUpdated = await this.getMetaData(db); 
    const modifiedRequest = lastUpdated ? await addLastUpdatedParams(request, lastUpdated) : request.clone();
    return handler.fetch(modifiedRequest)
    .then(async (response) => {
      if (!response.ok) {
        return await this.getFromDB(db);
      }
      const responseClone = response.clone()
      await responseClone.json().then(async (data) => {
        const tx = db.transaction(this.dbName, 'readwrite');
        await Promise.all(data.map((record: Record<string, any>) => {
          if (record.createdAt) record.createdAt = new Date(record.createdAt);
          if (record.scheduledAt) record.scheduledAt = new Date(record.scheduledAt);
          if (record.start) record.start = new Date(record.start);
          return tx.store.put(record);
        }));
      })
      await this.setMetaData(db, newLastUpdated);
      return await this.getFromDB(db);
    }).catch(async () => {
      return await this.getFromDB(db);
    });
  }
}