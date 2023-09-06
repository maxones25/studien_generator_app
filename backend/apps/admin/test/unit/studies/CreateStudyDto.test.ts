import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateStudyDto } from '@admin/studies/studies/repositories/dtos/CreateStudyDto';
import fakeData from '@test/fakeData';

describe('CreateStudyDto', () => {
  it('should pass validation with a valid name', async () => {
    const dto = plainToClass(CreateStudyDto, fakeData.study());

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation if name is empty', async () => {
    const dto = plainToClass(CreateStudyDto, {
      name: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if name is not a string', async () => {
    const dto = plainToClass(CreateStudyDto, {
      name: 123,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });
});
