import { StudyMember } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';

export const MembersDb = TypeOrmModule.forFeature([StudyMember]);
