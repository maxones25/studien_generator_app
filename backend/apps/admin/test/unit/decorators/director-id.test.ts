import { DirectorId } from '@admin/decorators/director-id.decorator';
import { UnauthorizedException } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

function getParamDecoratorFactory(decorator: Function) {
  class Test {
    public test(@decorator() value) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}

describe('DirectorId', () => {
  const factory = getParamDecoratorFactory(DirectorId);

  it('should return directorId when it exists', () => {
    const directorId = 'test_directorId';

    const request = { payload: { directorId } };

    const ctx = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(request),
      }),
    } as unknown as ExecutionContext;

    const result = factory(null, ctx);

    expect(result).toBe(directorId);
  });

  it('should throw UnauthorizedException when directorId does not exist', () => {
    const request = { payload: undefined };

    const ctx = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(request),
      }),
    } as unknown as ExecutionContext;

    expect(() => factory(null, ctx)).toThrow(UnauthorizedException);
  });
});
