import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMaeSchema } from '../typeorm/schemas/user-mae.schema';
import { UserMae } from '../../../domain/entities/user-mae.entity';
import type { IUserMaeRepository } from '../../../domain/repositories/user-mae.repository.interface';

@Injectable()
export class UserMaeRepository implements IUserMaeRepository {
    constructor(
        @InjectRepository(UserMaeSchema)
        private readonly repository: Repository<UserMaeSchema>,
    ) { }

    async findById(id: number): Promise<UserMae | null> {
        const userMae = await this.repository.findOne({
            where: { id_user_mae: id },
        });
        return userMae ? this.toDomain(userMae) : null;
    }

    async findByEmail(email: string): Promise<UserMae | null> {
        const userMae = await this.repository.findOne({
            where: { email },
        });
        return userMae ? this.toDomain(userMae) : null;
    }

    async findByBinomioId(idBinomio: number): Promise<UserMae | null> {
        const userMae = await this.repository.findOne({
            where: { id_binomio: idBinomio },
        });
        return userMae ? this.toDomain(userMae) : null;
    }

    async create(userMae: UserMae): Promise<UserMae> {
        const schema = this.toSchema(userMae);
        const saved = await this.repository.save(schema);
        return this.toDomain(saved);
    }

    private toDomain(schema: UserMaeSchema): UserMae {
        const userMae = new UserMae();
        userMae.id_user_mae = schema.id_user_mae;
        userMae.id_binomio = schema.id_binomio;
        userMae.email = schema.email;
        userMae.senha_hash = schema.senha_hash;
        userMae.ativo = schema.ativo;
        userMae.data_cadastro = schema.data_cadastro;
        userMae.ultimo_login = schema.ultimo_login;
        return userMae;
    }

    private toSchema(userMae: UserMae): Partial<UserMaeSchema> {
        return {
            id_user_mae: userMae.id_user_mae,
            id_binomio: userMae.id_binomio,
            email: userMae.email,
            senha_hash: userMae.senha_hash,
            ativo: userMae.ativo,
            data_cadastro: userMae.data_cadastro,
            ultimo_login: userMae.ultimo_login,
        };
    }
}
