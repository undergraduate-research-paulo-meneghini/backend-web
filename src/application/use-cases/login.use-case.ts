import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { IAuthRepository } from "../../domain/repositories/auth.repository.interface";
import { LoginCredentials } from "../../domain/entities/login-credentials.entity";
import { AuthToken } from "../../domain/entities/auth-token.entity";

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('IAuthRepository')
        private readonly authRepository: IAuthRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(credentials: LoginCredentials): Promise<AuthToken> {
        // Buscar profissional por email
        const profissional = await this.authRepository.findByEmail(credentials.email);

        if (!profissional) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Validar senha
        const isPasswordValid = await this.authRepository.validatePassword(
            credentials.password,
            profissional.senha_hash
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        // Verificar se o profissional está ativo
        if (!profissional.ativo) {
            throw new UnauthorizedException('Usuário inativo');
        }

        // Gerar token JWT
        const payload = {
            sub: profissional.id_profissional,
            email: profissional.email,
            perfil_acesso: profissional.perfil_acesso,
        };

        const access_token = this.jwtService.sign(payload);

        // Remover senha do retorno
        const { senha_hash, ...profissionalSemSenha } = profissional;

        return {
            access_token,
            profissional: profissionalSemSenha as any,
        };
    }
}
