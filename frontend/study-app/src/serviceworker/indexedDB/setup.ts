import { openDB } from 'idb';

export const dbPromise = openDB('study-app', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('records')) {
      const records = db.createObjectStore('records', { keyPath: 'id' });
      records.createIndex('createdAt', 'createdAt', { unique: false });
      records.createIndex('taskId', 'taskId', { unique: false });
    }
  
    if (!db.objectStoreNames.contains('tasks')) {
      const tasks = db.createObjectStore('tasks', { keyPath: 'id' });
      tasks.createIndex('scheduledAt', 'scheduledAt', { unique: false })
      tasks.createIndex('fromId', 'formId', { unique: false });
    }
  
    if (!db.objectStoreNames.contains('forms')) {
      const forms = db.createObjectStore('forms', { keyPath: 'id' });
      forms.createIndex('type', 'type', { unique: false });
    }
  }
});