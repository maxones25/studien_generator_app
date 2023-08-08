import { IDBPDatabase } from 'idb';
import { Strategy, StrategyHandler } from 'workbox-strategies';

export class GetData extends Strategy {
  private dbPromise: Promise<IDBPDatabase>; 
  private dbName: string;

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string) {
    super();
    this.dbPromise = dbPromise;
    this.dbName = dbName;
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    const requestClone = request.clone()
    return handler.fetch(requestClone)
    .then(async (response) => {
      if (!response.ok) {
        return await this.getFromDB(db)
      }
      const responseClone = response.clone()
      responseClone.json().then(async (data) => {
        const tx = db.transaction(this.dbName, 'readwrite');
        await Promise.all(data.map((record: Record<string, any>) => {
          record.createdAt = new Date(record.createdAt);
          record.scheduledAt = new Date(record.scheduledAt);
          return tx.store.put(record);
        }));
      })
      return response;
    }).catch(async () => {
      return await this.getFromDB(db)
    });
  }

  private async getFromDB(db: IDBPDatabase) {
    const data = await db.getAll(this.dbName)
    return new Response(JSON.stringify(data))
  }
}