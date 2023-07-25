import { Inject, Injectable } from '@nestjs/common';
import { Director } from '@entities/director.entity';
import { UpdateDirectorDto } from './dtos/UpdateDirectorDto';
import { DirectorsRepository } from './directors.repository';

@Injectable()
export class DirectorsService {
  constructor(
    @Inject(DirectorsRepository)
    private directosRepository: DirectorsRepository,
  ) {}

  async getAll() {
    return this.directosRepository.getAll()
  }

  async delete(directorId: string) {
    return this.directosRepository.delete(directorId);
  }

  async update(
    directorId: string,
    { email, firstName, lastName }: UpdateDirectorDto,
  ) {
    return await this.directosRepository.update(directorId, {
      email,
      firstName,
      lastName,
    });
  }
}
