import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class ValidateIdPipe implements PipeTransform<string> {
  transform(value: string, { data }: ArgumentMetadata): string {
    if (!value || !validate(value)) {
      throw new BadRequestException(`${data} invalid`);
    }
    return value;
  }
}
