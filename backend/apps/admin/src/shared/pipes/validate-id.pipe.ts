import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validateUUID } from '@shared/modules/uuid/uuid';

@Injectable()
export class ValidateIdPipe implements PipeTransform<string> {
  transform(value: string, { data }: ArgumentMetadata): string {
    if (!value || !validateUUID(value)) {
      throw new BadRequestException(`${data} invalid`);
    }
    return value;
  }
}
