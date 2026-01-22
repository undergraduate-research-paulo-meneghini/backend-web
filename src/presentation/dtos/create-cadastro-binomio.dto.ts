import { IsOptional, IsInt, IsString, IsDateString, MaxLength, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCadastroBinomioDto {
    // PARTE I: DADOS SOCIODEMOGRÁFICOS E MATERNOS
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    idade_mae?: number;

    @IsOptional()
    @IsString()
    dt_nasc_mae?: string;

    @IsOptional()
    @IsString()
    etnia_mae?: string;

    @IsOptional()
    @IsString()
    est_civil?: string;

    @IsOptional()
    @IsString()
    escol_mae?: string;

    @IsOptional()
    @IsString()
    renda?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    cons_pn?: number;

    // HÁBITOS E SAÚDE
    @IsOptional()
    @IsString()
    tabagismo?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    tabagismo_freq?: number;

    @IsOptional()
    @IsString()
    consumo_beb_alcoolica?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    beb_alcoolica_dias?: number;

    @IsOptional()
    @IsString()
    drogas?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    drogas_freq?: number;

    @IsOptional()
    @IsString()
    medicacao_continua?: string;

    @IsOptional()
    @IsString()
    medicacao_cont_qual?: string;

    // SAÚDE MENTAL E FÍSICA
    @IsOptional()
    @IsString()
    psico_mae?: string;

    @IsOptional()
    @IsString()
    obesid_mae?: string;

    @IsOptional()
    @IsString()
    desnutri_mae?: string;

    // ANTECEDENTES CLÍNICOS
    @IsOptional()
    @IsString()
    dm_previa?: string;

    @IsOptional()
    @IsString()
    dm_gest?: string;

    @IsOptional()
    @IsString()
    has_previa?: string;

    @IsOptional()
    @IsString()
    has_gestacional?: string;

    @IsOptional()
    @IsString()
    bariatrica?: string;

    @IsOptional()
    @IsString()
    dist_tireoide?: string;

    @IsOptional()
    @IsString()
    cirurgia_mam?: string;

    @IsOptional()
    @IsString()
    cirurgia_mam_qual?: string;

    @IsOptional()
    @IsString()
    cancer_mama?: string;

    // HISTÓRICO OBSTÉTRICO E APOIO
    @IsOptional()
    @IsString()
    paridade?: string;

    @IsOptional()
    @IsString()
    amam_ant?: string;

    @IsOptional()
    @IsString()
    apoio?: string;

    @IsOptional()
    @IsString()
    curso_amament?: string;

    @IsOptional()
    @IsString()
    propaganda_formula?: string;

    @IsOptional()
    @IsString()
    concep?: string;

    // DADOS DO PARTO E DO BEBÊ
    @IsOptional()
    @IsString()
    dt_parto?: string;

    @IsOptional()
    @IsString()
    loc_parto?: string;

    @IsOptional()
    @IsString()
    ihac?: string;

    @IsOptional()
    @IsString()
    tp_parto?: string;

    @IsOptional()
    @IsString()
    sexo?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_gest_sem?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_gest_dias?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    peso_nasc?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    apgar1?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    apgar5?: number;

    @IsOptional()
    @IsString()
    aloj_conj?: string;

    @IsOptional()
    @IsString()
    canguru?: string;

    // ANATOMIA E AMAMENTAÇÃO INICIAL
    @IsOptional()
    @IsString()
    formato_mamas?: string;

    @IsOptional()
    @IsString()
    formato_mamilo?: string;

    @IsOptional()
    @IsString()
    prim_hora?: string;

    @IsOptional()
    @IsString()
    amament_24h_cadastro?: string;

    @IsOptional()
    @IsString()
    outr_liq_24h_cadastro?: string;

    // DISPOSITIVOS E DIFICULDADES (BASELINE)
    @IsOptional()
    @IsString()
    disposit_cadastro?: string;

    @IsOptional()
    @IsString()
    mamadeira_cadastro?: string;

    @IsOptional()
    @IsString()
    dificuldade_cadastro?: string;

    @IsOptional()
    @IsString()
    chupeta_cadastro?: string;

    // ESCALAS E AVALIAÇÕES CLÍNICAS
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    auto_efic_inicial?: number;

    @IsOptional()
    @IsString()
    anquiloglossia?: string;

    @IsOptional()
    @IsString()
    icter_neo?: string;

    @IsOptional()
    @IsString()
    fototerapia?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    fototerapia_dias?: number;

    // PARTE III: RETORNO AO TRABALHO
    @IsOptional()
    @IsString()
    ocup_mae?: string;

    @IsOptional()
    @IsString()
    retorno_trab?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    tempo_retorno?: number;

    @IsOptional()
    @IsString()
    banco_leite_recebeu?: string;

    @IsOptional()
    @IsString()
    banco_leite_doou?: string;

    // Variáveis preenchidas no momento do retorno
    @IsOptional()
    @IsString()
    amament_contin?: string;

    @IsOptional()
    @IsString()
    amam_intencao_cont?: string;

    @IsOptional()
    @IsString()
    ordenha?: string;

    @IsOptional()
    @IsString()
    armazen_leite_mat?: string;

    @IsOptional()
    @IsString()
    aquecim_leite_mat?: string;
}
