import { UseCase } from '@shared/modules/core/UseCase';

export const LOGIN_ADMIN_USE_CASE = 'LOGIN_ADMIN_USE_CASE';

export type LoginAdminInput = {
  activationPassword: string;
};

export interface ILoginAdminUseCase extends UseCase<LoginAdminInput, string> {}
