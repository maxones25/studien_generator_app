const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY

export const extractParam = (url: string) => {
  const pattern = /\/([^\/]+)\/?$/;
  const match = url.match(pattern);
  const result = decodeURIComponent(match?.[1] ?? '')
  return result;
}

export const dateRange = (date: string) => {
  const dateStart = new Date(date);
  dateStart.setHours(0, 0, 0, 0);
  const dateEnd = new Date(date);
  dateEnd.setHours(23, 59, 59, 999);
  return IDBKeyRange.bound(dateStart, dateEnd);
}

export const urlB64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const subscribe = async (sw: ServiceWorkerGlobalScope) => {
  try {
    const applicationServerKey = urlB64ToUint8Array(
      VAPID_PUBLIC_KEY
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await sw.registration.pushManager.subscribe(options);
    console.log(JSON.stringify(subscription));
  } catch (err) {
    console.log('Error', err);
  }
}