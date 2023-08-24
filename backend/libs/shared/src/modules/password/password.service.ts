import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';

@Injectable()
export class PasswordService {
  async compare(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
  }

  async hash(data: string, saltOrRounds: string | number) {
    return await bcrypt.hash(data, saltOrRounds);
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

  async generateHashed(saltOrRounds: string | number) {
    const password = await this.generate();
    return await this.hash(password, saltOrRounds);
  }
}
