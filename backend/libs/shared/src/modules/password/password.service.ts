import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';
import { IHashPassword } from './IHashPassword';

@Injectable()
export class PasswordService implements IHashPassword {
  async compare(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
  }

  async hash(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async generate() {
    return generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: false,
      excludeSimilarCharacters: true,
    });
  }

  async generateHashed() {
    const password = await this.generate();
    return await this.hash(password);
  }
}
