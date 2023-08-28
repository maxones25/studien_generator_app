import { dateRange, extractParams } from "../utils/utils"
import { AbstractStrategy } from "./abstract";

export class GetByDate<T extends Record<string, any>> extends AbstractStrategy {

  constructor(dbName: string, indexName: string) {
    super(dbName, 'GET', indexName);
  }

  protected async _handle(
    request: Request, 
  ): Promise<Response | undefined> {
      const db = await this.dbPromise;
      const params = extractParams(request.url);
      const data: T[] | undefined = await db.getAllFromIndex(
        this.storeName, 
        this.indexName ?? '',
        dateRange(params.get('date') ?? ''),
      );
      if (data && this.storeName === 'records') {
        const filteredData = data.filter((record) => !record.taskId);
        return new Response(JSON.stringify(filteredData));
      }
      return new Response(JSON.stringify(data));
  } 
}