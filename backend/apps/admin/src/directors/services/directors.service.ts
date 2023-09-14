import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { UpdateDirectorDto } from '../domain/dtos/UpdateDirectorDto';
import { DirectorsRepository } from '../repositories/directors.repository';
import { SignupDirectorDto } from '../domain/dtos/SignupDirectorDto';
import {
  IPasswordService,
  PASSWORD_SERVICE,
} from '@shared/modules/password/IPasswordService';

@Injectable()
export class DirectorsService {
  constructor(
    @Inject(DirectorsRepository)
    private directorsRepository: DirectorsRepository,
    @Inject(PASSWORD_SERVICE)
    private passwordService: IPasswordService,
  ) {}

  async create({
    email,
    password: rawPassword,
    firstName,
    lastName,
  }: Omit<SignupDirectorDto, 'activationPassword'>) {
    const foundDirector = await this.directorsRepository.getByEmail(
      email,
      true,
    );

    if (foundDirector) throw new BadRequestException('director already exists');

    const password = await this.passwordService.hash(rawPassword);

    return await this.directorsRepository.create({
      email,
      password,
      firstName,
      lastName,
    });
  }

  async get() {
    return await this.directorsRepository.get();
  }

  async getById(id: string) {
    return await this.directorsRepository.getById(id);
  }

  async getNonStudyMembers(studyId: string) {
    return await this.directorsRepository.getNonStudyMembers(studyId);
  }

  isDeleted(id: string) {
    return this.directorsRepository.isDeleted(id);
  }

  async hardDelete(directorId: string) {
    return this.directorsRepository.hardDelete(directorId);
  }

  async softDelete(directorId: string) {
    return this.directorsRepository.softDelete(directorId);
  }

  restore(directorId: string) {
    return this.directorsRepository.restore(directorId);
  }

  async update(
    directorId: string,
    { email, firstName, lastName }: UpdateDirectorDto,
  ) {
    return await this.directorsRepository.update(directorId, {
      email,
      firstName,
      lastName,
    });
  }

  async changePassword(id: string, password: string) {
    const hashedPassword = await this.passwordService.hash(password);
    return this.directorsRepository.changePassword(id, hashedPassword);
  }
}
