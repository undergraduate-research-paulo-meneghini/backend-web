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
            // Remove password from response
            const { password_hash, ...professionalWithoutPassword } = profissional;
            return professionalWithoutPassword as Profissional;
        }

        return null;
    }
}
