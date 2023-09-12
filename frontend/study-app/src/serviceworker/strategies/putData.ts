import { StrategyHandler } from 'workbox-strategies';
import { addLastUpdatedParams } from '../utils/utils';
import { WriteStrategy } from './writeStrategy';

export class PutData extends WriteStrategy {
  filterFunction: (entry: Record<string, any>) => boolean;

  constructor( 
    storeName: string, 
    filterFunction: (entry: Record<string, any>) => boolean
  ) {
    super(storeName, 'PUT');
    this.filterFunction = filterFunction;
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    const lastUpdated = await this.getMetaData(db); 
    const body = await request.json();
    const modifiedRequest = lastUpdated ? 
      await addLastUpdatedParams(request, lastUpdated, body) : request.clone();
    const clone = modifiedRequest.clone();
    try {
      const response = await handler.fetch(modifiedRequest);
      return response;
    } catch (error) {
      const tx = db.transaction(this.storeName, 'readwrite');
      const store = tx.objectStore(this.storeName);
      const data: Record<string, any>[] = await store.getAll();
      const filteredMessages = data.filter(this.filterFunction)
      await Promise.all(filteredMessages.map((entry) => {
        return tx.store.put({
          ...entry,
          ...body
        });
      }));
      if (filteredMessages.length > 0) await this.queue.pushRequest({request: clone});
      return new Response('', { status: 200, statusText: 'Queued' });
    }
  }
}