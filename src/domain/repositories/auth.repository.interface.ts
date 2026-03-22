import { Profissional } from "../entities/profissional.entity";

export interface IAuthRepository {
    findByEmail(email: string): Promise<Profissional | null>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}
