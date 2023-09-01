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
    private directosRepository: DirectorsRepository,
    @Inject(PasswordService)
    private passwordService: PasswordService,
  ) {}

  async create({
    email,
    password: rawPassword,
    firstName,
    lastName,
  }: Omit<SignupDirectorDto, 'activationPassword'>) {
    const director = await this.directosRepository.getByEmail(email);

    if (director) throw new BadRequestException('director already exists');

    const password = await this.passwordService.hash(rawPassword, 10);

    return await this.directosRepository.create({
      email,
      password,
      firstName,
      lastName,
    });
  }

  async getById(id: string) {
    return await this.directosRepository.getById(id);
  }

  async getByCredentials(email: string, password: string) {
    const director = await this.directosRepository.getByEmail(email);

    if (!director) throw new UnauthorizedException();

    if (!(await this.passwordService.compare(password, director.password)))
      throw new UnauthorizedException();

    return director.id;
  }

  async getStudyMembers(studyId: string) {
    return await this.directosRepository.getStudyMembers(studyId);
  }

  async getNonStudyMembers(studyId: string) {
    return await this.directosRepository.getNonStudyMembers(studyId);
  }

  async delete(directorId: string) {
    return this.directosRepository.hardDelete(directorId);
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
