import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from '../../entities/form.entity';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { FormPagesModule } from './pages/form-pages.module';
import { FormEntitiesModule } from './entities/form-entities.module';
import { FormConfigurationsModule } from './configurations/form-configurations.module';
import { FormComponentsModule } from './pages/components/form-components.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Form]),
    FormEntitiesModule,
    FormConfigurationsModule,
    FormPagesModule,
    FormComponentsModule,
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
