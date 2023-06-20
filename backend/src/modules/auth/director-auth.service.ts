import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from '../../entities/director.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDirectorDto } from './dtos/LoginDirectorDto';
import * as bcrypt from 'bcrypt';
import { SignupDirectors } from './dtos/SignupDirectorDto';

@Injectable()
export class DirectorAuthService {
    constructor(
        @InjectRepository(Director)
        private directorsRepository: Repository<Director>,
        private jwtService: JwtService,
      ) {}
    
      async checkCredentials({email, password} : LoginDirectorDto) {
        const director = await this.directorsRepository.findOne({
            where: {
              email,
            },
          });
      
          if (!director) throw new UnauthorizedException();

          if (!await bcrypt.compare(password, director.password)) 
            throw new UnauthorizedException();

      
          return await this.jwtService.signAsync({
              directorEmail: director.email,
          })
      }

      async create({email, firstName, lastName, password, activationPassword} : SignupDirectors) {
        if (activationPassword != '1234') throw new UnauthorizedException(); //muss geändert werden!!

        const hashedPassword = await bcrypt.hash(password, 10);

        return await this.directorsRepository.insert({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        })
      }
}