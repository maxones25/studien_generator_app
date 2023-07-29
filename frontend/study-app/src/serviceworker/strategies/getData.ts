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
    return handler.fetch(request)
    .then((response) => {
      if (!response.ok) 
        return new Response();
      response.json().then(async (data) => {
        const tx = db.transaction(this.dbName, 'readwrite');
        await Promise.all(data.map((record: any) => 
          tx.store.add(record)
        ));
      })
      return new Response();
    });
  }
}