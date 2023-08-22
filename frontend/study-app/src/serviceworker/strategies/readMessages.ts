import { IDBPDatabase } from 'idb';
import { Strategy, StrategyHandler, StrategyOptions } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';
import { Message } from '@modules/chat/types';

export class ReadMessage extends Strategy {
  private queue = new Queue('ReadMessagesQueue');
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
    .then(async () => {
      try {
        const response = await handler.fetch(request.clone());
        return response;
      } catch (error) {
        const tx = db.transaction('chat', 'readwrite');
        const store = tx.objectStore('chat');
        const messages: Message[] = await store.getAll();
        const filteredMessages = messages.filter(({ directorName, readAt }) => directorName && !readAt)
        await Promise.all(filteredMessages.map((message) => {
          return tx.store.put({
            ...message,
            readAt: new Date(),
          });
        }));
        if (filteredMessages.length > 0) await this.queue.pushRequest({request: request});
        return new Response('', { status: 200, statusText: 'Queued' });
      }
    });
  }
}