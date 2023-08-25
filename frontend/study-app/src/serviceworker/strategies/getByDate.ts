import { IDBPDatabase } from "idb";
import { dateRange, extractParams } from "../utils/utils"
import { Strategy } from 'workbox-strategies';

export class GetByDate<T extends Record<string, any>> extends Strategy {
  private dbPromise: Promise<IDBPDatabase>; 
  private dbName: string;
  private indexName: string;

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string, indexName: string) {
    super();
    this.dbPromise = dbPromise;
    this.dbName = dbName;
    this.indexName = indexName;
  }

  protected async _handle(
    request: Request, 
  ): Promise<Response | undefined> {
      const db = await this.dbPromise;
      const params = extractParams(request.url);
      const data: T[] | undefined = await db.getAllFromIndex(
        this.dbName, 
        this.indexName,
        dateRange(params.get('date') ?? ''),
      );
      if (data && this.dbName === 'records') {
        const filteredData = data.filter((record) => !record.taskId);
        return new Response(JSON.stringify(filteredData));
      }
      return new Response(JSON.stringify(data));
  } 
}