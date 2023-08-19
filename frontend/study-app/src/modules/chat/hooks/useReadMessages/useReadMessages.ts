import { ReadMessages } from "@modules/chat/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { getGetChatMessagesKey } from "..";

export const useReadMessages = () => {
  return useWriteRequest<ReadMessages, void>((options) =>
    apiRequest(`/chat`, { method: "PUT", ...options }),
    {
      onSuccess: ({ queryClient }) => {
        queryClient.invalidateQueries(getGetChatMessagesKey());
      },
    }
  );
}