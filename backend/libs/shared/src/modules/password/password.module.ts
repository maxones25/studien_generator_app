import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PASSWORD_SERVICE } from './IPasswordService';

@Module({
  providers: [
    {
      provide: PASSWORD_SERVICE,
      useClass: PasswordService,
    },
  ],
  exports: [PASSWORD_SERVICE],
})
export class PasswordModule {}
