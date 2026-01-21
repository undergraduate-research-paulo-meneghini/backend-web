import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { CreateProfissionalUseCase } from './application/use-cases/create-profissional.use-case';
import { ProfissionalController } from './presentation/controllers/profissional.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController, ProfissionalController],
  providers: [
    AppService,
    CreateProfissionalUseCase
  ],
})
export class AppModule { }


