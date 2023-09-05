import { Transactional } from '@admin/studies/shared/Transactional';
import {
  CreateStudyInput,
  ICreateStudyUseCase,
} from '../domain/useCases/ICreateStudyUseCase';
import { IMembersRepository } from '../domain/repositories/IMemberRepository';
import { IStudiesRepository } from '../domain/repositories/IStudiesRepository';
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateStudyUseCase implements ICreateStudyUseCase {
  constructor(
    private readonly studiesRepository: IStudiesRepository,
    private readonly membersRepository: IMembersRepository,
  ) {}

  @Transactional()
  async execute({ directorId, name }: CreateStudyInput): Promise<string> {
    const studyId = await this.studiesRepository.createStudy({ name });

    throw new Error(studyId);

    await this.membersRepository.addMember(studyId, directorId, 'Admin');

    return studyId;
  }
}
