import { Director } from '@entities/core/director';
import { DeletedResult, Id, UpdatedResult } from '@shared/modules/core';

export const DIRECTORS_REPOSITORY = 'DIRECTORS_REPOSITORY';

interface IReadDirectorsRepository {
  getNonMembersOfStudy(studyId: string): Promise<Director[]>;
  getAll(): Promise<Director[]>;
  getCredentialsByEmail(email: string, deleted?: boolean): Promise<Director>;
  getById(id: Id): Promise<Director>;
  isDeleted(id: Id): Promise<boolean>;
  isEmailRegistered(email: string): Promise<boolean>;
}

interface IWriteDirectorsRepository {
  create(director: Director): Promise<Id>;
  update(director: Director): Promise<UpdatedResult>;
  changePassword(director: Director): Promise<UpdatedResult>;
  restore(Id: string): Promise<UpdatedResult>;
  softDelete(Id: string): Promise<DeletedResult>;
  hardDelete(Id: string): Promise<DeletedResult>;
}

export interface IDirectorsRepository
  extends IReadDirectorsRepository,
    IWriteDirectorsRepository {}
