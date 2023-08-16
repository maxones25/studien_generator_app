import { IDBPDatabase } from 'idb';
import { Strategy, StrategyHandler } from 'workbox-strategies';

export class GetData extends Strategy {
  private dbPromise: Promise<IDBPDatabase>; 
  private dbName: string;

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string) {
    super();
    this.dbPromise = dbPromise;
    this.dbName = dbName;
  }

  protected async _handle(
    request: Request, 
    handler: StrategyHandler
  ): Promise<Response | undefined> {
    const db = await this.dbPromise;
    const requestClone = request.clone()
    const myRequest = getData(this.dbName) ?? handler.fetch(requestClone);
    return myRequest
    .then(async (response) => {
      if (!response.ok) {
        return await this.getFromDB(db)
      }
      const responseClone = response.clone()
      responseClone.json().then(async (data) => {
        const tx = db.transaction(this.dbName, 'readwrite');
        await Promise.all(data.map((record: Record<string, any>) => {
          if (record.createdAt) record.createdAt = new Date(record.createdAt);
          if (record.scheduledAt) record.scheduledAt = new Date(record.scheduledAt);
          if (record.start) record.start = new Date(record.start);
          return tx.store.put(record);
        }));
      })

      return response;
    }).catch(async () => {
      return await this.getFromDB(db)
    });
  }

  private async getFromDB(db: IDBPDatabase) {
    const data = await db.getAll(this.dbName)
    return new Response(JSON.stringify(data))
  }
}

const appointments = new Promise<Response>((resolve) => {
  resolve(new Response(
    JSON.stringify([
      { id: '1', start: '2023-08-13T12:00:00', name: 'Meeting mit Team A' },
      { id: '2', start: '2023-08-14T14:30:00', name: 'Produktpräsentation' },
      { id: '3', start: '2023-08-15T10:15:00', name: 'Anruf mit Klient X' },
      { id: '4', start: '2023-08-16T16:45:00', name: 'Workshop für Neuanfänger' },
      { id: '5', start: '2023-08-17T09:00:00', name: 'Planungsbesprechung' },
      { id: '6', start: '2023-08-18T09:00:00', name: 'Frühstückstreffen mit Team B' },
      { id: '7', start: '2023-08-18T14:30:00', name: 'Projektupdate' },
      { id: '8', start: '2023-08-19T10:00:00', name: 'Technische Besprechung' },
      { id: '9', start: '2023-08-20T16:00:00', name: 'Review Meeting' },
      { id: '10', start: '2023-08-21T09:30:00', name: 'Strategieplanung' },
    ])
  ))
});

const tasks = new Promise<Response>((resolve) => {
  resolve(new Response(
    JSON.stringify([
      { formId: 'F001', id: 'T01', name: 'Aufgabe A', scheduledAt: '2023-08-13T08:00:00' },
      { formId: 'F002', id: 'T02', name: 'Aufgabe B', scheduledAt: '2023-08-13T11:00:00' },
      { formId: 'F003', id: 'T03', name: 'Aufgabe C', scheduledAt: '2023-08-14T12:00:00' },
      { formId: 'F004', id: 'T04', name: 'Aufgabe D', scheduledAt: '2023-08-15T10:00:00' },
      { formId: 'F005', id: 'T05', name: 'Aufgabe E', scheduledAt: '2023-08-16T09:00:00' },
      { formId: 'F006', id: 'T06', name: 'Aufgabe F', scheduledAt: '2023-08-18T15:00:00' },
      { formId: 'F007', id: 'T07', name: 'Aufgabe G', scheduledAt: '2023-08-17T11:00:00' },
      { formId: 'F008', id: 'T08', name: 'Aufgabe H', scheduledAt: '2023-08-19T13:00:00' },
      { formId: 'F009', id: 'T09', name: 'Aufgabe I', scheduledAt: '2023-08-20T14:00:00' },
      { formId: 'F010', id: 'T10', name: 'Aufgabe J', scheduledAt: '2023-08-18T16:00:00' },
    ])
  ))
});

const getData = (data: string) => {
  return data === 'tasks' ? tasks : data === 'appointments' ? appointments : undefined;
}