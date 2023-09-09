import { Transaction } from '@shared/modules/transaction/transaction';
import { ChatMessage, Chat, ChatMessageReceipt } from '@entities';

type AddMessageTransactionInput = {
  directorId: string;
  chatId: string;
  content: string;
};

export class AddMessageTransaction extends Transaction<
  AddMessageTransactionInput,
  void
> {
  protected async execute({
    directorId,
    chatId,
    content,
  }: AddMessageTransactionInput): Promise<void> {
    const chatMessageRepo = this.entityManager.getRepository(ChatMessage);

    const message = new ChatMessage();

    message.chatId = chatId;
    message.directorId = directorId;
    message.content = content;
    message.sentAt = new Date();

    await chatMessageRepo.insert(message);

    await this.createReceipts(message.id, directorId, chatId);
  }

  private async createReceipts(
    messageId: string,
    directorId: string,
    chatId: string,
  ) {
    const receiptRepo = this.entityManager.getRepository(ChatMessageReceipt);
    const chatRepo = this.entityManager.getRepository(Chat);

    const result = await chatRepo.findOne({
      where: {
        id: chatId,
      },
      relations: {
        study: {
          members: true,
        },
      },
      select: {
        id: true,
        participantId: true,
        study: {
          id: true,
          members: {
            directorId: true,
          },
        },
      },
    });
    const members = result.study.members;
    members?.forEach((member) => {
      if (member.directorId === directorId) return;
      const receipt = new ChatMessageReceipt();
      receipt.messageId = messageId;
      receipt.directorId = member.directorId;
      receiptRepo.insert(receipt);
    });
    const receipt = new ChatMessageReceipt();
    receipt.messageId = messageId;
    receipt.participantId = result.participantId;
    receiptRepo.insert(receipt);
  }
}
