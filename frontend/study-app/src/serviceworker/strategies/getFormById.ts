import { IDBPDatabase } from "idb";
import { extractParams } from "../utils/utils"
import { Strategy } from 'workbox-strategies';
import { FormConfig } from "@modules/forms/types";
import { getDB } from "../indexedDB/getDB";

export class GetFormById extends Strategy {
  private dbPromise: Promise<IDBPDatabase>; 
  private storeName: string;

  constructor(storeName: string) {
    super();
    this.dbPromise = getDB();
    this.storeName = storeName;
  }

  protected async _handle(
    request: Request, 
  ): Promise<Response | undefined> {
      const db = await this.dbPromise;
      const params = extractParams(request.url);
      const data: FormConfig = await db.get(this.storeName, params.get('formId') ?? '');
      return new Response(JSON.stringify(data.form));
  } 
}