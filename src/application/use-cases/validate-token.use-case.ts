import { Injectable, Inject } from "@nestjs/common";
import type { IProfissionalRepository } from "../../domain/repositories/profissional.repository.interface";
import { Profissional } from "../../domain/entities/profissional.entity";

@Injectable()
export class ValidateTokenUseCase {
    constructor(
        @Inject('IProfissionalRepository')
        private readonly profissionalRepository: IProfissionalRepository,
    ) { }

    async execute(userId: number): Promise<Profissional | null> {
        const profissional = await this.profissionalRepository.findById(userId);

        if (profissional) {
            // Remover senha do retorno
            const { senha_hash, ...profissionalSemSenha } = profissional;
            return profissionalSemSenha as Profissional;
        }

        return null;
    }
}
