import { UserMae } from '../entities/user-mae.entity';

export interface IUserMaeRepository {
    create(userMae: UserMae): Promise<UserMae>;
    findByEmail(email: string): Promise<UserMae | null>;
    findByBinomioId(idBinomio: number): Promise<UserMae | null>;
    findById(id: number): Promise<UserMae | null>;
}
