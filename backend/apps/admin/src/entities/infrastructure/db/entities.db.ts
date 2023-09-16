import { Entity, EntityField } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';

export const EntitiesDb = TypeOrmModule.forFeature([Entity, EntityField]);
