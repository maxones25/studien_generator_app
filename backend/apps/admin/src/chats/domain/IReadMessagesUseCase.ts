import { UseCase } from '@shared/modules/core/UseCase';

export type ReadMessagesInput = {
  directorId: string;
  chatId: string;
  readAt: Date;
};
export interface IReadMessagesUseCase
  extends UseCase<ReadMessagesInput, Promise<number>> {}
