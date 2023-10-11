import { Module } from '@nestjs/common';
import { FormsModule } from './forms.module';
import { FormsCommands } from './controllers/forms.commands';
import { FormsQueries } from './controllers/forms.queries';
import { StudiesModule } from '@admin/studies/studies/studies.module';
import { PagesCommands } from './controllers/pages.commands';
import { PagesQueries } from './controllers/pages.queries';
import { EntitiesCommands } from './controllers/entities.commands';
import { EntitiesQueries } from './controllers/entities.queries';
import { ComponentsCommands } from './controllers/components.commands';
import { ComponentsQueries } from './controllers/components.queries';
import { ComponentsModule } from '@admin/forms/components/components.module';
import { EntitiesModule } from '@admin/entities/entities.module';

@Module({
  imports: [FormsModule, StudiesModule, EntitiesModule, ComponentsModule],
  controllers: [
    FormsCommands,
    FormsQueries,
    EntitiesCommands,
    EntitiesQueries,
    PagesCommands,
    PagesQueries,
    ComponentsCommands,
    ComponentsQueries,
  ],
})
export class FormsApp {}
