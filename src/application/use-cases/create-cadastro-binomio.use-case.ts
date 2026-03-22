import { Injectable, Inject } from "@nestjs/common";
import type { ICadastroBinomioRepository } from "../../domain/repositories/cadastro-binomio.repository.interface";
import type { IUserMaeRepository } from "../../domain/repositories/user-mae.repository.interface";
import { CadastroBinomio } from "../../domain/entities/cadastro-binomio.entity";
import { UserMae } from "../../domain/entities/user-mae.entity";
import { EmailGeneratorService } from "../services/email-generator.service";
import { PasswordGeneratorService } from "../services/password-generator.service";

export interface CadastroWithUserResponse {
    cadastro: CadastroBinomio;
    userCredentials: {
        email: string;
        password: string;
        id_user_mae: number;
    };
}

@Injectable()
export class CreateCadastroBinomioUseCase {
    constructor(
        @Inject('ICadastroBinomioRepository')
        private readonly cadastroBinomioRepository: ICadastroBinomioRepository,
        @Inject('IUserMaeRepository')
        private readonly userMaeRepository: IUserMaeRepository,
        private readonly emailGenerator: EmailGeneratorService,
        private readonly passwordGenerator: PasswordGeneratorService,
    ) { }

    async execute(dataCadastro: CadastroBinomio): Promise<CadastroWithUserResponse> {
        // 1. Create cadastro binomio
        const cadastro: CadastroBinomio = {
            id_binomio: dataCadastro.id_binomio,
            idade_mae: dataCadastro.idade_mae,
            dt_nasc_mae: dataCadastro.dt_nasc_mae,
            etnia_mae: dataCadastro.etnia_mae,
            est_civil: dataCadastro.est_civil,
            escol_mae: dataCadastro.escol_mae,
            renda: dataCadastro.renda,
            cons_pn: dataCadastro.cons_pn,
            tabagismo: dataCadastro.tabagismo,
            tabagismo_freq: dataCadastro.tabagismo_freq,
            consumo_beb_alcoolica: dataCadastro.consumo_beb_alcoolica,
            beb_alcoolica_dias: dataCadastro.beb_alcoolica_dias,
            drogas: dataCadastro.drogas,
            drogas_freq: dataCadastro.drogas_freq,
            medicacao_continua: dataCadastro.medicacao_continua,
            medicacao_cont_qual: dataCadastro.medicacao_cont_qual,
            psico_mae: dataCadastro.psico_mae,
            obesid_mae: dataCadastro.obesid_mae,
            desnutri_mae: dataCadastro.desnutri_mae,
            dm_previa: dataCadastro.dm_previa,
            dm_gest: dataCadastro.dm_gest,
            has_previa: dataCadastro.has_previa,
            has_gestacional: dataCadastro.has_gestacional,
            bariatrica: dataCadastro.bariatrica,
            dist_tireoide: dataCadastro.dist_tireoide,
            cirurgia_mam: dataCadastro.cirurgia_mam,
            cirurgia_mam_qual: dataCadastro.cirurgia_mam_qual,
            cancer_mama: dataCadastro.cancer_mama,
            paridade: dataCadastro.paridade,
            amam_ant: dataCadastro.amam_ant,
            apoio: dataCadastro.apoio,
            curso_amament: dataCadastro.curso_amament,
            propaganda_formula: dataCadastro.propaganda_formula,
            concep: dataCadastro.concep,
            dt_parto: dataCadastro.dt_parto,
            loc_parto: dataCadastro.loc_parto,
            ihac: dataCadastro.ihac,
            tp_parto: dataCadastro.tp_parto,
            sexo: dataCadastro.sexo,
            id_gest_sem: dataCadastro.id_gest_sem,
            id_gest_dias: dataCadastro.id_gest_dias,
            peso_nasc: dataCadastro.peso_nasc,
            apgar1: dataCadastro.apgar1,
            apgar5: dataCadastro.apgar5,
            aloj_conj: dataCadastro.aloj_conj,
            canguru: dataCadastro.canguru,
            formato_mamas: dataCadastro.formato_mamas,
            formato_mamilo: dataCadastro.formato_mamilo,
            prim_hora: dataCadastro.prim_hora,
            amament_24h_cadastro: dataCadastro.amament_24h_cadastro,
            outr_liq_24h_cadastro: dataCadastro.outr_liq_24h_cadastro,
            disposit_cadastro: dataCadastro.disposit_cadastro,
            mamadeira_cadastro: dataCadastro.mamadeira_cadastro,
            dificuldade_cadastro: dataCadastro.dificuldade_cadastro,
            chupeta_cadastro: dataCadastro.chupeta_cadastro,
            auto_efic_inicial: dataCadastro.auto_efic_inicial,
            anquiloglossia: dataCadastro.anquiloglossia,
            icter_neo: dataCadastro.icter_neo,
            fototerapia: dataCadastro.fototerapia,
            fototerapia_dias: dataCadastro.fototerapia_dias,
            ocup_mae: dataCadastro.ocup_mae,
            retorno_trab: dataCadastro.retorno_trab,
            tempo_retorno: dataCadastro.tempo_retorno,
            banco_leite_recebeu: dataCadastro.banco_leite_recebeu,
            banco_leite_doou: dataCadastro.banco_leite_doou,
            amament_contin: dataCadastro.amament_contin,
            amam_intencao_cont: dataCadastro.amam_intencao_cont,
            ordenha: dataCadastro.ordenha,
            armazen_leite_mat: dataCadastro.armazen_leite_mat,
            aquecim_leite_mat: dataCadastro.aquecim_leite_mat,
            data_registro: new Date()
        };

        const savedCadastro = await this.cadastroBinomioRepository.create(cadastro);

        // 2. Generate email and password
        const email = this.emailGenerator.generate(savedCadastro.id_binomio);
        const plainPassword = this.passwordGenerator.generate();
        const hashedPassword = await this.passwordGenerator.hash(plainPassword);

        // 3. Create user mae
        const userMae: Partial<UserMae> = {
            id_binomio: savedCadastro.id_binomio,
            email,
            password_hash: hashedPassword,
            ativo: true,
            data_cadastro: new Date(),
        };

        const savedUserMae = await this.userMaeRepository.create(userMae as UserMae);

        // 4. Return cadastro and credentials
        return {
            cadastro: savedCadastro,
            userCredentials: {
                email: savedUserMae.email,
                password: plainPassword, // Return plain password only once
                id_user_mae: savedUserMae.id_user_mae,
            },
        };
    }

    async findAll(): Promise<CadastroBinomio[]> {
        return this.cadastroBinomioRepository.findAll();
    }

    async findById(id: number): Promise<CadastroBinomio | null> {
        return this.cadastroBinomioRepository.findById(id);
    }
}
