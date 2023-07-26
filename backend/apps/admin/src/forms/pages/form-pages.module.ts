import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormPage } from '@entities/form-page.entity';
import { FormsModule } from '@admin/forms/forms.module';
import { FormPagesController } from './form-pages.controller';
import formPagesProviders from './form-pages.providers';

@Module({
  imports: [TypeOrmModule.forFeature([FormPage]), FormsModule],
  controllers: [
    FormPagesController
  ],
  providers: formPagesProviders,
})
export class FormPagesModule {}
