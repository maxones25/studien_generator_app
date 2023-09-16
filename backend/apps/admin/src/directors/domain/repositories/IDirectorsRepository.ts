import { Director } from '@entities/core/director';
import { DeletedResult, Id, UpdatedResult } from '@shared/modules/core';

export const DIRECTORS_REPOSITORY = 'DIRECTORS_REPOSITORY';

interface IReadDirectorsRepository {
  getDirectorsNotMemberOfStudyById(studyId: string): Promise<Director[]>;
  getDirectors(): Promise<Director[]>;
  getDirectorCredentialsByEmail(
    email: string,
    deleted?: boolean,
  ): Promise<Director>;
  getDirectorById(id: Id): Promise<Director>;
  isDeleted(id: Id): Promise<boolean>;
}

interface IWriteDirectorsRepository {
  create(director: Director): Promise<Id>;
  update(director: Director): Promise<UpdatedResult>;
  changePassword(director: Director): Promise<UpdatedResult>;
  restoreDirector(Id: string): Promise<UpdatedResult>;
  softDeleteDirector(Id: string): Promise<DeletedResult>;
  hardDeleteDirector(Id: string): Promise<DeletedResult>;
}

export interface IDirectorsRepository
  extends IReadDirectorsRepository,
    IWriteDirectorsRepository {}
