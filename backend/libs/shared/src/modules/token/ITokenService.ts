
export const TOKEN_SERVICE = "TOKEN_SERVICE"

export interface ITokenService {
    verify(token: string): any;
    sign(payload: Record<string, any>): string;
}