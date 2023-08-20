import { Module } from '@nestjs/common';
import { FormsCommands } from './controllers/form.commands';
import { FormsModule } from './forms.module';
import { FormsQueries } from './controllers/forms.queries';

@Module({
  imports: [FormsModule],
  controllers: [FormsCommands, FormsQueries],
})
export class FormsApp {}
