import { IDBPDatabase } from "idb";
import { Strategy } from 'workbox-strategies';
import { FormData, FormDataType } from "@modules/forms/types";
import { Event } from "@modules/events/types";

export class GetEvents extends Strategy {
  private dbPromise: Promise<IDBPDatabase>; 

  constructor(dbPromise: Promise<IDBPDatabase>) {
    super();
    this.dbPromise = dbPromise;
  }

  protected async _handle( 
  ): Promise<Response | undefined> {
      const db = await this.dbPromise;
      const data: FormData[] | undefined = await db.getAllFromIndex(
        'forms', 
        'type',
        FormDataType.TimeIndependent,
      );
      const mappedData: Event[] = data.map((form) => {
        const event: Event = {
          id: form.id,
          name: form.name,
        };
        return event;
      });
      console.log(mappedData)
      return new Response(JSON.stringify(mappedData));
  } 
}