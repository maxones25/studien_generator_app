import { IsUUID } from 'class-validator';

export class MemberQueryDto {
  @IsUUID()
  readonly studyId: string;

  @IsUUID()
  readonly directorId: string;
}
