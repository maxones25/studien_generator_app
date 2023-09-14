export const PASSWORD_SERVICE = 'PASSWORD_SERVICE';

export interface IPasswordService {
  compare(data: string, encrypted: string): Promise<boolean>;
  hash(data: string): Promise<string>;
  generate(): string;
}
