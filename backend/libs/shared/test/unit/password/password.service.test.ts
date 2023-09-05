import { PasswordService } from '@shared/modules/password/password.service';
import * as bcrypt from 'bcrypt';
import { generate } from 'generate-password';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('generate-password', () => ({
  generate: jest.fn(),
}));

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(() => {
    passwordService = new PasswordService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call bcrypt.compare with correct arguments', async () => {
    const data = 'testData';
    const encrypted = 'testEncrypted';
    await passwordService.compare(data, encrypted);
    expect(bcrypt.compare).toHaveBeenCalledWith(data, encrypted);
  });

  it('should call bcrypt.hash with correct arguments', async () => {
    const data = 'testData';
    await passwordService.hash(data);
    expect(bcrypt.hash).toHaveBeenCalledWith(data);
  });

  it('should call generate with correct arguments', async () => {
    await passwordService.generate();
    expect(generate).toHaveBeenCalledWith({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: false,
      excludeSimilarCharacters: true,
    });
  });
});
