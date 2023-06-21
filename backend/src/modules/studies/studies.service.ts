import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Study } from '../../entities/study.entity';
import { Repository } from 'typeorm';
import { CreateStudyDto } from './dtos/createStudyDto';
import { StudyToDirector } from '../../entities/studyToDirector.entity';
import { DeleteStudyDto } from './dtos/deleteStudyDto';
import { AddOrRemoveDirector } from './dtos/addOrRemoveDirector';
import { TransferAdminDto } from './dtos/transferAdminDto';

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study)
    private studiesRepository: Repository<Study>,
    @InjectRepository(StudyToDirector)
    private studyToDirectorRepository: Repository<StudyToDirector>,
  ) {}

  async create({name, directorId}: CreateStudyDto) {
    const study = new Study();
    study.name = name;
    await this.studiesRepository.insert(study);
    return await this.studyToDirectorRepository.insert({ directorId: directorId, studyId: study.id, role: 'admin' });
  }

  findAll(): Promise<Study[]> {
    return this.studiesRepository.find();
  }

  findOne(id: string): Promise<Study | null> {
    return this.studiesRepository.findOne( {  
      where: {
      id,
  }});
  }

  async delete({id}: DeleteStudyDto): Promise<void> {
    await this.studiesRepository.delete(id);
  }

  async addEmployee({studyId, employeeId}: AddOrRemoveDirector) {
    return await this.studyToDirectorRepository.insert({ directorId: employeeId, studyId: studyId, role: 'employee' });
  }

  async removeEmployee({studyId, employeeId}: AddOrRemoveDirector) {
    await this.studyToDirectorRepository.delete({ directorId: employeeId, studyId: studyId, role: 'employee' });
  }

  async transferAdmin({studyId, oldAdminId, newAdminId}: TransferAdminDto) {
    await this.removeEmployee({studyId, employeeId: newAdminId});
    await this.studyToDirectorRepository.delete({ directorId: oldAdminId, studyId: studyId, role: 'admin' });
    return await this.studyToDirectorRepository.insert({ directorId: newAdminId, studyId: studyId, role: 'admin' });
  }
}
