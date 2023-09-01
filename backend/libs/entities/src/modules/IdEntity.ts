import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export abstract class IdEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
