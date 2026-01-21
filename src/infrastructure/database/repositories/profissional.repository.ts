import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfissionalSchema } from '../typeorm/schemas/profissional.schema';
import { Profissional } from '../../../domain/entities/profissional.entity';
import { IProfissionalRepository } from '../../../domain/repositories/profissional.repository.interface';

@Injectable()
export class ProfissionalRepository implements IProfissionalRepository {
    constructor(
        @InjectRepository(ProfissionalSchema)
        private readonly repository: Repository<ProfissionalSchema>,
    ) { }

    async findById(id: number): Promise<Profissional | null> {
        const profissional = await this.repository.findOne({
            where: { id_profissional: id },
        });
        return profissional ? this.toDomain(profissional) : null;
    }

    async findAll(): Promise<Profissional[]> {
        const profissionais = await this.repository.find();
        return profissionais.map(p => this.toDomain(p));
    }

    async create(profissional: Profissional): Promise<Profissional> {
        const schema = this.toSchema(profissional);
        const saved = await this.repository.save(schema);
        return this.toDomain(saved);
    }

    async update(id: number, profissional: Partial<Profissional>): Promise<Profissional> {
        await this.repository.update({ id_profissional: id }, this.toSchema(profissional as Profissional));
        const updated = await this.repository.findOne({
            where: { id_profissional: id },
        });
        if (!updated) {
            throw new Error('Profissional not found');
        }
        return this.toDomain(updated);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({ id_profissional: id });
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

    private toSchema(profissional: Profissional): Partial<ProfissionalSchema> {
        return {
            id_profissional: profissional.id_profissional,
            nome_completo: profissional.nome_completo,
            cpf: profissional.cpf,
            registro_profissional: profissional.registro_profissional,
            tipo_registro: profissional.tipo_registro,
            cargo: profissional.cargo,
            unidade_saude: profissional.unidade_saude,
            email: profissional.email,
            senha_hash: profissional.senha_hash,
            perfil_acesso: profissional.perfil_acesso,
            ativo: profissional.ativo,
            data_cadastro: profissional.data_cadastro,
        };
    }
}
