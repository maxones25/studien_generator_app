import { IDBPDatabase } from 'idb';
import { Queue } from 'workbox-background-sync';
import { firstLetterToUpperCase } from '../utils/utils';
import { getDB } from '../indexedDB/getDB';
import { AbstractStrategy } from './abstractStrategy';

export abstract class WriteStrategy extends AbstractStrategy {
  queue: Queue;
  dbPromise: Promise<IDBPDatabase>;
  storeName: string;
  type: string;

  constructor(storeName: string, type: string, indexName?: string) {
    super(storeName, indexName);
    this.dbPromise = getDB();
    this.storeName = storeName;
    this.type = type;
    this.queue = new Queue(`
      ${this.type}${firstLetterToUpperCase(storeName)}
      ${firstLetterToUpperCase(indexName)}
    `);
  }
}