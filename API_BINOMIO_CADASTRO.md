# API Binomio Cadastro - Documentação

## Endpoint: POST /binomio/cadastro

Endpoint para cadastrar informações do binômio mãe-bebê.

### URL
```
POST http://localhost:3000/binomio/cadastro
```

### Headers
```
Content-Type: application/json
```

### Corpo da Requisição

Todos os campos são **opcionais**. Envie apenas os campos que você possui dados.

#### Campos e Valores Aceitos

##### PARTE I: DADOS SOCIODEMOGRÁFICOS E MATERNOS

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `idade_mae` | number | 0-99 | Idade da mãe em anos |
| `dt_nasc_mae` | string | "YYYY-MM-DD" | Data de nascimento da mãe |
| `etnia_mae` | string | "1", "2", "3", "4", "5" | 1=Branca, 2=Preta, 3=Amarela, 4=Parda, 5=Indígena |
| `est_civil` | string | "1", "2", "3", "4" | 1=Solteira, 2=Casada, 3=Viúva, 4=Separada/Divorciada |
| `escol_mae` | string | "0" a "14", "99" | Anos de escolaridade |
| `renda` | string | "1" a "6", "9" | Faixa de renda familiar |
| `cons_pn` | number | 0-99 | Quantidade de consultas pré-natal |

##### HÁBITOS E SAÚDE

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `tabagismo` | string | "1", "2" | 1=Sim, 2=Não |
| `tabagismo_freq` | number | - | Cigarros por dia |
| `consumo_beb_alcoolica` | string | "1", "2", "3", "4", "9" | Frequência de consumo |
| `beb_alcoolica_dias` | number | - | Dias por semana |
| `drogas` | string | "1", "2" | 1=Sim, 2=Não |
| `drogas_freq` | number | - | Dias por semana |
| `medicacao_continua` | string | "1", "2" | 1=Sim, 2=Não |
| `medicacao_cont_qual` | string | - | Descrição da medicação (máx 255 caracteres) |

##### SAÚDE MENTAL E FÍSICA

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `psico_mae` | string | "1,2,3..." | Múltipla escolha separada por vírgula (máx 50 caracteres) |
| `obesid_mae` | string | "1", "2" | 1=Sim, 2=Não |
| `desnutri_mae` | string | "1", "2" | 1=Sim, 2=Não |

##### ANTECEDENTES CLÍNICOS

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `dm_previa` | string | "1", "2" | Diabetes prévia: 1=Sim, 2=Não |
| `dm_gest` | string | "1", "2" | Diabetes gestacional: 1=Sim, 2=Não |
| `has_previa` | string | "1", "2" | Hipertensão prévia: 1=Sim, 2=Não |
| `has_gestacional` | string | "1", "2" | Hipertensão gestacional: 1=Sim, 2=Não |
| `bariatrica` | string | "1", "2" | Cirurgia bariátrica: 1=Sim, 2=Não |
| `dist_tireoide` | string | "1", "2", "3" | 1=Hipo, 2=Hiper, 3=Não |
| `cirurgia_mam` | string | "1", "2" | Cirurgia mamária: 1=Sim, 2=Não |
| `cirurgia_mam_qual` | string | - | Qual cirurgia (máx 50 caracteres) |
| `cancer_mama` | string | "1", "2" | 1=Sim, 2=Não |

##### HISTÓRICO OBSTÉTRICO E APOIO

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `paridade` | string | "1", "2" | 1=Primípara, 2=Multípara |
| `amam_ant` | string | "1", "2" | Amamentou filhos anteriores: 1=Sim, 2=Não |
| `apoio` | string | - | Rede de apoio, múltipla escolha (máx 50 caracteres) |
| `curso_amament` | string | - | Cursos/Orientações (máx 50 caracteres) |
| `propaganda_formula` | string | "1", "2" | Recebeu propaganda: 1=Sim, 2=Não |
| `concep` | string | "1", "2" | 1=Natural, 2=Reprodução assistida |

##### DADOS DO PARTO E DO BEBÊ

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `dt_parto` | string | "YYYY-MM-DD" | Data do parto |
| `loc_parto` | string | "1", "2", "3" | 1=Hospital, 2=Casa, 3=Outro |
| `ihac` | string | "1", "2" | Hospital Amigo da Criança: 1=Sim, 2=Não |
| `tp_parto` | string | "1", "2", "3", "4" | 1=Normal, 2=Fórceps, 3=Cesárea Eletiva, 4=Cesárea Urgência |
| `sexo` | string | "1", "2" | 1=Masculino, 2=Feminino |
| `id_gest_sem` | number | - | Idade gestacional em semanas |
| `id_gest_dias` | number | - | Idade gestacional em dias |
| `peso_nasc` | number | 0-9999 | Peso ao nascer em gramas |
| `apgar1` | number | 0-10 | APGAR 1º minuto |
| `apgar5` | number | 0-10 | APGAR 5º minuto |
| `aloj_conj` | string | "1", "2" | Alojamento conjunto: 1=Sim, 2=Não |
| `canguru` | string | "1", "2" | Posição canguru: 1=Sim, 2=Não |

##### ANATOMIA E AMAMENTAÇÃO INICIAL

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `formato_mamas` | string | "1", "2", "3", "4" | Formato das mamas |
| `formato_mamilo` | string | "1", "2", "3", "4" | Formato do mamilo |
| `prim_hora` | string | "1", "2" | Amamentou na 1ª hora: 1=Sim, 2=Não |
| `amament_24h_cadastro` | string | "1", "2" | Mamou nas últimas 24h: 1=Sim, 2=Não |
| `outr_liq_24h_cadastro` | string | "1", "2" | Outros líquidos: 1=Sim, 2=Não |

##### DISPOSITIVOS E DIFICULDADES

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `disposit_cadastro` | string | - | Dispositivos usados (máx 50 caracteres) |
| `mamadeira_cadastro` | string | "1", "2" | Usou mamadeira: 1=Sim, 2=Não |
| `dificuldade_cadastro` | string | - | Dificuldades (máx 100 caracteres) |
| `chupeta_cadastro` | string | "1", "2" | Usa chupeta: 1=Sim, 2=Não |

##### ESCALAS E AVALIAÇÕES CLÍNICAS

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `auto_efic_inicial` | number | 14-70 | Escala BSES |
| `anquiloglossia` | string | "1", "2" | Frênulo lingual: 1=Sim, 2=Não |
| `icter_neo` | string | "1", "2" | Icterícia: 1=Sim, 2=Não |
| `fototerapia` | string | "1", "2" | Fez fototerapia: 1=Sim, 2=Não |
| `fototerapia_dias` | number | - | Dias de fototerapia |

##### RETORNO AO TRABALHO

| Campo | Tipo | Valores Aceitos | Descrição |
|-------|------|-----------------|-----------|
| `ocup_mae` | string | "1", "2", "3", "4" | Situação de emprego |
| `retorno_trab` | string | "1", "2" | Pretende voltar: 1=Sim, 2=Não |
| `tempo_retorno` | number | - | Tempo em meses |
| `banco_leite_recebeu` | string | "1", "2" | 1=Sim, 2=Não |
| `banco_leite_doou` | string | "1", "2" | 1=Sim, 2=Não |
| `amament_contin` | string | "1", "2" | Ainda amamenta: 1=Sim, 2=Não |
| `amam_intencao_cont` | string | "1", "2" | Pretende conciliar: 1=Sim, 2=Não |
| `ordenha` | string | "1", "2" | Recebeu orientação: 1=Sim, 2=Não |
| `armazen_leite_mat` | string | "1", "2" | 1=Sim, 2=Não |
| `aquecim_leite_mat` | string | "1", "2" | 1=Sim, 2=Não |

### Exemplo de Requisição

```json
{
  "idade_mae": 28,
  "dt_nasc_mae": "1996-01-15",
  "etnia_mae": "4",
  "est_civil": "2",
  "escol_mae": "12",
  "renda": "3",
  "cons_pn": 8,
  "tabagismo": "2",
  "consumo_beb_alcoolica": "1",
  "drogas": "2",
  "medicacao_continua": "1",
  "medicacao_cont_qual": "Vitamina D",
  "psico_mae": "1",
  "obesid_mae": "2",
  "desnutri_mae": "2",
  "dm_previa": "2",
  "dm_gest": "2",
  "has_previa": "2",
  "has_gestacional": "2",
  "bariatrica": "2",
  "dist_tireoide": "3",
  "cirurgia_mam": "2",
  "cancer_mama": "2",
  "paridade": "1",
  "amam_ant": "2",
  "apoio": "1,2",
  "curso_amament": "1",
  "propaganda_formula": "2",
  "concep": "1",
  "dt_parto": "2024-10-15",
  "loc_parto": "1",
  "ihac": "1",
  "tp_parto": "1",
  "sexo": "2",
  "id_gest_sem": 39,
  "id_gest_dias": 3,
  "peso_nasc": 3200,
  "apgar1": 9,
  "apgar5": 10,
  "aloj_conj": "1",
  "canguru": "1",
  "formato_mamas": "1",
  "formato_mamilo": "1",
  "prim_hora": "1",
  "amament_24h_cadastro": "1",
  "outr_liq_24h_cadastro": "2",
  "disposit_cadastro": "1",
  "mamadeira_cadastro": "2",
  "dificuldade_cadastro": "0",
  "chupeta_cadastro": "2",
  "auto_efic_inicial": 65,
  "anquiloglossia": "2",
  "icter_neo": "1",
  "fototerapia": "1",
  "fototerapia_dias": 2,
  "ocup_mae": "1",
  "retorno_trab": "1",
  "tempo_retorno": 4,
  "banco_leite_recebeu": "2",
  "banco_leite_doou": "2"
}
```

### Resposta de Sucesso (201 Created)

```json
{
  "id_binomio": 1,
  "idade_mae": 28,
  "dt_nasc_mae": "1996-01-15",
  "etnia_mae": "4",
  ...
  "data_registro": "2026-01-21T18:00:00.000Z"
}
```

### Erros Comuns

#### 400 Bad Request - Validação
```json
{
  "statusCode": 400,
  "message": ["idade_mae must be an integer number"],
  "error": "Bad Request"
}
```

#### 500 Internal Server Error - Dados muito longos
```json
{
  "statusCode": 500,
  "message": "Data too long for column 'etnia_mae' at row 1"
}
```

**Solução**: Certifique-se de enviar os **códigos** (ex: "1", "2", "3") e não os valores descritivos (ex: "branca", "preta").

## Outros Endpoints

### GET /binomio
Lista todos os cadastros

### GET /binomio/:id
Busca um cadastro específico por ID

## Notas Importantes

⚠️ **ATENÇÃO**: Os campos categóricos devem ser enviados como **strings com códigos numéricos** ("1", "2", etc.), não como texto descritivo.

✅ **Correto**: `"etnia_mae": "4"` (código para Parda)  
❌ **Errado**: `"etnia_mae": "parda"` (texto descritivo)

✅ **Correto**: `"sexo": "2"` (código para Feminino)  
❌ **Errado**: `"sexo": "feminino"` (texto descritivo)
