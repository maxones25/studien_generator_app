import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';
import { IPasswordService } from './IPasswordService';
import { IConfigService } from '../config/IConfigService';

@Injectable()
export class PasswordService implements IPasswordService {
  constructor(
    @Inject('IConfigService')
    private readonly configService: IConfigService,
  ) {}

  async compare(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
  }

  async hash(data: string) {
    const salt = this.configService.get('PASSWORD_SALT') ?? 10;
    return await bcrypt.hash(data, salt);
  }

  generate() {
    return generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: false,
      excludeSimilarCharacters: true,
    });
  }
}
