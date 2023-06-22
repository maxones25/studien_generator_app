import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import { Director } from './director.entity';
import { Study } from './study.entity';

@Entity()
export class StudyToDirector {
    @PrimaryColumn()
    public studyId: string

    @PrimaryColumn()
    public directorId: string

    @Column()
    public role: string

    @ManyToOne(() => Study, (study) => study.studyToDirector)
    public study: Study

    @ManyToOne(() => Director, (director) => director.studyToDirector)
    public director: Director
}
