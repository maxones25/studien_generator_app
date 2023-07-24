import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { ValidateIdPipe } from '@shared/pipes/validate-id.pipe';

describe('ValidateIdPipe', () => {
  const validateIdPipe = new ValidateIdPipe();

  it('should validate id', async () => {
    const id = faker.string.uuid();

    const result = validateIdPipe.transform(id, { type: 'param', data: 'id' });

    expect(result).toEqual(id);
  });

  it('should fail because id is not a uuid', async () => {
    const id = 'not-a-uuid';

    expect(() =>
      validateIdPipe.transform(id, { type: 'param', data: 'id' }),
    ).toThrow(BadRequestException);
  });
});
