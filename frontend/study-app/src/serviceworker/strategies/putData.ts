import { IDBPDatabase } from 'idb';
import { StrategyHandler } from 'workbox-strategies';
import { Message } from '@modules/chat/types';
import { AbstractStrategy } from './abstract';
import { addLastUpdatedParams } from '../utils/utils';

export class PutData extends AbstractStrategy {


  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string) {
    super(dbPromise, dbName, 'PUT');
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    const lastUpdated = await this.getMetaData(db); 
    const body = await request.json();
    const modifiedRequest = lastUpdated ? await addLastUpdatedParams(request, lastUpdated, body) : request.clone();
    const clone = modifiedRequest.clone();
      try {
        const response = await handler.fetch(modifiedRequest);
        return response;
      } catch (error) {
        const tx = db.transaction(this.dbName, 'readwrite');
        const store = tx.objectStore(this.dbName);
        const messages: Message[] = await store.getAll();
        const filteredMessages = messages.filter(({ participantId, readAt }) => !participantId && !readAt)
        await Promise.all(filteredMessages.map((message) => {
          return tx.store.put({
            ...message,
            ...body
          });
        }));
        if (filteredMessages.length > 0) await this.queue.pushRequest({request: clone});
        return new Response('', { status: 200, statusText: 'Queued' });
      }
  }
}