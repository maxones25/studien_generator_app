import { Test, TestingModule } from '@nestjs/testing';
import { DirectorAuthService } from './director-auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Director } from '../..//entities/director.entity';
import { Repository } from 'typeorm';
import { activationPasswordConstant, jwtConstants } from './constants';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('DirectorAuthService', () => {
  let service: DirectorAuthService;
  let directorRepository: Repository<Director>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,  // muss geändert werden !!!
          signOptions: { expiresIn: '30d' },
        }),
      ],
      providers: [ 
        DirectorAuthService, 
        {
          provide: getRepositoryToken(Director),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<DirectorAuthService>(DirectorAuthService);
    directorRepository = module.get<Repository<Director>>(getRepositoryToken(Director));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should call create', async () => {
    const mockDirector: Director = { firstName: 'John', lastName: 'Doe', email: 'test@email.de', password: '1234'};
    jest.spyOn(directorRepository, 'insert').mockImplementation(() => Promise.resolve({raw: true, identifiers: null, generatedMaps: null}));

    const result = await service.create({...mockDirector, activationPassword: activationPasswordConstant.password});
    expect(result).toEqual({raw: true, identifiers: null, generatedMaps: null});
  });

  it('should call checkCredentials', async () => {
    const password = '1234';
    const hashedPassword = await bcrypt.hash(password, 10);
    const mockDirector: Director = { firstName: 'John', lastName: 'Doe', email: 'test@email.de', password: hashedPassword};
    jest.spyOn(directorRepository, 'findOne').mockImplementation(() => Promise.resolve(mockDirector));

    const token = await service.checkCredentials({email: mockDirector.email, password: password});
    const result = await jwtService.verifyAsync(token.accessToken,{secret: jwtConstants.secret});
    expect(result.directorEmail).toEqual(mockDirector.email);
    });
});