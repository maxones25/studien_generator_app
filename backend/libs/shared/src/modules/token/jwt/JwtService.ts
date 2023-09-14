import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ITokenService } from '../ITokenService';
import { Inject } from '@nestjs/common';

export class JwtService implements ITokenService {
  constructor(
    @Inject(NestJwtService)
    private readonly jwt: NestJwtService,
  ) {}

  verify(token: string) {
    return this.jwt.verify(token);
  }

  sign(payload: Record<string, any>): string {
    return this.jwt.sign(payload);
  }
}
