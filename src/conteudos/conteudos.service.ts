import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConteudoDto } from './dto/create-conteudo.dto';
import { UpdateConteudoDto } from './dto/update-conteudo.dto';
import { Conteudo } from './entities/conteudo.entity';

@Injectable()
export class ConteudosService {
  constructor(
    @InjectRepository(Conteudo)
    private readonly conteudoRepository: Repository<Conteudo>,
  ) {}

  async create(createConteudoDto: CreateConteudoDto): Promise<Conteudo> {
    const conteudo = this.conteudoRepository.create(createConteudoDto);
    return await this.conteudoRepository.save(conteudo);
  }

  async findAll(): Promise<Conteudo[]> {
    return await this.conteudoRepository.find({
      order: {
        criadoEm: 'DESC',
      },
    });
  }

  async getAppFeed(): Promise<Conteudo[]> {
    return await this.conteudoRepository.find({
      where: {
        status: 'Publicado',
      },
      order: {
        criadoEm: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Conteudo> {
    const conteudo = await this.conteudoRepository.findOne({ where: { id } });
    if (!conteudo) {
      throw new NotFoundException(`Conteúdo com ID ${id} não encontrado`);
    }
    return conteudo;
  }

  async update(id: string, updateConteudoDto: UpdateConteudoDto): Promise<Conteudo> {
    const conteudo = await this.findOne(id);
    Object.assign(conteudo, updateConteudoDto);
    return await this.conteudoRepository.save(conteudo);
  }

  async remove(id: string): Promise<void> {
    const conteudo = await this.findOne(id);
    await this.conteudoRepository.remove(conteudo);
  }
}
