import { useState } from "react";

export interface UseGetQueueStatusOptions {}

export interface UseGetQueueStatusResult {
  getQueueStatus: () => 'red' | 'yellow' | 'green';
}

export const useGetQueueStatus = () : UseGetQueueStatusResult => {

  const [count, setCount] = useState(0);

  let request = indexedDB.open("workbox-background-sync");
  request.onsuccess = () => {
    const db = request.result;
    try {
      const transaction = db.transaction("requests", "readonly");
      const countRequest = transaction.objectStore("requests").count();
      countRequest.onsuccess = function() {
        setCount(countRequest.result);
      };
      countRequest.onerror = function() {
        setCount(0);
      };
      transaction.oncomplete = function() {
        db.close();
      };
    } catch {
      setCount(0);
    }
  };

  const getQueueStatus = () => {
    if (count === 0) return 'green';
    if (count > 5) return 'red';
    return 'yellow';
  }

  return {
    getQueueStatus,
  }
}