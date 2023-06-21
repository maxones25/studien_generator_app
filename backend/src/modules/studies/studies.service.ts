import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Study } from '../../entities/study.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study)
    private studiesRepository: Repository<Study>,
  ) {}

  findAll(): Promise<Study[]> {
    return this.studiesRepository.find();
  }

  findOne(id: number): Promise<Study | null> {
    return this.studiesRepository.findOne( {   
      where: {
      id: 1,
  }});
  }

  async remove(id: number): Promise<void> {
    await this.studiesRepository.delete(id);
  }
}
