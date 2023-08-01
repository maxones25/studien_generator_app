import { MessageType } from "@modules/core/types";
import { subscribe } from "./subscribe";

declare let self: ServiceWorkerGlobalScope;

export type MessageBody = {
  [key: string]: unknown;
};

export interface Message {
  type: MessageType;
  body?: MessageBody | string;
}

export const messageHandler = (message: Message) => {
  const {
    type,
  } = message;
  
  switch (type) {
    case MessageType.Subcribe:
      subscribe();
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