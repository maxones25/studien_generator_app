import { DataSource } from 'typeorm';
import { Study } from './entities/study.entity';
import { StudyMember } from './entities/study-member';
import { Director } from './entities/director.entity';
import { Participant } from './entities/participant.entity';
import { Group } from './entities/group.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'studien_generator_app',
  entities: [Study, StudyMember, Director, Participant, Group],
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Data Source has been initialized!');

    const studyRepo = AppDataSource.getRepository(Study);

    await studyRepo.insert({ name: 'Test Studie' });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
