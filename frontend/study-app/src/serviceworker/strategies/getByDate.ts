import { IDBPDatabase } from "idb";
import { dateRange, extractParams } from "../utils/utils"
import { AbstractStrategy } from "./abstract";

export class GetByDate<T extends Record<string, any>> extends AbstractStrategy {

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string, indexName: string) {
    super(dbPromise, dbName, 'GET', indexName);
  }

  protected async _handle(
    request: Request, 
  ): Promise<Response | undefined> {
      const db = await this.dbPromise;
      const params = extractParams(request.url);
      const data: T[] | undefined = await db.getAllFromIndex(
        this.dbName, 
        this.indexName ?? '',
        dateRange(params.get('date') ?? ''),
      );
      if (data && this.dbName === 'records') {
        const filteredData = data.filter((record) => !record.taskId);
        return new Response(JSON.stringify(filteredData));
      }
      return new Response(JSON.stringify(data));
  } 
}