import { ReadChatMessages } from "@modules/chat/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useChatId, useStudyId } from "@modules/navigation/hooks";
import { getGetChatsKey } from "..";

export const useReadChatMessages = () => {
  const studyId = useStudyId()!;
  const chatId = useChatId()!;
  return useWriteRequest<ReadChatMessages, unknown>((options) =>
    apiRequest(`/studies/${studyId}/chats/${chatId}`, { ...options, method: "PUT" }), {
      onSuccess({ queryClient }){
        queryClient.invalidateQueries(getGetChatsKey({studyId}))
      }
    }
  );
}