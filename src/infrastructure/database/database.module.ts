import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProfissionalSchema } from "./typeorm/schemas/profissional.schema";
import { ProfissionalRepository } from "./repositories/profissional.repository";
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
                entities: [ProfissionalSchema],
                synchronize: false, // Desabilitado para usar tabela existente
                logging: true, // Mostra queries SQL no console
            }),
        }),
        TypeOrmModule.forFeature([ProfissionalSchema])
    ],
    providers: [
        {
            provide: 'IProfissionalRepository',
            useClass: ProfissionalRepository,
        },
    ],
    exports: ['IProfissionalRepository'],
})
export class DatabaseModule { }