import { Controller, Post, Body, Get, UseGuards, Request, Logger } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { LoginMaeUseCase } from '../../application/use-cases/login-mae.use-case';
import { ValidateTokenUseCase } from '../../application/use-cases/validate-token.use-case';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly loginMaeUseCase: LoginMaeUseCase,
        private readonly validateTokenUseCase: ValidateTokenUseCase,
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        console.log("Login DTO: ", loginDto);
        return await this.loginUseCase.execute({
            email: loginDto.email,
            password: loginDto.password,
        });
    }

    @Post('mae/login')
    async loginMae(@Body() loginDto: LoginDto) {
        this.logger.log('========== INÍCIO LOGIN MÃE ==========');
        this.logger.log('Dados recebidos no endpoint auth/mae/login:');
        this.logger.log(`Email: ${loginDto.email}`);
        this.logger.log(`Password (masked): ${'*'.repeat(loginDto.password?.length || 0)}`);
        this.logger.log(`Body completo: ${JSON.stringify(loginDto, null, 2)}`);
        this.logger.log('======================================');

        const result = await this.loginMaeUseCase.execute({
            email: loginDto.email,
            password: loginDto.password,
        });

        this.logger.log('Login mãe executado com sucesso');
        this.logger.log(`Resultado do login: ${JSON.stringify({ access_token: result.access_token }, null, 2)}`);
        this.logger.log('========== FIM LOGIN MÃE ==========');

        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return await this.validateTokenUseCase.execute(req.user.id_profissional);
    }
}
