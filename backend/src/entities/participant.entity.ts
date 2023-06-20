import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;
}
