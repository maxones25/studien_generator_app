import { MessageType } from "@modules/core/types";
import { subscribe } from "./subscribe";
import { fetchAndCache } from "./fetchAndCache";
import { MessageBody, MessageHeader } from "@modules/core/hooks";

declare let self: ServiceWorkerGlobalScope;

export interface Message {
  type: MessageType;
  headers?: MessageHeader;
  body?: MessageBody | string;
  endpoint: string;
}

export const messageHandler = (message: Message) => {
  const {
    type,
    headers = {},
    endpoint,
  } = message;
  
  switch (type) {
    case MessageType.Subcribe:
      subscribe();
      break;
    case MessageType.FetchAndCache:
      fetchAndCache(endpoint, headers)
      break;
    default:
      break;
  }
}

export const postMessage = async (type: MessageType, body: MessageBody | string) => {
  const clients = await self.clients.matchAll();
  for (const client of clients) {
    client.postMessage({
      type: type,
      body: body
    });
  }
}