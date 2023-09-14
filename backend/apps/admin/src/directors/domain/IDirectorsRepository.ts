import { Director } from '@entities';
import { CreateDirectorDto } from '../dtos/CreateDirectorDto';

export interface IDirectorsRepository {
  create(data: CreateDirectorDto): Promise<string>;
  getByEmail(email: string, deleted?: boolean): Promise<Director>;
}
