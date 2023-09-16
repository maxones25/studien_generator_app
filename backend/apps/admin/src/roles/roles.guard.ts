import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { validateUUID } from '@shared/modules/uuid/uuid';
import { MembersService } from '@admin/studies/members/members.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(MembersService)
    private membersService: MembersService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const directorId = this.getDirectorId(request);
    const studyId = this.getStudyId(request);

    const member = await this.membersService.getRelatedByStudy(
      studyId,
      directorId,
    );

    if (!member) throw new UnauthorizedException();

    if (!roles.includes(member.role)) throw new UnauthorizedException();

    return true;
  }

  private getDirectorId(request: any) {
    if (typeof request?.payload?.directorId !== 'string')
      throw new UnauthorizedException();
    const directorId = request.payload.directorId as string;
    if (!validateUUID(directorId)) throw new UnauthorizedException();
    return directorId;
  }

  private getStudyId(request: any) {
    if (request.params.studyId) return request.params.studyId;
    if (request.query.studyId) return request.query.studyId;
    throw new BadRequestException('studyId required');
  }
}
