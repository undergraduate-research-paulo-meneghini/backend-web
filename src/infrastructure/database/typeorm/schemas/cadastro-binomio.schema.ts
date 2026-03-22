import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('tb_cadastro_binomio')
export class CadastroBinomioSchema {
    @PrimaryGeneratedColumn()
    id_binomio: number;

    // PARTE I: DADOS SOCIODEMOGRÁFICOS E MATERNOS
    @Column({ type: 'int', nullable: true })
    idade_mae: number;

    @Column({ type: 'date', nullable: true })
    dt_nasc_mae: Date;

    @Column({ type: 'char', length: 1, nullable: true })
    etnia_mae: string;

    @Column({ type: 'char', length: 1, nullable: true })
    est_civil: string;

    @Column({ type: 'varchar', length: 2, nullable: true })
    escol_mae: string;

    @Column({ type: 'char', length: 1, nullable: true })
    renda: string;

    @Column({ type: 'int', nullable: true })
    cons_pn: number;

    // HÁBITOS E SAÚDE
    @Column({ type: 'char', length: 1, nullable: true })
    tabagismo: string;

    @Column({ type: 'int', nullable: true })
    tabagismo_freq: number;

    @Column({ type: 'char', length: 1, nullable: true })
    consumo_beb_alcoolica: string;

    @Column({ type: 'int', nullable: true })
    beb_alcoolica_dias: number;

    @Column({ type: 'char', length: 1, nullable: true })
    drogas: string;

    @Column({ type: 'int', nullable: true })
    drogas_freq: number;

    @Column({ type: 'char', length: 1, nullable: true })
    medicacao_continua: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    medicacao_cont_qual: string;

    // SAÚDE MENTAL E FÍSICA
    @Column({ type: 'varchar', length: 50, nullable: true })
    psico_mae: string;

    @Column({ type: 'char', length: 1, nullable: true })
    obesid_mae: string;

    @Column({ type: 'char', length: 1, nullable: true })
    desnutri_mae: string;

    // ANTECEDENTES CLÍNICOS
    @Column({ type: 'char', length: 1, nullable: true })
    dm_previa: string;

    @Column({ type: 'char', length: 1, nullable: true })
    dm_gest: string;

    @Column({ type: 'char', length: 1, nullable: true })
    has_previa: string;

    @Column({ type: 'char', length: 1, nullable: true })
    has_gestacional: string;

    @Column({ type: 'char', length: 1, nullable: true })
    bariatrica: string;

    @Column({ type: 'char', length: 1, nullable: true })
    dist_tireoide: string;

    @Column({ type: 'char', length: 1, nullable: true })
    cirurgia_mam: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    cirurgia_mam_qual: string;

    @Column({ type: 'char', length: 1, nullable: true })
    cancer_mama: string;

    // HISTÓRICO OBSTÉTRICO E APOIO
    @Column({ type: 'char', length: 1, nullable: true })
    paridade: string;

    @Column({ type: 'char', length: 1, nullable: true })
    amam_ant: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    apoio: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    curso_amament: string;

    @Column({ type: 'char', length: 1, nullable: true })
    propaganda_formula: string;

    @Column({ type: 'char', length: 1, nullable: true })
    concep: string;

    // DADOS DO PARTO E DO BEBÊ
    @Column({ type: 'date', nullable: true })
    dt_parto: Date;

    @Column({ type: 'char', length: 1, nullable: true })
    loc_parto: string;

    @Column({ type: 'char', length: 1, nullable: true })
    ihac: string;

    @Column({ type: 'char', length: 1, nullable: true })
    tp_parto: string;

    @Column({ type: 'char', length: 1, nullable: true })
    sexo: string;

    @Column({ type: 'int', nullable: true })
    id_gest_sem: number;

    @Column({ type: 'int', nullable: true })
    id_gest_dias: number;

    @Column({ type: 'int', nullable: true })
    peso_nasc: number;

    @Column({ type: 'int', nullable: true })
    apgar1: number;

    @Column({ type: 'int', nullable: true })
    apgar5: number;

    @Column({ type: 'char', length: 1, nullable: true })
    aloj_conj: string;

    @Column({ type: 'char', length: 1, nullable: true })
    canguru: string;

    // ANATOMIA E AMAMENTAÇÃO INICIAL
    @Column({ type: 'char', length: 1, nullable: true })
    formato_mamas: string;

    @Column({ type: 'char', length: 1, nullable: true })
    formato_mamilo: string;

    @Column({ type: 'char', length: 1, nullable: true })
    prim_hora: string;

    @Column({ type: 'char', length: 1, nullable: true })
    amament_24h_cadastro: string;

    @Column({ type: 'char', length: 1, nullable: true })
    outr_liq_24h_cadastro: string;

    // DISPOSITIVOS E DIFICULDADES (BASELINE)
    @Column({ type: 'varchar', length: 50, nullable: true })
    disposit_cadastro: string;

    @Column({ type: 'char', length: 1, nullable: true })
    mamadeira_cadastro: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    dificuldade_cadastro: string;

    @Column({ type: 'char', length: 1, nullable: true })
    chupeta_cadastro: string;

    // ESCALAS E AVALIAÇÕES CLÍNICAS
    @Column({ type: 'int', nullable: true })
    auto_efic_inicial: number;

    @Column({ type: 'char', length: 1, nullable: true })
    anquiloglossia: string;

    @Column({ type: 'char', length: 1, nullable: true })
    icter_neo: string;

    @Column({ type: 'char', length: 1, nullable: true })
    fototerapia: string;

    @Column({ type: 'int', nullable: true })
    fototerapia_dias: number;

    // PARTE III: RETORNO AO TRABALHO
    @Column({ type: 'char', length: 1, nullable: true })
    ocup_mae: string;

    @Column({ type: 'char', length: 1, nullable: true })
    retorno_trab: string;

    @Column({ type: 'int', nullable: true })
    tempo_retorno: number;

    @Column({ type: 'char', length: 1, nullable: true })
    banco_leite_recebeu: string;

    @Column({ type: 'char', length: 1, nullable: true })
    banco_leite_doou: string;

    // Variáveis preenchidas no momento do retorno
    @Column({ type: 'char', length: 1, nullable: true })
    amament_contin: string;

    @Column({ type: 'char', length: 1, nullable: true })
    amam_intencao_cont: string;

    @Column({ type: 'char', length: 1, nullable: true })
    ordenha: string;

    @Column({ type: 'char', length: 1, nullable: true })
    armazen_leite_mat: string;

    @Column({ type: 'char', length: 1, nullable: true })
    aquecim_leite_mat: string;

    @CreateDateColumn()
    data_registro: Date;
}
