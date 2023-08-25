import { IDBPDatabase } from "idb";
import { extractParams } from "../utils/utils"
import { Strategy } from 'workbox-strategies';
import { FormConfig } from "@modules/forms/types";

export class GetFormById extends Strategy {
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
      const params = extractParams(request.url);
      const data: FormConfig = await db.get(this.dbName, params.get('formId') ?? '');
      return new Response(JSON.stringify(data.form));
  } 
}