import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ChatMessage, ChatMessageReceipt, StudyMember } from '.';

@Entity()
export class Director {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  get displayName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @OneToMany(() => StudyMember, (studyMember) => studyMember.director)
  public studies: StudyMember[];

  @OneToMany(() => ChatMessage, (message) => message.director)
  messages: ChatMessage[];

  @OneToMany(
    () => ChatMessageReceipt,
    (messageReceipt) => messageReceipt.director,
  )
  messageReceipts: ChatMessageReceipt[];
}
