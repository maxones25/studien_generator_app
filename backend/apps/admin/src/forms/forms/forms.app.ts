import { Module } from '@nestjs/common';
import { FormsModule } from './forms.module';
import { FormsCommands } from './controllers/forms.commands';
import { FormsQueries } from './controllers/forms.queries';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { EntitiesModule } from '@admin/entities/entities/entities.module';
import { PagesCommands } from './controllers/pages.commands';
import { PagesQueries } from './controllers/pages.queries';
import { EntitiesCommands } from './controllers/entities.commands';
import { EntitiesQueries } from './controllers/entities.queries';

@Module({
  imports: [FormsModule, StudiesModule, EntitiesModule],
  controllers: [
    FormsCommands,
    FormsQueries,
    PagesCommands,
    PagesQueries,
    EntitiesCommands,
    EntitiesQueries,
  ],
})
export class FormsApp {}
