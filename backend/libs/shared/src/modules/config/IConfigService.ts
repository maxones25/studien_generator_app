
export const CONFIG_SERVICE = "CONFIG_SERVICE"

export interface IConfigService {
    get(key: string): string
}