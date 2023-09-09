import { ReadChatMessages } from "@modules/chat/types";
import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useChatId, useStudyId } from "@modules/navigation/hooks";
import { getGetChatsKey, getGetUnreadCountKey } from "..";
import { useQueryClient } from "react-query";

export const useReadChatMessages = () => {
  const studyId = useStudyId()!;
  const chatId = useChatId()!;
  const queryClient = useQueryClient();

  return useReadRequest<ReadChatMessages>(
    ["readMessages"],
    (options) =>
      apiRequest(`/chats/readMessages`, {
        ...options,
        method: "POST",
        params: { studyId, chatId },
        body: { readAt: new Date() },
      }),
    {
      refetchOnWindowFocus: true,
      onSuccess() {
        queryClient.invalidateQueries(getGetChatsKey({ studyId }));
        queryClient.invalidateQueries(getGetUnreadCountKey({ studyId }));
      },
    }
  );
};
