import { getDB } from "../../indexedDB/getDB";

declare let self: ServiceWorkerGlobalScope;

export const pushHandler = async (event: PushEvent) => {
  const text = event.data?.text() ?? '';
  const data = JSON.parse(text);
  const img = "/images/pwa-192x192.png";
  const db = await getDB();
  const subscription = await db.get('subscription', data.id);

  if (Boolean(subscription))
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: img,
    badge: img,
    vibrate: [200, 100, 200],
  });

  self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    return self.clients.openWindow('/');

  
});
}