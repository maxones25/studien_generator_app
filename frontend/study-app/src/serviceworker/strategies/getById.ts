import { IDBPDatabase } from "idb";
import { extractParam } from "../utils/utils"
import { Strategy } from 'workbox-strategies';

export class GetById extends Strategy {
  private dbPromise: Promise<IDBPDatabase>; 
  private dbName: string;

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string) {
    super();
    this.dbPromise = dbPromise;
    this.dbName = dbName;
  }

  protected async _handle(
    request: Request, 
  ): Promise<Response | undefined> {
      const db = await this.dbPromise;
      const id = extractParam(request.url);
      const data = await db.get(this.dbName, id);
      return new Response(JSON.stringify(data));
  } 
}