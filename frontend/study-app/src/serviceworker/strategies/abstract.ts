import { IDBPDatabase } from 'idb';
import { Strategy } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';
import { firstLetterToUpperCase } from '../utils/utils';

export abstract class AbstractStrategy extends Strategy {
  queue: Queue;
  dbPromise: Promise<IDBPDatabase>;
  dbName: string;
  indexName?: string;
  type: string;

  constructor(dbPromise: Promise<IDBPDatabase>, dbName: string, type: string, indexName?: string) {
    super();
    this.dbPromise = dbPromise;
    this.dbName = dbName;
    this.type = type;
    this.indexName = indexName;
    this.queue = new Queue(`${type}${firstLetterToUpperCase(dbName)}${firstLetterToUpperCase(indexName)}`);
  }

  async getFromDB(db: IDBPDatabase) {
    let data: any[];
    if (this.indexName) {
      data = await db.getAllFromIndex(this.dbName, this.indexName);
    } else {
      data = await db.getAll(this.dbName); 
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