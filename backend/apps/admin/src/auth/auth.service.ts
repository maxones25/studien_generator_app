import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDirectorDto } from './dtos/LoginDirectorDto';
import { SignupDirectorDto } from './dtos/SignupDirectorDto';
import { PasswordService } from '@shared/modules/password/password.service';
import { DirectorsRepository } from '@admin/directors/directors.repository';
import { ConfigService } from '@nestjs/config';
import { Director } from '@entities/director.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(DirectorsRepository)
    private directorsRepository: DirectorsRepository,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    private configService: ConfigService,
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
    if (activationPassword !== this.configService.get('ACTIVATION_PASSWORD'))
      throw new UnauthorizedException();

    const hashedPassword = await this.passwordService.hash(password, 10);

    const director = new Director();

    director.email = email;
    director.firstName = firstName;
    director.lastName = lastName;
    director.password = hashedPassword;

    await this.directorsRepository.insert(director);

    return director.id;
  }
}
