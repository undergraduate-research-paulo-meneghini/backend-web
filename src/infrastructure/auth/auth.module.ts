import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import jwtConfig from '../config/jwt.config';
import { ProfissionalSchema } from '../database/typeorm/schemas/profissional.schema';
import { AuthRepository } from './repositories/auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { ValidateTokenUseCase } from '../../application/use-cases/validate-token.use-case';
import { AuthController } from '../../presentation/controllers/auth.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [
        ConfigModule.forFeature(jwtConfig),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret') || 'default-secret-key',
                signOptions: { expiresIn: '1d' },
            }),
        }),
        TypeOrmModule.forFeature([ProfissionalSchema]),
        DatabaseModule,
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: 'IAuthRepository',
            useClass: AuthRepository,
        },
        JwtStrategy,
        LoginUseCase,
        ValidateTokenUseCase,
    ],
    exports: [JwtModule, JwtStrategy],
})
export class AuthModule { }
