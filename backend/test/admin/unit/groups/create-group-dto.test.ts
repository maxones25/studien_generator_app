import { validate } from 'class-validator';
import { CreateGroupDto } from '../../../../src/modules/groups/dtos/CreateGroupDto';
import { plainToClass } from 'class-transformer';

describe('CreateGroupDto', () => {
  it('should pass validation with a valid name', async () => {
    const dto = plainToClass(CreateGroupDto, {
      name: 'Valid Name',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation if name is empty', async () => {
    const dto = plainToClass(CreateGroupDto, {
      name: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if name is not a string', async () => {
    const dto = plainToClass(CreateGroupDto, {
      name: 123,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });
});
