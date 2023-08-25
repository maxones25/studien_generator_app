import { IDBPDatabase } from 'idb';
import { Strategy } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';
import { firstLetterToUpperCase } from '../utils/utils';

export abstract class AbstractStrategy extends Strategy {
  queue: Queue;
  dbPromise: Promise<IDBPDatabase>;
  dbName: string;
  type: string;

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string, type: string) {
    super();
    this.dbPromise = dbPromise;
    this.dbName = dbName;
    this.type = type
    this.queue = new Queue(`${type}${firstLetterToUpperCase(dbName)}`)
  }

  async getFromDB(db: IDBPDatabase) {
    let data: any[]  
    switch (this.dbName) {
      case 'chat':
        data = await db.getAllFromIndex(this.dbName, 'sentAt')
        break;
      case 'notifications':
        data = await db.getAllFromIndex(this.dbName, 'modifiedAt')
        break;
      default:
        data = await db.getAll(this.dbName);
        break;
    }
    return new Response(JSON.stringify(data));
  }

  async getMetaData(db: IDBPDatabase): Promise<Date|undefined> {
    try {
      return await db.get('metaData', this.dbName);
    } catch {
      return undefined;
    }
  }

  async setMetaData(db: IDBPDatabase, date: Date) {
    db.put('metaData', date, this.dbName);
  }
}