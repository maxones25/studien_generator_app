import { Transaction } from '@shared/modules/transaction/transaction';
import { AddMessageDto } from '../dtos/AddMessageDto';
import { ChatMessageReceipt } from '@entities/chat-message-receipt.entity';
import { Chat } from '@entities/chat.entity';
import { ChatMessage } from '@entities';
import { Repository } from 'typeorm';



export class AddMessageTransaction extends Transaction<
  AddMessageDto,
  void
> {

  protected async execute(
    addMessageDto: AddMessageDto
  ): Promise<void> {
    const chatMessageRepo = this.entityManager.getRepository(ChatMessage);
    await chatMessageRepo.insert(addMessageDto);
    await this.createReceipts(addMessageDto.id, addMessageDto.participantId)
  }

  private async createReceipts(messageId: string, participantId: string) {
    const receiptRepo = this.entityManager.getRepository(ChatMessageReceipt);
    const chatRepo = this.entityManager.getRepository(Chat);

    const result = await chatRepo.findOne({
      where: {
        participantId
      },
      relations: {
        study: {
          members: true
        }
      },
      select: {
        id: true,
        study: {
          id: true,
          members: {
            directorId: true,
          }
        }
      }
    });
    const members = result.study.members;
    members.forEach(member => {
      const receipt = new ChatMessageReceipt();
      receipt.messageId = messageId;
      receipt.directorId = member.directorId;
      receiptRepo.insert(receipt);
    })
  }
}
