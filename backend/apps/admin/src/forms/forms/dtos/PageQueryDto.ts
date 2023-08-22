import { IsUUID } from 'class-validator';

export class PageQueryDto {
  @IsUUID()
  readonly pageId: string;
}
