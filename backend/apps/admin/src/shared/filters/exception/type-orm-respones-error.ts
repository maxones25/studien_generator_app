import { Request } from 'express';
import { IResponseError } from './response-error.interface';

export const TypeOrmResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError = (
    statusCode: number,
    message: string,
    code: string,
    request: Request
): IResponseError => {
    return {
        statusCode: statusCode,
        message,
        code,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method
    };
};