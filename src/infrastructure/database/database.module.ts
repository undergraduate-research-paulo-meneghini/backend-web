import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProfissionalSchema } from "./typeorm/schemas/profissional.schema";
import { CadastroBinomioSchema } from "./typeorm/schemas/cadastro-binomio.schema";
import { UserMaeSchema } from "./typeorm/schemas/user-mae.schema";
import { ProfissionalRepository } from "./repositories/profissional.repository";
import { CadastroBinomioRepository } from "./repositories/cadastro-binomio.repository";
import { UserMaeRepository } from "./repositories/user-mae.repository";
import databaseConfig from "../config/database.config";

@Module({
    imports: [
        ConfigModule.forFeature(databaseConfig),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('database.host'),
                port: config.get('database.port'),
                username: config.get('database.username'),
                password: config.get('database.password'),
                database: config.get('database.database'),
                entities: [ProfissionalSchema, CadastroBinomioSchema, UserMaeSchema],
                synchronize: false, // Desabilitado para usar tabela existente
                logging: true, // Mostra queries SQL no console
            }),
        }),
        TypeOrmModule.forFeature([ProfissionalSchema, CadastroBinomioSchema, UserMaeSchema])
    ],
    providers: [
        {
            provide: 'IProfissionalRepository',
            useClass: ProfissionalRepository,
        },
        {
            provide: 'ICadastroBinomioRepository',
            useClass: CadastroBinomioRepository,
        },
        {
            provide: 'IUserMaeRepository',
            useClass: UserMaeRepository,
        },
    ],
    exports: ['IProfissionalRepository', 'ICadastroBinomioRepository', 'IUserMaeRepository'],
})
export class DatabaseModule { }