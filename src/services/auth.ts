import { LoginRequestParams, LoginResponseParams } from "../types/services/auth.ts";

export const loginService = (params: LoginRequestParams): Promise<LoginResponseParams> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
}