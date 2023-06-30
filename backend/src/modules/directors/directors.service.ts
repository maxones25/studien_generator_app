import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from '../../entities/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorsService {
  constructor(
    @InjectRepository(Director)
    private directosRepository: Repository<Director>,
  ) {}

  findAll(): Promise<Director[]> {
    return this.directosRepository.find({
      select: { id: true, firstName: true, lastName: true, email: true },
    });
  }

  async delete(directorId: string): Promise<void> {
    await this.directosRepository.delete(directorId);
  }

  async update(
    directorId: string,
    { email, firstName, lastName }: Partial<Director>,
  ) {
    await this.directosRepository.update(directorId, {
      email,
      firstName,
      lastName,
    });
  }
}
