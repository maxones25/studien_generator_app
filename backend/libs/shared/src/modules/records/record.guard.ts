import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export type ValidateOptions = {
  studyId: string;
  id: string;
  params: Record<string, any>;
};

export abstract class RecordGuard implements CanActivate {
  constructor(private record: string, private paramName: string) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const studyId = this.getStudyId(request)
    
    const id = request.query[this.paramName];

    if (typeof id !== 'string') throw new UnauthorizedException();

    const item = await this.validate({ studyId, id, params: request.params });

    if (!item) throw new UnauthorizedException();

    (request as any)[this.record] = item;

    return true;
  }

  protected abstract validate(options: ValidateOptions): any;

  private getStudyId(request: Request){
    if(typeof request?.params?.studyId === "string") return request.params.studyId;
    if(typeof request?.query?.studyId === "string") return request.query.studyId;
    throw new UnauthorizedException();
  }
}
