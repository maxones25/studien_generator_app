export interface IHashPassword {
  hash(data: string): Promise<string>;
}
