import { UserMae } from "../entities/user-mae.entity";

export interface IAuthMaeRepository {
    findByEmail(email: string): Promise<UserMae | null>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
    updateLastLogin(idUserMae: number): Promise<void>;
}
