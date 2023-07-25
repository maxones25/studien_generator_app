import { Injectable } from "@nestjs/common";
import { Form } from "@entities/form.entity";
import { Repository } from "typeorm";

@Injectable()
export class FormsRepository extends Repository<Form> {

    getAll(studyId: string) {
        return this.find({
          where: {
            studyId,
          },
          select: {
            id: true,
            name: true,
          },
        });
      }
    
      getById(id: string) {
        return this.findOne({
          where: {
            id,
          },
          select: {
            id: true,
            name: true,
          },
        });
      }
}