import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Study {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}