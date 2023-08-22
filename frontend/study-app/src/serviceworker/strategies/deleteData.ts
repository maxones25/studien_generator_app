import { IDBPDatabase } from 'idb';
import { Strategy, StrategyHandler } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';
import { firstLetterToUpperCase } from '../utils/utils';

export class DeleteData extends Strategy {
  private queue: Queue;
  private dbPromise: Promise<IDBPDatabase>;
  private dbName: string;

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string) {
    super();
    this.dbPromise = dbPromise;
    this.dbName = dbName;
    this.queue = new Queue(`Delete${firstLetterToUpperCase(dbName)}`)
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    await db.clear(this.dbName);
    try {
      const response = await handler.fetch(request.clone());
      return response;
    } catch (error) {
      await this.queue.pushRequest({request: request});
      return new Response('', { status: 200, statusText: 'Queued' });
    }
  }
}