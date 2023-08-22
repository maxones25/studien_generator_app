import { IsUUID } from 'class-validator';

export class StudyQueryDto {
  @IsUUID()
  readonly studyId: string;
}
