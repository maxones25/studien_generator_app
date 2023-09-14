import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateGroupDto } from '@admin/groups/dtos/CreateGroupDto';
import { LoginDirectorDto } from '@admin/directors/domain/dtos/LoginDirectorDto';
import fakeData from '@test/fakeData';

describe('LoginDirectorDto', () => {
  it('should pass validation with a valid name', async () => {
    const director = fakeData.director();

    const dto = plainToClass(LoginDirectorDto, {
      email: director.email,
      password: director.password,
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation if email is empty', async () => {
    const dto = plainToClass(LoginDirectorDto, {
      email: '',
      password: fakeData.director().password,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if email is not a string', async () => {
    const dto = plainToClass(CreateGroupDto, {
      email: 123,
      password: fakeData.director().password,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation if password is empty', async () => {
    const dto = plainToClass(LoginDirectorDto, {
      email: fakeData.director().email,
      password: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if password is not a string', async () => {
    const dto = plainToClass(CreateGroupDto, {
      email: fakeData.director().email,
      password: 123,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });
});
