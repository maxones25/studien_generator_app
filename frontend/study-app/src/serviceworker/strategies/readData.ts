import { IDBPDatabase } from 'idb';
import { Strategy, StrategyHandler } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';
import { Message } from '@modules/chat/types';
import { firstLetterToUpperCase } from '../utils/utils';

export class ReadData extends Strategy {
  private queue: Queue
  private dbPromise: Promise<IDBPDatabase>;
  private dbName: string;

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string) {
    super();
    this.dbPromise = dbPromise;
    this.dbName = dbName;
    this.queue = new Queue(`Read${firstLetterToUpperCase(dbName)}`)
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
      const tx = db.transaction(this.dbName, 'readwrite');
      const store = tx.objectStore(this.dbName);
      const messages: Message[] = await store.getAll();
      const filteredMessages = messages.filter(({ participantId, readAt }) => !participantId && !readAt)
      await Promise.all(filteredMessages.map((message) => {
        return tx.store.put({
          ...message,
          readAt: new Date(),
        });
      }));
      if (filteredMessages.length > 0) await this.queue.pushRequest({request: request});
      return new Response('', { status: 200, statusText: 'Queued' });
    }
  }
}