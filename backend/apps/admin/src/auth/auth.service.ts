import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDirectorDto } from './dtos/LoginDirectorDto';
import { SignupDirectorDto } from './dtos/SignupDirectorDto';
import { PasswordService } from '@shared/modules/password/password.service';
import { DirectorsRepository } from '@admin/directors/directors.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(DirectorsRepository)
    private directorsRepository: DirectorsRepository,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async checkCredentials({ email, password }: LoginDirectorDto) {
    const director = await this.directorsRepository.getByEmail(email);

    if (!director) throw new UnauthorizedException();

    if (!(await this.passwordService.compare(password, director.password)))
      throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync({
      directorId: director.id,
    });

    return {
      accessToken,
    };
  }

  async create({
    email,
    firstName,
    lastName,
    password,
    activationPassword,
  }: SignupDirectorDto) {
    if (activationPassword != process.env.ACTIVATION_PASSWORD)
      throw new UnauthorizedException();

    const hashedPassword = await this.passwordService.hash(password, 10);

    const { identifiers } = await this.directorsRepository.insert({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });
    return { id: identifiers[0].id };
  }
}
