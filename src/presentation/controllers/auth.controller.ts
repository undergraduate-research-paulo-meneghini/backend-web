import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { ValidateTokenUseCase } from '../../application/use-cases/validate-token.use-case';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly validateTokenUseCase: ValidateTokenUseCase,
    ) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.loginUseCase.execute(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return await this.validateTokenUseCase.execute(req.user.id_profissional);
    }
}
