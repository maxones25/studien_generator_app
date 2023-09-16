import { FieldType, IField } from '@entities/core/entity';

export class Field implements IField {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  name: string;
  type: FieldType;
  entityId: string;

  constructor(data: Partial<IField>) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }

  isValid(){
    if(!this.name) return false;
    if(!this.type) return false;
    return true;
  }
}
