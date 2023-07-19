import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from '../../entities/form.entity';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { FormPagesModule } from './pages/form-pages.module';
import { FormEntitiesModule } from './entities/form-entities.module';
import { FormConfigurationsModule } from './configurations/form-configurations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form]),
    FormPagesModule,
    FormConfigurationsModule,
    FormEntitiesModule,
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
