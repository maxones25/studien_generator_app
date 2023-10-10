import { StrategyHandler } from 'workbox-strategies';
import { addLastUpdatedParams } from '../utils/utils';
import { AbstractStrategy } from './abstractStrategy';
import { IDBPDatabase } from 'idb';

export class GetData extends AbstractStrategy {
  constructor(dbName: string, indexName?: string) {
    super(dbName, indexName);
  }

  protected async _handle(
    request: Request,
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const newLastUpdated = new Date();
    const db = await this.dbPromise;
    const lastUpdated = await this.getMetaData(db);
    const modifiedRequest = lastUpdated
      ? await addLastUpdatedParams(request, lastUpdated)
      : request.clone();

    try {
      const response = await handler.fetch(modifiedRequest);

      if (!response.ok) {
        return this.getFromDB(db);
      }

      const data = await response.clone().json();
      await this.storeInDB(db, data);

      await this.setMetaData(db, newLastUpdated);
      return this.getFromDB(db);
    } catch (error) {
      return this.getFromDB(db);
    }
  }

  private async storeInDB(db: IDBPDatabase, data: Record<string, any>[]): Promise<void> {
    const tx = db.transaction(this.storeName, 'readwrite');
    const promises = data.map((record) => tx.store.put(record));
    await Promise.all(promises);
  }
}
