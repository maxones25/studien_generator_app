import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async compare(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
  }

  async hash(data: string, saltOrRounds: string | number) {
    return await bcrypt.hash(data, saltOrRounds);
  }
}
