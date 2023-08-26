import { IDBPDatabase } from 'idb';
import { Strategy } from 'workbox-strategies';
import { Queue } from 'workbox-background-sync';
import { firstLetterToUpperCase } from '../utils/utils';
import { getDB } from '../indexedDB/getDB';

export abstract class AbstractStrategy extends Strategy {
  queue: Queue;
  dbPromise: Promise<IDBPDatabase>;
  storeName: string;
  indexName?: string;
  type: string;

  constructor(storeName: string, type: string, indexName?: string) {
    super();
    this.dbPromise = getDB();
    this.storeName = storeName;
    this.type = type;
    this.indexName = indexName;
    this.queue = new Queue(`${type}${firstLetterToUpperCase(storeName)}${firstLetterToUpperCase(indexName)}`);
  }

  async getFromDB(db: IDBPDatabase) {
    let data: any[];
    if (this.indexName) {
      data = await db.getAllFromIndex(this.storeName, this.indexName);
    } else {
      data = await db.getAll(this.storeName); 
    }
    return new Response(JSON.stringify(data));
  }

  async getMetaData(db: IDBPDatabase): Promise<Date|undefined> {
    try {
      return await db.get('metaData', this.storeName);
    } catch {
      return undefined;
    }
  }

  async setMetaData(db: IDBPDatabase, date: Date) {
    db.put('metaData', date, this.storeName);
  }
}