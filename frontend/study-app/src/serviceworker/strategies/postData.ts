import { StrategyHandler } from "workbox-strategies";
import { IDBPDatabase } from "idb";
import { WriteStrategy } from "./writeStrategy";

export class PostData extends WriteStrategy {
  dbInsertFunction: (db: IDBPDatabase, data: Record<string, any>) => Promise<void>;
  dbRevertFunction: (db: IDBPDatabase, data: Record<string, any>) => Promise<void>;

  constructor(
    storeName: string, 
    dbInsertFunction: (db: IDBPDatabase, data: Record<string, any>) => Promise<void>,
    dbReverFunction: (db: IDBPDatabase, data: Record<string, any>) => Promise<void>,
  ) {
    super(storeName, 'POST');
    this.dbInsertFunction = dbInsertFunction;
    this.dbRevertFunction = dbReverFunction;
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    try {
      const response = await handler.fetch(request.clone());
      return response;
    } catch (error) {
      const clone = request.clone();
      return clone.json()
      .then(async (data) => {
        await this.dbInsertFunction(db, data);
        await this.queue.pushRequest({request: request});
        return new Response('', { status: 200, statusText: 'Queued' });
      });
    }
  }

}