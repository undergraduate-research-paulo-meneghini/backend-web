import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { CreateProfissionalUseCase } from './application/use-cases/create-profissional.use-case';
import { CreateCadastroBinomioUseCase } from './application/use-cases/create-cadastro-binomio.use-case';
import { EmailGeneratorService } from './application/services/email-generator.service';
import { PasswordGeneratorService } from './application/services/password-generator.service';
import { ProfissionalController } from './presentation/controllers/profissional.controller';
import { CadastroBinomioController } from './presentation/controllers/cadastro-binomio.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController, ProfissionalController, CadastroBinomioController],
  providers: [
    AppService,
    CreateProfissionalUseCase,
    CreateCadastroBinomioUseCase,
    EmailGeneratorService,
    PasswordGeneratorService,
  ],
})
export class AppModule { }


