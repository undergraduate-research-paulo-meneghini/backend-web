import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { CreateCadastroBinomioUseCase } from "../../application/use-cases/create-cadastro-binomio.use-case";
import { CreateCadastroBinomioDto } from "../dtos/create-cadastro-binomio.dto";

@Controller('binomio')
export class CadastroBinomioController {
    private readonly logger = new Logger(CadastroBinomioController.name);

    constructor(
        private readonly createCadastroBinomioUseCase: CreateCadastroBinomioUseCase
    ) { }

    @Post('cadastro')
    async create(@Body() dataCadastro: CreateCadastroBinomioDto): Promise<any> {
        try {
            this.logger.log('Received cadastro data:', JSON.stringify(dataCadastro));
            const result = await this.createCadastroBinomioUseCase.execute(dataCadastro as any);
            this.logger.log('Cadastro created successfully with id:', result.cadastro.id_binomio);
            this.logger.log('User credentials generated:', { email: result.userCredentials.email, id_user_mae: result.userCredentials.id_user_mae });
            return result;
        } catch (error) {
            this.logger.error('Error creating cadastro:', error);
            throw new HttpException(
                error.message || 'Error creating cadastro',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get()
    async findAll(): Promise<any> {
        return this.createCadastroBinomioUseCase.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<any> {
        return this.createCadastroBinomioUseCase.findById(id);
    }
}
