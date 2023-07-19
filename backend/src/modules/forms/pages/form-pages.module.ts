import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormPage } from '../../../entities/form-page.entity';
import { FormPagesController } from './form-pages.controller';
import { FormPagesService } from './form-pages.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormPage])],
  controllers: [
    FormPagesController
  ],
  providers: [
    FormPagesService
  ],
})
export class FormPagesModule {}
