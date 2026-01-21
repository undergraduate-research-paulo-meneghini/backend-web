import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from '../../../domain/repositories/auth.repository.interface';
import { Profissional } from '../../../domain/entities/profissional.entity';
import { ProfissionalSchema } from '../../database/typeorm/schemas/profissional.schema';

@Injectable()
export class AuthRepository implements IAuthRepository {
    constructor(
        @InjectRepository(ProfissionalSchema)
        private readonly repository: Repository<ProfissionalSchema>,
    ) { }

    async findByEmail(email: string): Promise<Profissional | null> {
        const profissional = await this.repository.findOne({
            where: { email },
        });

        if (!profissional) {
            return null;
        }

        return this.toDomain(profissional);
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            // Se a senha no banco não estiver hasheada, compara diretamente (compatibilidade)
            return plainPassword === hashedPassword;
        }
    }

    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    private toDomain(schema: ProfissionalSchema): Profissional {
        const profissional = new Profissional();
        profissional.id_profissional = schema.id_profissional;
        profissional.nome_completo = schema.nome_completo;
        profissional.cpf = schema.cpf;
        profissional.registro_profissional = schema.registro_profissional;
        profissional.tipo_registro = schema.tipo_registro;
        profissional.cargo = schema.cargo;
        profissional.unidade_saude = schema.unidade_saude;
        profissional.email = schema.email;
        profissional.senha_hash = schema.senha_hash;
        profissional.perfil_acesso = schema.perfil_acesso;
        profissional.ativo = schema.ativo;
        profissional.data_cadastro = schema.data_cadastro;
        return profissional;
    }
}
