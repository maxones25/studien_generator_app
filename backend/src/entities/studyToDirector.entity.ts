import { Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { Director } from './director.entity';
import { Study } from './study.entity';

@Entity()
export class StudyToDirector {
    @PrimaryGeneratedColumn('uuid')
    public studyToDirectorId: string

    @Column()
    public studyId: string

    @Column()
    public directorId: string

    @Column()
    public role: string

    @ManyToOne(() => Study, (study) => study.studyToDirector)
    public study: Study

    @ManyToOne(() => Director, (director) => director.studyToDirector)
    public director: Director
}
