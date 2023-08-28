import { Message } from "@modules/chat/types";
import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export const getGetChatMessagesKey = () => ["getChatMessages"];

export const useGetChatMessages = () => {
  return useReadRequest<Message[]>(getGetChatMessagesKey(), (options) =>
    apiRequest(`/chat`, { ...options }),
    {
      staleTime: 1000 * 10,
      refetchInterval: 1000 * 60,
      refetchIntervalInBackground: true,
    }
  );
}