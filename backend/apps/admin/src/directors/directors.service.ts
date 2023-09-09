import {
  Inject,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateDirectorDto } from './dtos/UpdateDirectorDto';
import { DirectorsRepository } from './directors.repository';
import { PasswordService } from '@shared/modules/password/password.service';
import { SignupDirectorDto } from './dtos/SignupDirectorDto';

@Injectable()
export class DirectorsService {
  constructor(
    @Inject(DirectorsRepository)
    private directorsRepository: DirectorsRepository,
    @Inject(PasswordService)
    private passwordService: PasswordService,
  ) {}

  async create({
    email,
    password: rawPassword,
    firstName,
    lastName,
  }: Omit<SignupDirectorDto, 'activationPassword'>) {
    const foundDirector = await this.directorsRepository.getByEmail(email, true);

    if (foundDirector) throw new BadRequestException('director already exists');

    const password = await this.passwordService.hash(rawPassword, 10);

    const director = await this.directorsRepository.create({
      email,
      password,
      firstName,
      lastName,
    });

    return director.id;
  }

  async get() {
    return await this.directorsRepository.get();
  }

  async getById(id: string) {
    return await this.directorsRepository.getById(id);
  }

  async getByCredentials(email: string, password: string) {
    const director = await this.directorsRepository.getByEmail(email, false);

    if (!director) throw new UnauthorizedException();

    if (!(await this.passwordService.compare(password, director.password)))
      throw new UnauthorizedException();

    return director.id;
  }

  async getStudyMembers(studyId: string) {
    return await this.directorsRepository.getStudyMembers(studyId);
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
    const hashedPassword = await this.passwordService.hash(password, 10);
    return this.directorsRepository.changePassword(id, hashedPassword);
  }
}
