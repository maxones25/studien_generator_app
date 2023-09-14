import { Director } from '@entities';
import { CreateDirectorDto } from '../dtos/CreateDirectorDto';

export const DIRECTORS_REPOSITORY = 'DIRECTORS_REPOSITORY';

export interface IDirectorsRepository {
  create(data: CreateDirectorDto): Promise<string>;
  getByEmail(email: string, deleted?: boolean): Promise<Director>;
}
