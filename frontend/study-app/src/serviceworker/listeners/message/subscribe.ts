import { MessageType } from "@modules/core/types";
import { postMessage } from "./message-listener";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY

declare let self: ServiceWorkerGlobalScope;

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

export const subscribe = async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array(
      VAPID_PUBLIC_KEY
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);  
    console.log(subscription);    
    postMessage(
      MessageType.Success,
      'subscribtion was a success'
    );
  } catch (err) {
    postMessage(
      MessageType.Error,
      'something must have gon wrong'
    );
  }
}