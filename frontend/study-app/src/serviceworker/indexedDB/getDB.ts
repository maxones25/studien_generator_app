import { openDB } from 'idb';
export const getDB = async (dbName: string = 'study-app', version: number = 1) => {
  return await openDB(dbName, version);
}