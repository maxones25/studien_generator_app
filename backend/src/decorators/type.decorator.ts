import { SetMetadata } from '@nestjs/common';

export const Types = (...types: string[]) => SetMetadata('types', types);