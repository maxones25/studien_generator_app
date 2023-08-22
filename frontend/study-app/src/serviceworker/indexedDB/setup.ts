import { openDB } from 'idb';

export const dbPromise = openDB('study-app', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('records')) {
      const records = db.createObjectStore('records', { keyPath: 'id' });
      records.createIndex('createdAt', 'createdAt', { unique: false });
      records.createIndex('taskId', 'taskId', { unique: false });
    };
  
    if (!db.objectStoreNames.contains('tasks')) {
      const tasks = db.createObjectStore('tasks', { keyPath: 'id' });
      tasks.createIndex('scheduledAt', 'scheduledAt', { unique: false })
      tasks.createIndex('formId', 'formId', { unique: false });
    };
  
    if (!db.objectStoreNames.contains('forms')) {
      const forms = db.createObjectStore('forms', { keyPath: 'id' });
      forms.createIndex('type', 'type', { unique: false });
    };

    if (!db.objectStoreNames.contains('appointments')) {
      const forms = db.createObjectStore('appointments', { keyPath: 'id' });
      forms.createIndex('start', 'start', { unique: false });
    };

    if (!db.objectStoreNames.contains('chat')) {
      const chat = db.createObjectStore('chat', { keyPath: 'id' });
      chat.createIndex('sentAt', 'sentAt', { unique: false });
      chat.createIndex('readAt', 'readAt', { unique: false });
      chat.createIndex('queued', 'queued', { unique: false });
    };

    if (!db.objectStoreNames.contains('notifications')) {
      const chat = db.createObjectStore('notifications', { keyPath: 'id' });
      chat.createIndex('readAt', 'readAt', { unique: false });
    };


    if (!db.objectStoreNames.contains('metaData')) {
      db.createObjectStore('metaData');
    };
  }
});