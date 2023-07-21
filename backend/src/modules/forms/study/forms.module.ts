import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Form } from "../../../entities/form.entity";
import { FormConfigurationsModule } from "../configurations/form-configurations.module";
import { FormEntitiesModule } from "../entities/form-entities.module";
import { FormsController } from "./forms.controller";
import { FormsService } from "./forms.service";
import { FormComponentsModule } from "../pages/components/form-components.module";
import { FormPagesModule } from "../pages/form-pages.module";
import { FormConfiguration } from "../../../entities/form-configuration.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([Form, FormConfiguration]),
    FormEntitiesModule,
    FormConfigurationsModule,
    FormPagesModule,
    FormComponentsModule,
  ],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
