import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Study } from '../../entities/study.entity';
import { Repository } from 'typeorm';
import { CreateStudyDto } from './dtos/createStudyDto';
import { StudyMember } from '../../entities/study-member';
import { AddOrRemoveDirector } from './dtos/addOrRemoveDirector';
import { TransferAdminDto } from './dtos/transferAdminDto';
import { Roles } from '../../enums/roles.enum';

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study)
    private studiesRepository: Repository<Study>,
    @InjectRepository(StudyMember)
    private studyMemberRepository: Repository<StudyMember>,
  ) {}

  async create({ name, directorId }: CreateStudyDto) {
    const study = await this.studiesRepository.create({ name });
    console.log(study)
    await this.studyMemberRepository.insert({
      directorId: directorId,
      studyId: study.id,
      role: Roles.admin,
    });
    return study;
  }

  findAll(): Promise<Study[]> {
    return this.studiesRepository.find();
  }

  findOne(id: string): Promise<Study | null> {
    return this.studiesRepository.findOne({
      where: {
        id,
      },
    });
  }

  async delete(studyId: string): Promise<void> {
    await this.studiesRepository.delete(studyId);
  }

  async addEmployee(
    studyId: string,
    { directorId, role }: AddOrRemoveDirector,
  ) {
    return await this.studyMemberRepository.insert({
      directorId,
      studyId: studyId,
      role,
    });
  }

  async updateEmployee(
    studyId: string,
    directorId: string,
    { role }: TransferAdminDto,
  ) {
    await this.studyMemberRepository.update(
      {
        studyId,
        directorId,
      },
      {
        role,
      },
    );
  }

  async removeEmployee(studyId: string, directorId: string) {
    const adminMembers = await this.studyMemberRepository.find({
      where: {
        studyId,
        role: Roles.admin,
      },
    });
    if (adminMembers.length === 1)
      await this.studyMemberRepository.delete({
        directorId,
        studyId: studyId,
      });
  }

  // async transferAdmin({ studyId, oldAdminId, newAdminId }: TransferAdminDto) {
  //   await this.removeEmployee({ studyId, employeeId: newAdminId });
  //   await this.studyMemberRepository.delete({
  //     directorId: oldAdminId,
  //     studyId: studyId,
  //     role: Roles.employee,
  //   });
  //   return await this.studyMemberRepository.insert({
  //     directorId: newAdminId,
  //     studyId: studyId,
  //     role: Roles.admin,
  //   });
  // }
}
