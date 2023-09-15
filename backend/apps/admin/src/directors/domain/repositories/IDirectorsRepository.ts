import { Director } from '@entities/core/director';
import { UpdateDirectorDto, CreateDirectorDto } from '@admin/directors/domain';
export const DIRECTORS_REPOSITORY = 'DIRECTORS_REPOSITORY';

export interface IDirectorsRepository {
  isDeleted(id: string): Promise<boolean>;
  getNonStudyMembers(studyId: string): Promise<any[]>;
  getById(id: string): Promise<any>;
  get(): Promise<any[]>;
  update(directorId: string, data: UpdateDirectorDto): Promise<number>;
  softDelete(directorId: string): Promise<number>;
  hardDelete(directorId: string): Promise<number>;
  changePassword(directorId: string, hashedPassword: string): Promise<number>;
  restore(directorId: string): Promise<number>;
  create(data: CreateDirectorDto): Promise<string>;
  getByEmail(email: string, deleted?: boolean): Promise<Director>;
}
