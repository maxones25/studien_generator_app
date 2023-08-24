import { Transaction } from '@shared/modules/transaction/transaction';
import { AddMessageDto } from '../dtos/AddMessageDto';
import { ChatMessageReceipt } from '@entities/chat-message-receipt.entity';
import { Chat } from '@entities/chat.entity';
import { ChatMessage } from '@entities';



export class AddMessageTransaction extends Transaction<
  AddMessageDto,
  void
> {

  protected async execute(
    addMessageDto: AddMessageDto
  ): Promise<void> {
    const {
      id,
      directorId,
      chatId,
    } = addMessageDto;
    const chatMessageRepo = this.entityManager.getRepository(ChatMessage);
    await chatMessageRepo.insert(addMessageDto);
    await this.createReceipts(id, directorId, chatId)
  }

  private async createReceipts(
    messageId: string, 
    directorId: string, 
    chatId: string
  ) {
    const receiptRepo = this.entityManager.getRepository(ChatMessageReceipt);
    const chatRepo = this.entityManager.getRepository(Chat);

    const result = await chatRepo.findOne({
      where: {
        id: chatId,
      },
      relations: {
        study: {
          members: true
        }
      },
      select: {
        id: true,
        participantId: true,
        study: {
          id: true,
          members: {
            directorId: true,
          }
        }
      }
    });
    const members = result.study.members;
    members?.forEach(member => {
      if (member.directorId === directorId) return;
      const receipt = new ChatMessageReceipt();
      receipt.messageId = messageId;
      receipt.directorId = member.directorId;
      receiptRepo.insert(receipt);
    })
    const receipt = new ChatMessageReceipt();
    receipt.messageId = messageId;
    receipt.participantId = result.participantId;
    receiptRepo.insert(receipt);
  }
}
