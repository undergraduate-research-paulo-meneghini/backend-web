import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CadastroBinomioSchema } from '../typeorm/schemas/cadastro-binomio.schema';
import { CadastroBinomio } from '../../../domain/entities/cadastro-binomio.entity';
import { ICadastroBinomioRepository } from '../../../domain/repositories/cadastro-binomio.repository.interface';

@Injectable()
export class CadastroBinomioRepository implements ICadastroBinomioRepository {
    constructor(
        @InjectRepository(CadastroBinomioSchema)
        private readonly repository: Repository<CadastroBinomioSchema>,
    ) { }

    async findById(id: number): Promise<CadastroBinomio | null> {
        const cadastro = await this.repository.findOne({
            where: { id_binomio: id },
        });
        return cadastro ? this.toDomain(cadastro) : null;
    }

    async findAll(): Promise<CadastroBinomio[]> {
        const cadastros = await this.repository.find();
        return cadastros.map(c => this.toDomain(c));
    }

    async create(cadastro: CadastroBinomio): Promise<CadastroBinomio> {
        const schema = this.toSchema(cadastro);
        const saved = await this.repository.save(schema);
        return this.toDomain(saved);
    }

    private toDomain(schema: CadastroBinomioSchema): CadastroBinomio {
        const cadastro = new CadastroBinomio();
        cadastro.id_binomio = schema.id_binomio;
        cadastro.idade_mae = schema.idade_mae;
        cadastro.dt_nasc_mae = schema.dt_nasc_mae;
        cadastro.etnia_mae = schema.etnia_mae;
        cadastro.est_civil = schema.est_civil;
        cadastro.escol_mae = schema.escol_mae;
        cadastro.renda = schema.renda;
        cadastro.cons_pn = schema.cons_pn;
        cadastro.tabagismo = schema.tabagismo;
        cadastro.tabagismo_freq = schema.tabagismo_freq;
        cadastro.consumo_beb_alcoolica = schema.consumo_beb_alcoolica;
        cadastro.beb_alcoolica_dias = schema.beb_alcoolica_dias;
        cadastro.drogas = schema.drogas;
        cadastro.drogas_freq = schema.drogas_freq;
        cadastro.medicacao_continua = schema.medicacao_continua;
        cadastro.medicacao_cont_qual = schema.medicacao_cont_qual;
        cadastro.psico_mae = schema.psico_mae;
        cadastro.obesid_mae = schema.obesid_mae;
        cadastro.desnutri_mae = schema.desnutri_mae;
        cadastro.dm_previa = schema.dm_previa;
        cadastro.dm_gest = schema.dm_gest;
        cadastro.has_previa = schema.has_previa;
        cadastro.has_gestacional = schema.has_gestacional;
        cadastro.bariatrica = schema.bariatrica;
        cadastro.dist_tireoide = schema.dist_tireoide;
        cadastro.cirurgia_mam = schema.cirurgia_mam;
        cadastro.cirurgia_mam_qual = schema.cirurgia_mam_qual;
        cadastro.cancer_mama = schema.cancer_mama;
        cadastro.paridade = schema.paridade;
        cadastro.amam_ant = schema.amam_ant;
        cadastro.apoio = schema.apoio;
        cadastro.curso_amament = schema.curso_amament;
        cadastro.propaganda_formula = schema.propaganda_formula;
        cadastro.concep = schema.concep;
        cadastro.dt_parto = schema.dt_parto;
        cadastro.loc_parto = schema.loc_parto;
        cadastro.ihac = schema.ihac;
        cadastro.tp_parto = schema.tp_parto;
        cadastro.sexo = schema.sexo;
        cadastro.id_gest_sem = schema.id_gest_sem;
        cadastro.id_gest_dias = schema.id_gest_dias;
        cadastro.peso_nasc = schema.peso_nasc;
        cadastro.apgar1 = schema.apgar1;
        cadastro.apgar5 = schema.apgar5;
        cadastro.aloj_conj = schema.aloj_conj;
        cadastro.canguru = schema.canguru;
        cadastro.formato_mamas = schema.formato_mamas;
        cadastro.formato_mamilo = schema.formato_mamilo;
        cadastro.prim_hora = schema.prim_hora;
        cadastro.amament_24h_cadastro = schema.amament_24h_cadastro;
        cadastro.outr_liq_24h_cadastro = schema.outr_liq_24h_cadastro;
        cadastro.disposit_cadastro = schema.disposit_cadastro;
        cadastro.mamadeira_cadastro = schema.mamadeira_cadastro;
        cadastro.dificuldade_cadastro = schema.dificuldade_cadastro;
        cadastro.chupeta_cadastro = schema.chupeta_cadastro;
        cadastro.auto_efic_inicial = schema.auto_efic_inicial;
        cadastro.anquiloglossia = schema.anquiloglossia;
        cadastro.icter_neo = schema.icter_neo;
        cadastro.fototerapia = schema.fototerapia;
        cadastro.fototerapia_dias = schema.fototerapia_dias;
        cadastro.ocup_mae = schema.ocup_mae;
        cadastro.retorno_trab = schema.retorno_trab;
        cadastro.tempo_retorno = schema.tempo_retorno;
        cadastro.banco_leite_recebeu = schema.banco_leite_recebeu;
        cadastro.banco_leite_doou = schema.banco_leite_doou;
        cadastro.amament_contin = schema.amament_contin;
        cadastro.amam_intencao_cont = schema.amam_intencao_cont;
        cadastro.ordenha = schema.ordenha;
        cadastro.armazen_leite_mat = schema.armazen_leite_mat;
        cadastro.aquecim_leite_mat = schema.aquecim_leite_mat;
        cadastro.data_registro = schema.data_registro;
        return cadastro;
    }

    private toSchema(cadastro: CadastroBinomio): Partial<CadastroBinomioSchema> {
        return {
            id_binomio: cadastro.id_binomio,
            idade_mae: cadastro.idade_mae,
            dt_nasc_mae: cadastro.dt_nasc_mae,
            etnia_mae: cadastro.etnia_mae,
            est_civil: cadastro.est_civil,
            escol_mae: cadastro.escol_mae,
            renda: cadastro.renda,
            cons_pn: cadastro.cons_pn,
            tabagismo: cadastro.tabagismo,
            tabagismo_freq: cadastro.tabagismo_freq,
            consumo_beb_alcoolica: cadastro.consumo_beb_alcoolica,
            beb_alcoolica_dias: cadastro.beb_alcoolica_dias,
            drogas: cadastro.drogas,
            drogas_freq: cadastro.drogas_freq,
            medicacao_continua: cadastro.medicacao_continua,
            medicacao_cont_qual: cadastro.medicacao_cont_qual,
            psico_mae: cadastro.psico_mae,
            obesid_mae: cadastro.obesid_mae,
            desnutri_mae: cadastro.desnutri_mae,
            dm_previa: cadastro.dm_previa,
            dm_gest: cadastro.dm_gest,
            has_previa: cadastro.has_previa,
            has_gestacional: cadastro.has_gestacional,
            bariatrica: cadastro.bariatrica,
            dist_tireoide: cadastro.dist_tireoide,
            cirurgia_mam: cadastro.cirurgia_mam,
            cirurgia_mam_qual: cadastro.cirurgia_mam_qual,
            cancer_mama: cadastro.cancer_mama,
            paridade: cadastro.paridade,
            amam_ant: cadastro.amam_ant,
            apoio: cadastro.apoio,
            curso_amament: cadastro.curso_amament,
            propaganda_formula: cadastro.propaganda_formula,
            concep: cadastro.concep,
            dt_parto: cadastro.dt_parto,
            loc_parto: cadastro.loc_parto,
            ihac: cadastro.ihac,
            tp_parto: cadastro.tp_parto,
            sexo: cadastro.sexo,
            id_gest_sem: cadastro.id_gest_sem,
            id_gest_dias: cadastro.id_gest_dias,
            peso_nasc: cadastro.peso_nasc,
            apgar1: cadastro.apgar1,
            apgar5: cadastro.apgar5,
            aloj_conj: cadastro.aloj_conj,
            canguru: cadastro.canguru,
            formato_mamas: cadastro.formato_mamas,
            formato_mamilo: cadastro.formato_mamilo,
            prim_hora: cadastro.prim_hora,
            amament_24h_cadastro: cadastro.amament_24h_cadastro,
            outr_liq_24h_cadastro: cadastro.outr_liq_24h_cadastro,
            disposit_cadastro: cadastro.disposit_cadastro,
            mamadeira_cadastro: cadastro.mamadeira_cadastro,
            dificuldade_cadastro: cadastro.dificuldade_cadastro,
            chupeta_cadastro: cadastro.chupeta_cadastro,
            auto_efic_inicial: cadastro.auto_efic_inicial,
            anquiloglossia: cadastro.anquiloglossia,
            icter_neo: cadastro.icter_neo,
            fototerapia: cadastro.fototerapia,
            fototerapia_dias: cadastro.fototerapia_dias,
            ocup_mae: cadastro.ocup_mae,
            retorno_trab: cadastro.retorno_trab,
            tempo_retorno: cadastro.tempo_retorno,
            banco_leite_recebeu: cadastro.banco_leite_recebeu,
            banco_leite_doou: cadastro.banco_leite_doou,
            amament_contin: cadastro.amament_contin,
            amam_intencao_cont: cadastro.amam_intencao_cont,
            ordenha: cadastro.ordenha,
            armazen_leite_mat: cadastro.armazen_leite_mat,
            aquecim_leite_mat: cadastro.aquecim_leite_mat,
            data_registro: cadastro.data_registro,
        };
    }
}
