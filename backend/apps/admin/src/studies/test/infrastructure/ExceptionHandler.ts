import {
  ExceptionFilter,
  ArgumentsHost,
  BadRequestException,
  Catch,
} from '@nestjs/common';
import {
  StudiesException,
  UserNotFoundException,
} from '../domain/StudiesExceptions';

@Catch(UserNotFoundException)
export class StudiesExceptionHandler
  implements ExceptionFilter<StudiesException>
{
  catch(exception: StudiesException, host: ArgumentsHost) {
    const message = exception.message;

    switch (exception.constructor) {
      case UserNotFoundException:
        throw new BadRequestException(message);
    }
  }
}
