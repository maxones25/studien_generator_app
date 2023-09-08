import { Entity, Column, OneToMany } from 'typeorm';
import { ChatMessage, ChatMessageReceipt, StudyMember } from '../..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseDirector extends IdEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}

@Entity()
export class Director extends BaseDirector {
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
