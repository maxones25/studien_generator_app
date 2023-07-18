import { Message } from "@modules/chat/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { getGetChatMessagesKey } from "..";

export const usePostChatMessage = () => {
  return useWriteRequest<Message, void>((options) =>
    apiRequest(`/chat`, { method: "POST", ...options }),
    {
      onSuccess: ({ queryClient }) => {
        queryClient.invalidateQueries(getGetChatMessagesKey());
      },
    }
  );
}