import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from 'src/entities/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorsService {
    constructor(
        @InjectRepository(Director)
        private directosRepository: Repository<Director>,
    ) {}

    findAll(): Promise<Director[]> {
        return this.directosRepository.find();
    }
}
