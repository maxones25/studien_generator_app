import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from 'src/entities/director.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDirectorDto } from './dtos/LoginDirectorDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DirectorAuthService {
    constructor(
        @InjectRepository(Director)
        private directorsRepository: Repository<Director>,
        private jwtService: JwtService,
      ) {}
    
      async checkCredentials({email, firstName, lastName, password} : LoginDirectorDto) {
        const director = await this.directorsRepository.findOne({
            where: {
              email,
            },
          });
      
          if (!director) throw new UnauthorizedException();

          if (await bcrypt.compare(password, director.password))
          throw new UnauthorizedException();
      
          return await this.jwtService.signAsync({
              directorId: director.id,
          })
      }

      async create({email, firstName, lastName, password} : LoginDirectorDto, activationPassword) {
        if (activationPassword != '1234') throw new UnauthorizedException(); //muss geändert werden!!

        const hashedPassword = bcrypt.hashSync(password, 10);

        this.directorsRepository.insert({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        })

        return true;
      }
}
