import { applyDecorators, Post,HttpCode, HttpStatus } from '@nestjs/common';

export function Command(endpoint: string, status = HttpStatus.OK) {
  return applyDecorators(
    Post(endpoint),
    HttpCode(status)
  );
}
