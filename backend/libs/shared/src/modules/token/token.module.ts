import { DynamicModule, Global } from '@nestjs/common';
import { TOKEN_SERVICE } from './ITokenService';
import { JwtService } from './jwt/JwtService';
import JwtModule from './jwt/jwt.module';

@Global()
export default class TokenModule {
  static forRoot(): DynamicModule {
    return {
      module: TokenModule,
      imports: [JwtModule.forRoot()],
      providers: [
        {
          provide: TOKEN_SERVICE,
          useClass: JwtService,
        },
      ],
      exports: [TOKEN_SERVICE],
    };
  }
}
