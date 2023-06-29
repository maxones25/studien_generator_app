import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from '../../../entities/director.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDirectorDto } from './dtos/LoginDirectorDto';
import { SignupDirectorDto } from './dtos/SignupDirectorDto';
import { PasswordService } from '../password.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Director)
    private directorsRepository: Repository<Director>,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async checkCredentials({ email, password }: LoginDirectorDto) {
    const director = await this.directorsRepository.findOne({
      where: {
        email,
      },
    });

    if (!director) throw new UnauthorizedException();

    if (!(await this.passwordService.compare(password, director.password)))
      throw new UnauthorizedException();

    const accessToken = await this.jwtService.signAsync({
      directorId: director.id,
      type: 'director',
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
