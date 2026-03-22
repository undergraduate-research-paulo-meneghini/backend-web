import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { CreateProfissionalUseCase } from "../../application/use-cases/create-profissional.use-case";

@Controller('profissional')
export class ProfissionalController {
    constructor(
        private readonly createProfissionalUseCase: CreateProfissionalUseCase
    ) { }

    @Post()
    async create(@Body() dataProfissional: any): Promise<any> {
        return this.createProfissionalUseCase.execute(dataProfissional);
    }

    @Get()
    async findAll(): Promise<any> {
        return this.createProfissionalUseCase.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<any> {
        return this.createProfissionalUseCase.findById(id);
    }
}
