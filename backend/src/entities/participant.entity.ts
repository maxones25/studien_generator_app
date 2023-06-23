import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @ManyToOne(() => Group, (group) => group.participants, {
    onDelete: "CASCADE"
  })
  group: Group;
}
