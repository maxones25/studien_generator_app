import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import fakeData from '@test/fakeData';
import { SignupDirectorDto } from '@admin/auth/dtos/SignupDirectorDto';

describe('SignUpDirectorDto', () => {
  it('should pass validation with a valid name', async () => {
    const director = fakeData.director();

    const dto = plainToClass(SignupDirectorDto, {
      ...director,
      activationPassword: '1234',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should fail validation if email is empty', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: '1234',
      email: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if email is not a string', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: '1234',
      email: 898,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation if password is empty', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: '1234',
      password: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if password is not a string', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: '1234',
      password: true,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation if firstName is empty', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: '1234',
      firstName: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if firstName is not a string', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: '1234',
      firstName: true,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation if lastName is empty', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: '1234',
      lastName: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if lastName is not a string', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: '1234',
      lastName: [],
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });

  it('should fail validation if activationPassword is empty', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: '',
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail validation if activationPassword is not a string', async () => {
    const dto = plainToClass(SignupDirectorDto, {
      ...fakeData.director(),
      activationPassword: 1234,
    });

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isString');
  });
});
