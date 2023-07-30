const BASE_URI = import.meta.env.VITE_API_URI
const DEV = import.meta.env.DEV
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { dbPromise } from './serviceworker/indexedDB/setup'
import { PostRecord } from './serviceworker/strategies/postRecord'
import { GetByDate } from './serviceworker/strategies/getByDate'
import { GetById } from './serviceworker/strategies/getById'
import { Record, Task } from '@modules/tasks/types'
import { GetEvents } from './serviceworker/strategies/getEvents'
import { BackgroundSyncPlugin } from 'workbox-background-sync'
import { messageHandler } from './serviceworker/listeners/message/message-listener'
import { pushHandler } from './serviceworker/listeners/push/push-listener'

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

let allowlist: undefined | RegExp[];
if (DEV)
  allowlist = [/^\/$/];

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist },
));

self.skipWaiting();
clientsClaim();

self.addEventListener('message', async (event) => {
  messageHandler(event.data);
})

self.addEventListener('push', (event) => {
  pushHandler(event);
})

registerRoute(
  `${BASE_URI}/forms/time/independent`, 
  new GetEvents(dbPromise)
);

registerRoute(
  new RegExp(`${BASE_URI}/forms/*`), 
  new GetById(dbPromise, 'forms')
);

registerRoute(
  new RegExp(`${BASE_URI}/tasks/*`), 
  new GetByDate<Task>(dbPromise, 'tasks', 'scheduledAt')
);

const bgSyncPlugin = new BackgroundSyncPlugin('recordsQueue', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  `${BASE_URI}/records`, 
  new PostRecord(dbPromise, {
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

registerRoute(
  new RegExp(`${BASE_URI}/records/*`), 
  new GetByDate<Record>(dbPromise, 'records', 'createdAt')
);

