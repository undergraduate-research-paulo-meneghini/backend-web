import { Injectable, Inject } from "@nestjs/common";
import * as profissionalRepositoryInterface from "../../domain/repositories/profissional.repository.interface";
import { Profissional } from "../../domain/entities/profissional.entity";

@Injectable()
export class CreateProfissionalUseCase {
    constructor(
        @Inject('IProfissionalRepository')
        private readonly profissionalRepository: profissionalRepositoryInterface.IProfissionalRepository
    ) { }

    async execute(dataProfissional: Profissional): Promise<Profissional> {
        const profissional: Profissional = {
            id_profissional: dataProfissional.id_profissional,
            nome_completo: dataProfissional.nome_completo,
            cpf: dataProfissional.cpf,
            registro_profissional: dataProfissional.registro_profissional,
            tipo_registro: dataProfissional.tipo_registro,
            cargo: dataProfissional.cargo,
            unidade_saude: dataProfissional.unidade_saude,
            email: dataProfissional.email,
            senha_hash: dataProfissional.senha_hash,
            perfil_acesso: dataProfissional.perfil_acesso,
            ativo: dataProfissional.ativo,
            data_cadastro: new Date()
        }
        return this.profissionalRepository.create(profissional);
    }

    async findAll(): Promise<Profissional[]> {
        return this.profissionalRepository.findAll();
    }

    async findById(id: number): Promise<Profissional | null> {
        return this.profissionalRepository.findById(id);
    }

    async update(id: number, profissional: Partial<Profissional>): Promise<Profissional> {
        return this.profissionalRepository.update(id, profissional);
    }

    async delete(id: number): Promise<void> {
        return this.profissionalRepository.delete(id);
    }
}