import { Message } from "@modules/chat/types";
import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useChatId, useStudyId } from "@modules/navigation/hooks";


export const getGetChatMessagesKey = (deps: { studyId: string, chatId: string }) => ["getChatMessages", deps];

export const useGetChatMessages = () => {
  const studyId = useStudyId()!;
  const chatId = useChatId()!;
  return useReadRequest<Message[]>(getGetChatMessagesKey({ studyId, chatId }), (options) =>
    apiRequest(`/studies/${studyId}/chats/${chatId}`, { ...options })
  );
}