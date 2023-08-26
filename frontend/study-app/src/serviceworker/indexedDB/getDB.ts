import { openDB } from 'idb';
export const getDB = async (dbName: string = 'study-app') => {
  return await openDB(dbName);
}