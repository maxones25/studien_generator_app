import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Entity } from '../core/Entity';

export abstract class IdEntity extends BaseEntity implements Entity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
