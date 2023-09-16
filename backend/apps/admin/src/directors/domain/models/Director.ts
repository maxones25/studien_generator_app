import { IDirector } from '@entities/core/director';

export class Director implements IDirector {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(data: Partial<IDirector>) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }
}
