import { subscribe } from "../utils/utils";

export const messageHandler = (message: string, sw: ServiceWorkerGlobalScope) => {
  console.log(message);
  switch (message) {
    case 'subscribe':
        subscribe(sw);
      break;
    case 'cache':
      break;
    default:
      break;
  }
}