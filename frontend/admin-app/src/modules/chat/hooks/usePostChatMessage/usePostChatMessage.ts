import { PostMessage } from "@modules/chat/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useChatId, useStudyId } from "@modules/navigation/hooks";
import { getGetChatMessagesKey } from "..";

export const usePostChatMessage = () => {
  const studyId = useStudyId()!;
  const chatId = useChatId()!;
  return useWriteRequest<PostMessage, unknown>((options) =>
    apiRequest(`/studies/${studyId}/chats/${chatId}`, { ...options, method: "POST" }), {
      onSuccess({ queryClient }){
        queryClient.invalidateQueries(getGetChatMessagesKey({studyId, chatId}))
      }
    }
  );
}