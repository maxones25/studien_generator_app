import { getDB } from './getDB';
export const resetDB = async () => {
  const db = await getDB();

  // Iteration durch alle ObjectStores und Löschen der Einträge
  for (const storeName of db.objectStoreNames) {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).clear();
    await tx.done;
  }
}