import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IAuthMaeRepository } from '../../../domain/repositories/auth-mae.repository.interface';
import { UserMae } from '../../../domain/entities/user-mae.entity';
import { UserMaeSchema } from '../../database/typeorm/schemas/user-mae.schema';

@Injectable()
export class AuthMaeRepository implements IAuthMaeRepository {
    constructor(
        @InjectRepository(UserMaeSchema)
        private readonly repository: Repository<UserMaeSchema>,
    ) { }

    async findByEmail(email: string): Promise<UserMae | null> {
        const userMae = await this.repository.findOne({
            where: { email },
        });

        if (!userMae) {
            return null;
        }

        return this.toDomain(userMae);
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            // If password in database is not hashed, compare directly (compatibility)
            return plainPassword === hashedPassword;
        }
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async updateLastLogin(idUserMae: number): Promise<void> {
        await this.repository.update(
            { id_user_mae: idUserMae },
            { ultimo_login: new Date() }
        );
    }

    private toDomain(schema: UserMaeSchema): UserMae {
        const userMae = new UserMae();
        userMae.id_user_mae = schema.id_user_mae;
        userMae.id_binomio = schema.id_binomio;
        userMae.email = schema.email;
        userMae.password_hash = schema.password_hash;
        userMae.ativo = schema.ativo;
        userMae.data_cadastro = schema.data_cadastro;
        userMae.ultimo_login = schema.ultimo_login;
        return userMae;
    }
}
