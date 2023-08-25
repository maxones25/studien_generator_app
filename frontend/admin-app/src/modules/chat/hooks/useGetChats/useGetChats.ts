import { Chat } from "@modules/chat/types";
import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetChatsKey = (deps: { studyId: string }) => ["getChats", deps];

export const useGetChats = () => {
  const studyId = useStudyId()!;
  return useReadRequest<Chat[]>(getGetChatsKey({ studyId }), (options) =>
    apiRequest(`/studies/${studyId}/chats`, { ...options })
  );
}