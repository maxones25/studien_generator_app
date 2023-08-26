import { StrategyHandler } from 'workbox-strategies';
import { AbstractStrategy } from './abstract';
import { addLastUpdatedParams } from '../utils/utils';

export class DeleteData extends AbstractStrategy {

  constructor(storeName: string) {
    super(storeName, 'DELETE');
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    await db.clear(this.storeName);
    const lastUpdated = await this.getMetaData(db); 
    const body = await request.json();
    const modifiedRequest = lastUpdated ? await addLastUpdatedParams(request, lastUpdated, body) : request.clone();
    const clone = modifiedRequest.clone();
    try {
      const response = await handler.fetch(modifiedRequest);
      return response;
    } catch (error) {
      await this.queue.pushRequest({request: clone});
      return new Response('', { status: 200, statusText: 'Queued' });
    }
  }
}