import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError, TypeORMError } from 'typeorm';
import { TypeOrmResponseError } from './type-orm-respones-error';

@Catch(QueryFailedError, EntityNotFoundError, CannotCreateEntityIdMapError, TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		let message = '(exception as any).message.message';
		let code = 'UnprocessableEntity';

		let status = HttpStatus.UNPROCESSABLE_ENTITY;

		console.log(exception)
		
		switch (exception.constructor) {
				case QueryFailedError:  // this is a TypeOrm error
						status = HttpStatus.UNPROCESSABLE_ENTITY
						message = (exception as QueryFailedError).message;
						code = (exception as any).code;
						break;
				case EntityNotFoundError:  // this is another TypeOrm error
						status = HttpStatus.UNPROCESSABLE_ENTITY
						message = (exception as EntityNotFoundError).message;
						code = (exception as any).code;
						break;
				case CannotCreateEntityIdMapError: // and another
						status = HttpStatus.UNPROCESSABLE_ENTITY
						message = (exception as CannotCreateEntityIdMapError).message;
						code = (exception as any).code;
						break;
		}

		response.status(status).json(TypeOrmResponseError(status, message, code, request));
	}
}