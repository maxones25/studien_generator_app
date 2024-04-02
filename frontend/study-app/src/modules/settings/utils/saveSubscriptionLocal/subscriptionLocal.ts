import { getDB } from "../../../../serviceworker/indexedDB/getDB"

export enum SubscriptionState {
  Granted = 'granted',
  Denied = 'denied',
  Default = 'default',
  Loading = 'loading'
}

export const saveSubscriptionLocal = async (id: string, subscription: string) => {
  const db = await getDB();
  await db.put('subscription', {id, subscription});
}

export const getSubscriptionLocal = async (id: string) => {
  const db = await getDB();
  const subscription = await db.get('subscription', id);
  return subscription;
}

export const deleteSubscriptionLocal = async (id: string) => {
  const db = await getDB();
  await db.delete('subscription', id);
}

export const isCorrectSubscription = async (id: string) => {
  try {
    const subscriptionLocal = await getSubscriptionLocal(id);
    const sw = await navigator.serviceWorker.getRegistration();
    const subscription = await sw?.pushManager.getSubscription();
    return subscriptionLocal.subscription === JSON.stringify(subscription);
  } catch (err){
    return false;
  }
}