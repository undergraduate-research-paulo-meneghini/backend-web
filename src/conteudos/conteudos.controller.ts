import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ConteudosService } from './conteudos.service';
import { CreateConteudoDto } from './dto/create-conteudo.dto';
import { UpdateConteudoDto } from './dto/update-conteudo.dto';
import { JwtAuthGuard } from '../infrastructure/auth/guards/jwt-auth.guard';

@Controller('conteudos')
export class ConteudosController {
  constructor(private readonly conteudosService: ConteudosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createConteudoDto: CreateConteudoDto) {
    console.log('--- CREATE CONTEUDO ---');
    console.log('Req User:', req.user);
    
    // Popula o autor com os dados do usuário logado no token JWT
    createConteudoDto.autorId = String(req.user.id_profissional);
    createConteudoDto.autorEmail = req.user.email;

    console.log('DTO após popular autor:', createConteudoDto);

    return this.conteudosService.create(createConteudoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('app/feed')
  getAppFeed() {
    return this.conteudosService.getAppFeed();
  }

  @Get()
  findAll() {
    return this.conteudosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conteudosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConteudoDto: UpdateConteudoDto) {
    console.log(`--- UPDATE CONTEUDO ${id} ---`);
    console.log('Update Payload recebido:', updateConteudoDto);
    return this.conteudosService.update(id, updateConteudoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conteudosService.remove(id);
  }
}
