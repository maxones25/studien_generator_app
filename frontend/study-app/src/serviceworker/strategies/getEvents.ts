import { IDBPDatabase } from "idb";
import { Strategy } from 'workbox-strategies';
import { FormConfig, FormType } from "@modules/forms/types";
import { Event } from "@modules/events/types";
import { getDB } from "../indexedDB/getDB";

export class GetEvents extends Strategy {
  private dbPromise: Promise<IDBPDatabase>; 

  constructor() {
    super();
    this.dbPromise = getDB();
  }

  protected async _handle( 
  ): Promise<Response | undefined> {
      const db = await this.dbPromise;
      const data: FormConfig[] | undefined = await db.getAllFromIndex(
        'forms', 
        'type',
        FormType.TimeIndependent,
      );
      const mappedData: Event[] = data.map(({ id, form }) => {
        const event: Event = {
          id: id,
          name: form.name,
        };
        return event;
      });
      return new Response(JSON.stringify(mappedData));
  } 
}