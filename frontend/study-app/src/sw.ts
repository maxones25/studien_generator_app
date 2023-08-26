const BASE_URI = import.meta.env.VITE_API_URI
const DEV = import.meta.env.DEV
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { dbPromise } from './serviceworker/indexedDB/setup'
import { PostRecord } from './serviceworker/strategies/postRecord'
import { GetByDate } from './serviceworker/strategies/getByDate'
import { GetFormById } from './serviceworker/strategies/getFormById'
import { Record, Task } from '@modules/tasks/types'
import { GetEvents } from './serviceworker/strategies/getEvents'
import { messageHandler } from './serviceworker/listeners/message/message-listener'
import { pushHandler } from './serviceworker/listeners/push/push-listener'
import { GetData } from './serviceworker/strategies/getData'
import { PostMessage } from './serviceworker/strategies/postMessage'
import { PutData } from './serviceworker/strategies/putData'
import { DeleteData } from './serviceworker/strategies/deleteData'

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
  `${BASE_URI}/forms`, 
  new GetData(dbPromise, 'forms')
);

registerRoute(
  `${BASE_URI}/forms?timeIndependent=true`, 
  new GetEvents(dbPromise)
);

registerRoute(
  new RegExp(`${BASE_URI}/forms*`), 
  new GetFormById(dbPromise, 'forms')
);

registerRoute(
  `${BASE_URI}/tasks`, 
  new GetData(dbPromise, 'tasks')
);

registerRoute(
  new RegExp(`${BASE_URI}/tasks*`), 
  new GetByDate<Task>(dbPromise, 'tasks', 'scheduledAt')
);

registerRoute(
  `${BASE_URI}/appointments`, 
  new GetData(dbPromise, 'appointments')
);

registerRoute(
  new RegExp(`${BASE_URI}/appointments*`), 
  new GetByDate<Task>(dbPromise, 'appointments', 'start')
);

registerRoute(
  `${BASE_URI}/records`, 
  new GetData(dbPromise, 'records'),
);

registerRoute(
  `${BASE_URI}/records`, 
  new PostRecord(dbPromise),
  'POST'
);

registerRoute(
  new RegExp(`${BASE_URI}/records*`), 
  new GetByDate<Record>(dbPromise, 'records', 'createdAt')
);

registerRoute(
  `${BASE_URI}/chat`, 
  new PostMessage(dbPromise),
  'POST'
);

registerRoute(
  `${BASE_URI}/chat`, 
  new PutData(
    dbPromise, 
    'chat', 
    ({participantId, readAt}) => !participantId && !readAt,
  ),
  'PUT'
);

registerRoute(
  `${BASE_URI}/chat`, 
  new GetData(dbPromise, 'chat', 'sentAt'),
);

registerRoute(
  `${BASE_URI}/notifications`, 
  new GetData(dbPromise, 'notifications', 'modifiedAt'),
);

registerRoute(
  `${BASE_URI}/notifications`, 
  new PutData(
    dbPromise, 
    'notifications',
    ({readAt}) => !readAt,
  ),
  'PUT'
);

registerRoute(
  `${BASE_URI}/notifications`, 
  new DeleteData(dbPromise, 'notifications'),
  'DELETE'
);
