import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyToDirector } from '../../entities/studyToDirector.entity';
  
@Injectable()
export class RolesGuard implements CanActivate {
constructor(
    @InjectRepository(StudyToDirector)
    private studyToDirectorRepository: Repository<StudyToDirector>,
    private jwtService: JwtService,
    private reflector: Reflector
    ) {}

async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
    throw new UnauthorizedException();
    }
    try {
    const payload = await this.jwtService.verifyAsync(
        token,
        {
        secret: process.env.JWT_SECRET
        }
    );
    request["body"]["directorId"] = payload.directorId;
    const studyToDirector = await this.studyToDirectorRepository.findOne({
        where: {
            studyId: request.body.studyId,
            directorId: payload.directorId,
        }
    })
    return roles.includes(studyToDirector.role);
    } catch {
    throw new UnauthorizedException();
    }
}

private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}
}