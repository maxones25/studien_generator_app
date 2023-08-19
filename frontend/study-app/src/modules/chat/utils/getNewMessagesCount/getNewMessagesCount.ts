import { useGetChatMessages } from "@modules/chat/hooks"

export const getNewMessagesCount = () => {
  const messages = useGetChatMessages().data;

  if (messages) {
    const incomingMessages = messages.filter((message) => message.participantId === undefined);
    if (incomingMessages === undefined) return 0; 
    return incomingMessages.filter((message) => message.readAt === undefined).length;
  }
  return 0
}