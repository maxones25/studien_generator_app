import { PushNotificationType } from "./push-notification-type.enum";

declare let self: ServiceWorkerGlobalScope;

export const pushHandler = async (event: PushEvent) => {
  const text = event.data?.text() ?? '';
  const data = JSON.parse(text);
  const img = "/images/pwa-192x192.png";

//browser push notification "onClick" event heandler
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');
  event.notification.close();

  switch (data.type) {
    case PushNotificationType.Chat:
      return self.clients.openWindow('/chat');
    case PushNotificationType.Task:
      window.sessionStorage.setItem('date', data.date);
      break;
    }
    return self.clients.openWindow('/');

  
});

  self.registration.showNotification(data.title, {
    body: data.message,
    icon: img,
    badge: img,
    vibrate: [200, 100, 200],
  });
}