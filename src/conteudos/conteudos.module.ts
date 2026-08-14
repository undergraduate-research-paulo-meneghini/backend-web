import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConteudosService } from './conteudos.service';
import { ConteudosController } from './conteudos.controller';
import { Conteudo } from './entities/conteudo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conteudo])],
  controllers: [ConteudosController],
  providers: [ConteudosService],
})
export class ConteudosModule {}
