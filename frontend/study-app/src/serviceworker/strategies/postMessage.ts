import { IDBPDatabase } from 'idb';
import { Strategy, StrategyHandler, StrategyOptions } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';
import { Message } from '@modules/chat/types';

export class PostMessage extends Strategy {
  private queue = new Queue('MessagesQueue');
  private dbPromise: Promise<IDBPDatabase>;

  constructor(dbPromise: Promise<IDBPDatabase>, options?: StrategyOptions) {
    super(options);
    this.dbPromise = dbPromise;
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    const clone = request.clone()
    return clone.json()
    .then(async (data) => {
      try {
        const response = await handler.fetch(request.clone());
        return response;
      } catch (error) {
        const message: Message = data;
        await db.add("chat", {
          queued: true,
          ...message
        });
        await this.queue.pushRequest({request: request});
        return new Response('', { status: 200, statusText: 'Queued' });
      }
    });
  }
}