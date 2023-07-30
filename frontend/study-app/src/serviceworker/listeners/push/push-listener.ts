declare let self: ServiceWorkerGlobalScope;

export const pushHandler = async (event: PushEvent) => {
  const text = event.data?.text() ?? '';

  self.registration.showNotification('Erinnerung', {
    body: text
  });
}