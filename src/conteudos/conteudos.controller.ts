import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConteudosService } from './conteudos.service';
import { CreateConteudoDto } from './dto/create-conteudo.dto';
import { UpdateConteudoDto } from './dto/update-conteudo.dto';

@Controller('conteudos')
export class ConteudosController {
  constructor(private readonly conteudosService: ConteudosService) {}

  @Post()
  create(@Body() createConteudoDto: CreateConteudoDto) {
    return this.conteudosService.create(createConteudoDto);
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
    return this.conteudosService.update(id, updateConteudoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conteudosService.remove(id);
  }
}
