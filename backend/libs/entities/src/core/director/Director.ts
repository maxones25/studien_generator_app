import { Entity } from '@entities/modules/core/Entity';

interface DirectorAttributes {
  firstName: string;

  lastName: string;

  email: string;

  password: string;
}

export interface IDirector extends Entity, DirectorAttributes {}

export class Director implements IDirector {
  readonly id: string;
  readonly createdAt = new Date();
  readonly modifiedAt = new Date();
  readonly deletedAt: Date = null;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;

  static create(data: DirectorAttributes & { id: string }): Director {
    return {
        ...data,
        createdAt: new Date(),
        modifiedAt: new Date(),
        deletedAt: null,
    }
  }
}
