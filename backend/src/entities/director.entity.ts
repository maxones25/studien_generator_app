import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Director {

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @PrimaryColumn()
  email: string;

  @Column()
  password: string;
}