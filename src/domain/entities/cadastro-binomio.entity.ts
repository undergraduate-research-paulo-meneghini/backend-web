export class CadastroBinomio {
    id_binomio: number;

    // PARTE I: DADOS SOCIODEMOGRÁFICOS E MATERNOS
    idade_mae: number;
    dt_nasc_mae: Date;
    etnia_mae: string;
    est_civil: string;
    escol_mae: string;
    renda: string;
    cons_pn: number;

    // HÁBITOS E SAÚDE
    tabagismo: string;
    tabagismo_freq: number;
    consumo_beb_alcoolica: string;
    beb_alcoolica_dias: number;
    drogas: string;
    drogas_freq: number;
    medicacao_continua: string;
    medicacao_cont_qual: string;

    // SAÚDE MENTAL E FÍSICA
    psico_mae: string;
    obesid_mae: string;
    desnutri_mae: string;

    // ANTECEDENTES CLÍNICOS
    dm_previa: string;
    dm_gest: string;
    has_previa: string;
    has_gestacional: string;
    bariatrica: string;
    dist_tireoide: string;
    cirurgia_mam: string;
    cirurgia_mam_qual: string;
    cancer_mama: string;

    // HISTÓRICO OBSTÉTRICO E APOIO
    paridade: string;
    amam_ant: string;
    apoio: string;
    curso_amament: string;
    propaganda_formula: string;
    concep: string;

    // DADOS DO PARTO E DO BEBÊ
    dt_parto: Date;
    loc_parto: string;
    ihac: string;
    tp_parto: string;
    sexo: string;
    id_gest_sem: number;
    id_gest_dias: number;
    peso_nasc: number;
    apgar1: number;
    apgar5: number;
    aloj_conj: string;
    canguru: string;

    // ANATOMIA E AMAMENTAÇÃO INICIAL
    formato_mamas: string;
    formato_mamilo: string;
    prim_hora: string;
    amament_24h_cadastro: string;
    outr_liq_24h_cadastro: string;

    // DISPOSITIVOS E DIFICULDADES (BASELINE)
    disposit_cadastro: string;
    mamadeira_cadastro: string;
    dificuldade_cadastro: string;
    chupeta_cadastro: string;

    // ESCALAS E AVALIAÇÕES CLÍNICAS
    auto_efic_inicial: number;
    anquiloglossia: string;
    icter_neo: string;
    fototerapia: string;
    fototerapia_dias: number;

    // PARTE III: RETORNO AO TRABALHO
    ocup_mae: string;
    retorno_trab: string;
    tempo_retorno: number;
    banco_leite_recebeu: string;
    banco_leite_doou: string;

    // Variáveis preenchidas no momento do retorno
    amament_contin: string;
    amam_intencao_cont: string;
    ordenha: string;
    armazen_leite_mat: string;
    aquecim_leite_mat: string;

    data_registro: Date;
}
