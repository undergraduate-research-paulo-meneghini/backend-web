import { Injectable, Inject, UnauthorizedException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { IAuthMaeRepository } from "../../domain/repositories/auth-mae.repository.interface";
import { LoginCredentials } from "../../domain/entities/login-credentials.entity";
import { AuthToken } from "../../domain/entities/auth-token.entity";

@Injectable()
export class LoginMaeUseCase {
    private readonly logger = new Logger(LoginMaeUseCase.name);

    constructor(
        @Inject('IAuthMaeRepository')
        private readonly authMaeRepository: IAuthMaeRepository,
        private readonly jwtService: JwtService,
    ) { }

    async execute(credentials: LoginCredentials): Promise<AuthToken> {
        this.logger.log('---------- USE CASE: Login Mãe ----------');
        this.logger.log(`Credenciais recebidas - Email: ${credentials.email}`);

        // Buscar mãe por email
        this.logger.log(`Buscando mãe no banco de dados com email: ${credentials.email}`);
        const userMae = await this.authMaeRepository.findByEmail(credentials.email);

        if (!userMae) {
            this.logger.warn(`Mãe não encontrada com email: ${credentials.email}`);
            throw new UnauthorizedException('Credenciais inválidas');
        }

        this.logger.log(`Mãe encontrada - ID: ${userMae.id_user_mae}, Email: ${userMae.email}`);
        this.logger.log(`Dados da mãe: ${JSON.stringify({
            id_user_mae: userMae.id_user_mae,
            email: userMae.email,
            id_binomio: userMae.id_binomio,
            ativo: userMae.ativo
        }, null, 2)}`);

        // Validate password
        this.logger.log('Validating password...');
        const isPasswordValid = await this.authMaeRepository.validatePassword(
            credentials.password,
            userMae.password_hash
        );

        if (!isPasswordValid) {
            this.logger.warn(`Invalid password for email: ${credentials.email}`);
            throw new UnauthorizedException('Credenciais inválidas');
        }

        this.logger.log('Password validated successfully');

        // Verificar se o usuário está ativo
        if (!userMae.ativo) {
            this.logger.warn(`Tentativa de login com usuário inativo - Email: ${credentials.email}`);
            throw new UnauthorizedException('Usuário inativo');
        }

        this.logger.log('Usuário está ativo');

        // Atualizar último login
        this.logger.log(`Atualizando último login para ID: ${userMae.id_user_mae}`);
        await this.authMaeRepository.updateLastLogin(userMae.id_user_mae);

        // Gerar token JWT
        const payload = {
            sub: userMae.id_user_mae,
            email: userMae.email,
            id_binomio: userMae.id_binomio,
        };

        this.logger.log(`Gerando token JWT com payload: ${JSON.stringify(payload, null, 2)}`);
        const access_token = this.jwtService.sign(payload);
        this.logger.log('Token JWT gerado com sucesso');
        this.logger.log(`Token gerado: ${access_token}`);

        // Remove password from response
        const { password_hash, ...userMaeWithoutPassword } = userMae;

        this.logger.log('Login mãe concluído com sucesso');
        this.logger.log('---------- FIM USE CASE ----------');

        return {
            access_token,
            profissional: userMaeWithoutPassword as any,
        };
    }
}
