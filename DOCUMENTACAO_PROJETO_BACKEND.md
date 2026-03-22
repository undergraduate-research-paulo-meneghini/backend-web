# Documentação do Projeto Backend - Sistema de Amamentação

## Arquitetura do Projeto

O projeto usa uma arquitetura chamada **Clean Architecture** (Arquitetura Limpa), que organiza o código em camadas bem definidas. Imagine como um prédio com andares diferentes, cada um com sua função específica:

```mermaid
graph TB
    subgraph "Camada de Apresentação"
        A[Controllers<br/>Recebe requisições HTTP]
        B[DTOs<br/>Valida dados de entrada]
    end
    
    subgraph "Camada de Aplicação"
        C[Use Cases<br/>Regras de negócio]
        D[Services<br/>Serviços auxiliares]
    end
    
    subgraph "Camada de Domínio"
        E[Entities<br/>Modelos de dados]
        F[Repository Interfaces<br/>Contratos]
    end
    
    subgraph "Camada de Infraestrutura"
        G[Repositories<br/>Acesso ao banco]
        H[TypeORM Schemas<br/>Mapeamento de tabelas]
        I[Auth Module<br/>Autenticação JWT]
        J[Database Config<br/>Configuração do BD]
    end
    
    K[(MySQL Database<br/>Banco de Dados)]
    
    A --> C
    B --> A
    C --> D
    C --> F
    G --> F
    H --> G
    G --> K
    I --> K
    J --> K
```

### Estrutura de Pastas

```
backend-ic/
├── src/
│   ├── presentation/          # Interface com o mundo externo
│   │   ├── controllers/       # Recebe requisições HTTP
│   │   └── dtos/              # Valida dados de entrada
│   │
│   ├── application/           # Lógica de negócio
│   │   ├── use-cases/         # Casos de uso (ações do sistema)
│   │   └── services/          # Serviços auxiliares
│   │
│   ├── domain/                # Núcleo do sistema
│   │   ├── entities/          # Modelos de dados
│   │   └── repositories/      # Interfaces (contratos)
│   │
│   └── infrastructure/        # Implementações técnicas
│       ├── database/          # Conexão com banco de dados
│       │   ├── repositories/  # Implementação dos repositórios
│       │   └── typeorm/       # Mapeamento de tabelas
│       ├── auth/              # Sistema de autenticação
│       └── config/            # Configurações
│
├── .env                       # Variáveis de ambiente (senhas, etc)
└── package.json               # Dependências do projeto
```

---

## Fluxo de Dados?

### 1: Cadastro de uma Mãe e Bebê

```mermaid
sequenceDiagram
    participant App as Web
    participant Controller as Controller
    participant UseCase as Use Case
    participant Services as Services
    participant Repository as Repository
    participant DB as Database

    App->>Controller: POST /binomio/cadastro<br/>(dados da mãe e bebê)
    Controller->>Controller: Valida dados com DTO
    Controller->>UseCase: execute(dados)
    UseCase->>Repository: create(cadastro)
    Repository->>DB: INSERT INTO tb_cadastro_binomio
    DB-->>Repository: ID gerado: 123
    Repository-->>UseCase: Cadastro salvo
    UseCase->>Services: Gera email (mae123@sistema.com)
    UseCase->>Services: Gera senha aleatória
    UseCase->>Services: Criptografa senha
    UseCase->>Repository: create(user_mae)
    Repository->>DB: INSERT INTO tb_user_mae
    DB-->>Repository: Usuário criado
    Repository-->>UseCase: Credenciais salvas
    UseCase-->>Controller: {cadastro, email, senha}
    Controller-->>App: Sucesso!<br/>Email: mae123@sistema.com<br/>Senha: ABC123
```

---

### 2: Login de Mãe

```mermaid
sequenceDiagram
    participant App as App
    participant Controller as Auth Controller
    participant UseCase as Login Mae Use Case
    participant Repository as User Mae Repository
    participant DB as Database
    participant JWT as JWT Service

    App->>Controller: POST /auth/mae/login<br/>{email, password}
    Controller->>Controller: Valida dados com LoginDto
    Controller->>UseCase: execute({email, password})
    UseCase->>Repository: findByEmail(email)
    Repository->>DB: SELECT * FROM tb_user_mae<br/>WHERE email = ?
    DB-->>Repository: Dados do usuário
    Repository-->>UseCase: UserMae encontrado
    UseCase->>UseCase: Compara senha com bcrypt
    alt Senha correta
        UseCase->>UseCase: Verifica se usuário está ativo
        alt Usuário ativo
            UseCase->>JWT: Gera token JWT
            JWT-->>UseCase: Token gerado
            UseCase-->>Controller: {access_token}
            Controller-->>App: Login bem-sucedido<br/>{access_token: "eyJhbG..."}
        else Usuário inativo
            UseCase-->>Controller: Erro: Usuário inativo
            Controller-->>App: Erro: Usuário inativo
        end
    else Senha incorreta
        UseCase-->>Controller: Erro: Credenciais inválidas
        Controller-->>App: Erro: Credenciais inválidas
    end
```

---

### 3: Login de Profissional

```mermaid
sequenceDiagram
    participant App as web
    participant Controller as Auth Controller
    participant UseCase as Login Use Case
    participant Repository as Auth Repository
    participant DB as Database
    participant JWT as JWT Service

    App->>Controller: POST /auth/login<br/>{email, password}
    Controller->>Controller: Valida dados com LoginDto
    Controller->>UseCase: execute({email, password})
    UseCase->>Repository: findByEmail(email)
    Repository->>DB: SELECT * FROM tb_profissional<br/>WHERE email = ?
    DB-->>Repository: Dados do profissional
    Repository-->>UseCase: Profissional encontrado
    UseCase->>UseCase: Compara senha com bcrypt
    alt Senha correta
        UseCase->>UseCase: Verifica se profissional está ativo
        alt Profissional ativo
            UseCase->>JWT: Gera token JWT
            JWT-->>UseCase: Token gerado
            UseCase-->>Controller: {access_token}
            Controller-->>App: Login bem-sucedido<br/>{access_token: "eyJhbG..."}
        else Profissional inativo
            UseCase-->>Controller: Erro: Profissional inativo
            Controller-->>App: Erro: Profissional inativo
        end
    else Senha incorreta
        UseCase-->>Controller: Erro: Credenciais inválidas
        Controller-->>App: Erro: Credenciais inválidas
    end
```

---

### 4: Cadastro de Profissional (Somento no backend)

```mermaid
sequenceDiagram
    participant App as Web
    participant Controller as Profissional Controller
    participant UseCase as Create Profissional Use Case
    participant Services as Password Service
    participant Repository as Profissional Repository
    participant DB as Database

    App->>Controller: POST /profissional<br/>{nome, email, password}
    Controller->>Controller: Valida dados com DTO
    Controller->>UseCase: execute({nome, email, password})
    UseCase->>Services: hash(password)
    Services-->>UseCase: Senha criptografada
    UseCase->>Repository: create({nome, email, password_hash})
    Repository->>DB: INSERT INTO tb_profissional
    DB-->>Repository: ID gerado: 456
    Repository-->>UseCase: Profissional criado
    UseCase-->>Controller: {id, nome, email, ativo}
    Controller-->>App: Profissional cadastrado<br/>{id_profissional: 456, nome, email}
```

---

### Exemplo 5: Consulta de Perfil (Rota Protegida) (Somento no backend)

```mermaid
sequenceDiagram
    participant App as Web
    participant Guard as JWT Auth Guard
    participant Controller as Auth Controller
    participant UseCase as Validate Token Use Case
    participant Repository as Auth Repository
    participant DB as Database

    App->>Guard: GET /auth/profile<br/>Header: Authorization: Bearer token
    Guard->>Guard: Valida token JWT
    alt Token válido
        Guard->>Controller: Request com user.id_profissional
        Controller->>UseCase: execute(id_profissional)
        UseCase->>Repository: findById(id_profissional)
        Repository->>DB: SELECT * FROM tb_profissional<br/>WHERE id_profissional = ?
        DB-->>Repository: Dados do profissional
        Repository-->>UseCase: Profissional encontrado
        UseCase-->>Controller: {id, nome, email, ativo}
        Controller-->>App: Perfil do usuário<br/>{id_profissional, nome, email}
    else Token inválido ou expirado
        Guard-->>App: 401 Unauthorized<br/>Token inválido
    end
```

---

### 6: Consulta de Cadastros (Lista Todos) (Somento no backend)

```mermaid
sequenceDiagram
    participant App as Web
    participant Controller as Binomio Controller
    participant UseCase as Create Cadastro Use Case
    participant Repository as Cadastro Repository
    participant DB as Database

    App->>Controller: GET /binomio
    Controller->>UseCase: findAll()
    UseCase->>Repository: findAll()
    Repository->>DB: SELECT * FROM tb_cadastro_binomio
    DB-->>Repository: Lista de cadastros
    Repository-->>UseCase: Array de CadastroBinomio[]
    UseCase-->>Controller: Lista de cadastros
    Controller-->>App: Lista de cadastros<br/>[{id_binomio, idade_mae, ...}, ...]
```

---

### 7: Consulta de Cadastro Específico (Somento no backend)

```mermaid
sequenceDiagram
    participant App as Web
    participant Controller as Binomio Controller
    participant UseCase as Create Cadastro Use Case
    participant Repository as Cadastro Repository
    participant DB as Database

    App->>Controller: GET /binomio/123
    Controller->>UseCase: findById(123)
    UseCase->>Repository: findById(123)
    Repository->>DB: SELECT * FROM tb_cadastro_binomio<br/>WHERE id_binomio = 123
    DB-->>Repository: Dados do cadastro
    alt Cadastro encontrado
        Repository-->>UseCase: CadastroBinomio
        UseCase-->>Controller: Dados do cadastro
        Controller-->>App: Cadastro encontrado<br/>{id_binomio: 123, idade_mae, ...}
    else Cadastro não encontrado
        Repository-->>UseCase: null
        UseCase-->>Controller: null
        Controller-->>App: 404 Not Found<br/>Cadastro não encontrado
    end
```

---

## Componentes Principais

### 1. Presentation Layer (Camada de Apresentação)

#### Controllers (Controladores)

São os "recepcionistas" do sistema. Eles recebem as requisições HTTP e direcionam para o lugar certo.

**Exemplo: `auth.controller.ts`**
```typescript
@Controller('auth')
export class AuthController {
    // Endpoint: POST /auth/login
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.loginUseCase.execute(loginDto);
    }
    
    // Endpoint: POST /auth/mae/login
    @Post('mae/login')
    async loginMae(@Body() loginDto: LoginDto) {
        return await this.loginMaeUseCase.execute(loginDto);
    }
}
```

**O que faz:**
- Recebe email e senha
- Chama o Use Case de login
- Retorna um token JWT (chave de acesso)

#### DTOs (Data Transfer Objects)

São "validadores" que garantem que os dados recebidos estão corretos.

**Exemplo: `login.dto.ts`**
```typescript
export class LoginDto {
    @IsEmail()
    email: string;
    
    @IsString()
    @MinLength(6)
    password: string;
}
```

**O que faz:**
- Verifica se o email é válido
- Verifica se a senha tem pelo menos 6 caracteres
- Rejeita dados inválidos automaticamente

---

### 2. Application Layer (Camada de Aplicação)

#### Use Cases (Casos de Uso)

São as "regras de negócio". Cada Use Case representa uma ação que o sistema pode fazer.

**Principais Use Cases:**

1. **`create-cadastro-binomio.use-case.ts`**
   - **O que faz:** Cadastra uma mãe e bebê no sistema
   - **Passos:**
     1. Salva os dados do cadastro no banco
     2. Gera um email automático (ex: `mae123@sistema.com`)
     3. Gera uma senha aleatória
     4. Criptografa a senha
     5. Cria um usuário para a mãe
     6. Retorna as credenciais

2. **`login-mae.use-case.ts`**
   - **O que faz:** Autentica uma mãe no sistema
   - **Passos:**
     1. Busca o usuário pelo email
     2. Verifica se a senha está correta
     3. Verifica se o usuário está ativo
     4. Gera um token JWT
     5. Retorna o token

3. **`login.use-case.ts`**
   - **O que faz:** Autentica um profissional de saúde
   - Similar ao login de mãe, mas para profissionais

#### Services (Serviços)

São "ajudantes" que fazem tarefas específicas.

1. **`email-generator.service.ts`**
   ```typescript
   generate(id: number): string {
       return `mae${id}@sistema.com`;
   }
   ```
   - Gera emails automáticos baseados no ID

2. **`password-generator.service.ts`**
   ```typescript
   generate(): string {
       // Gera senha aleatória de 8 caracteres
   }
   
   hash(password: string): Promise<string> {
       // Criptografa a senha com bcrypt
   }
   ```
   - Gera senhas seguras
   - Criptografa senhas

---

### 3. 🧠 **Domain Layer** (Camada de Domínio)

#### Entities (Entidades)

São os "modelos" que representam os dados do sistema.

**Exemplo: `cadastro-binomio.entity.ts`**

Esta entidade representa um cadastro de mãe e bebê com **97 campos** divididos em seções:

```typescript
export class CadastroBinomio {
    id_binomio: number;
    
    // DADOS SOCIODEMOGRÁFICOS
    idade_mae: number;
    dt_nasc_mae: Date;
    etnia_mae: string;
    escol_mae: string;
    renda: string;
    
    // DADOS DO PARTO E BEBÊ
    dt_parto: Date;
    tp_parto: string;
    peso_nasc: number;
    sexo: string;
    
    // AMAMENTAÇÃO
    amament_24h_cadastro: string;
    auto_efic_inicial: number;
    
    // ... e muitos outros campos
}
```

**Seções de dados:**
1. Dados sociodemográficos (idade, etnia, escolaridade, renda)
2. Hábitos (tabagismo, álcool, drogas)
3. Saúde (diabetes, hipertensão, obesidade)
4. Dados do parto (tipo de parto, local, peso do bebê)
5. Amamentação (dificuldades, dispositivos, eficácia)
6. Retorno ao trabalho

#### Repository Interfaces (Interfaces de Repositório)

São "contratos" que definem como acessar os dados, sem se preocupar com a implementação.

```typescript
export interface ICadastroBinomioRepository {
    create(cadastro: CadastroBinomio): Promise<CadastroBinomio>;
    findById(id: number): Promise<CadastroBinomio | null>;
    findAll(): Promise<CadastroBinomio[]>;
}
```

---

### 4. Infrastructure Layer (Camada de Infraestrutura)

#### Database Repositories (Repositórios de Banco de Dados)

São as "implementações" que realmente acessam o banco de dados.

**Exemplo: `cadastro-binomio.repository.ts`**
```typescript
@Injectable()
export class CadastroBinomioRepository implements ICadastroBinomioRepository {
    constructor(
        @InjectRepository(CadastroBinomioSchema)
        private repository: Repository<CadastroBinomioSchema>
    ) {}
    
    async create(cadastro: CadastroBinomio): Promise<CadastroBinomio> {
        const schema = this.repository.create(cadastro);
        return await this.repository.save(schema);
    }
}
```

#### TypeORM Schemas (Esquemas do Banco)

São os "mapeamentos" que conectam as entidades às tabelas do banco de dados.

**Exemplo: `cadastro-binomio.schema.ts`**
```typescript
@Entity('tb_cadastro_binomio')
export class CadastroBinomioSchema {
    @PrimaryGeneratedColumn()
    id_binomio: number;
    
    @Column({ type: 'int', nullable: true })
    idade_mae: number;
    
    @Column({ type: 'date', nullable: true })
    dt_nasc_mae: Date;
    
    // ... todos os outros campos
}
```

**O que faz:**
- Define que a entidade corresponde à tabela `tb_cadastro_binomio`
- Define o tipo de cada coluna (int, date, varchar, etc.)
- Define quais campos podem ser nulos

#### Auth Module (Módulo de Autenticação)

Sistema de segurança que usa **JWT (JSON Web Tokens)**.

**Componentes:**

1. **JWT Strategy** (`jwt.strategy.ts`)
   - Valida tokens JWT
   - Extrai informações do usuário

2. **JWT Auth Guard** (`jwt-auth.guard.ts`)
   - Protege rotas que precisam de autenticação
   - Bloqueia acesso sem token válido

**Como funciona:**
```mermaid
graph LR
    A[Usuário faz login] --> B[Sistema valida credenciais]
    B --> C[Gera token JWT]
    C --> D[Retorna token para o usuário]
    D --> E[Usuário usa token nas próximas requisições]
    E --> F[Guard valida o token]
    F --> G[Permite ou bloqueia acesso]
```

---

## Banco de Dados

### Configuração

O sistema usa **MySQL** hospedado na nuvem (Aiven).

**Arquivo: `.env`**
```
DB_HOST={HOST}
DB_PORT={PORT}
DB_USERNAME={USERNAME}
DB_PASSWORD={PASSWORD}
DB_DATABASE={DATABASE}
```

### Principais Tabelas

1. **`tb_cadastro_binomio`**
   - Armazena dados de mães e bebês
   - 97 colunas com informações detalhadas
   - Chave primária: `id_binomio`

2. **`tb_user_mae`**
   - Armazena credenciais das mães
   - Campos: `id_user_mae`, `id_binomio`, `email`, `password_hash`, `ativo`

3. **`tb_profissional`**
   - Armazena dados de profissionais de saúde
   - Campos: `id_profissional`, `email`, `password_hash`, `nome`, `ativo`

---

## Sistema de Autenticação

### Como funciona o JWT?

JWT (JSON Web Token) é como um "crachá digital" que prova quem você é.

**Fluxo de autenticação:**

```mermaid
sequenceDiagram
    participant User as 👤 Usuário
    participant API as 🌐 API
    participant DB as 🗄️ Banco

    User->>API: POST /auth/mae/login<br/>{email, password}
    API->>DB: Busca usuário por email
    DB-->>API: Dados do usuário
    API->>API: Compara senha criptografada
    alt Senha correta
        API->>API: Gera token JWT
        API-->>User: ✅ {access_token: "eyJhbG..."}
    else Senha incorreta
        API-->>User: ❌ Credenciais inválidas
    end
    
    User->>API: GET /auth/profile<br/>Header: Authorization: Bearer eyJhbG...
    API->>API: Valida token JWT
    API->>DB: Busca dados do usuário
    DB-->>API: Dados completos
    API-->>User: ✅ Perfil do usuário
```

### Proteção de Rotas

Algumas rotas são protegidas e só podem ser acessadas com token válido:

```typescript
@UseGuards(JwtAuthGuard)  // Rota protegida
@Get('profile')
async getProfile(@Request() req) {
    return await this.validateTokenUseCase.execute(req.user.id_profissional);
}
```

---

## Endpoints da API

### 1. Autenticação

#### `POST /auth/login`
Login de profissionais de saúde

**Request:**
```json
{
    "email": "profissional@exemplo.com",
    "password": "senha123"
}
```

**Response:**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `POST /auth/mae/login`
Login de mães

**Request:**
```json
{
    "email": "mae123@sistema.com",
    "password": "ABC123XYZ"
}
```

**Response:**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `GET /auth/profile` 🔒
Obtém perfil do usuário autenticado

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
    "id_profissional": 1,
    "nome": "Dr. João Silva",
    "email": "joao@exemplo.com"
}
```

---

### 2. Cadastro de Binômio (Mãe + Bebê)

#### `POST /binomio/cadastro`
Cadastra uma mãe e bebê no sistema

**Request:** (exemplo simplificado)
```json
{
    "idade_mae": 28,
    "dt_nasc_mae": "1995-05-15",
    "etnia_mae": "B",
    "escol_mae": "12",
    "dt_parto": "2024-01-20",
    "peso_nasc": 3200,
    "sexo": "M",
    "tp_parto": "N"
}
```

**Response:**
```json
{
    "cadastro": {
        "id_binomio": 123,
        "idade_mae": 28,
        "dt_parto": "2024-01-20",
        "peso_nasc": 3200
    },
    "userCredentials": {
        "id_user_mae": 456,
        "email": "mae123@sistema.com",
        "password": "ABC123XYZ"
    }
}
```

> **Importante:** A senha é retornada apenas uma vez! O sistema armazena apenas a versão criptografada.

#### `GET /binomio`
Lista todos os cadastros

**Response:**
```json
[
    {
        "id_binomio": 123,
        "idade_mae": 28,
        "dt_parto": "2024-01-20"
    },
    {
        "id_binomio": 124,
        "idade_mae": 32,
        "dt_parto": "2024-01-22"
    }
]
```

#### `GET /binomio/:id`
Busca um cadastro específico

**Response:**
```json
{
    "id_binomio": 123,
    "idade_mae": 28,
    "dt_nasc_mae": "1995-05-15",
    "etnia_mae": "B",
    "escol_mae": "12"
}
```

---

### 3. Profissionais

#### `POST /profissional`
Cadastra um novo profissional de saúde

**Request:**
```json
{
    "nome": "Dr. João Silva",
    "email": "joao@exemplo.com",
    "password": "senha123"
}
```

**Response:**
```json
{
    "id_profissional": 1,
    "nome": "Dr. João Silva",
    "email": "joao@exemplo.com",
    "ativo": true
}
```

---

## Tecnologias Utilizadas

### Framework e Linguagem
- **NestJS**: Framework Node.js para construir aplicações server-side
- **TypeScript**: JavaScript com tipos (mais seguro e organizado)

### Banco de Dados
- **MySQL**: Banco de dados relacional
- **TypeORM**: ORM (Object-Relational Mapping) para facilitar acesso ao banco

### Autenticação e Segurança
- **JWT**: Tokens para autenticação
- **Passport**: Middleware de autenticação
- **bcrypt**: Criptografia de senhas

### Validação
- **class-validator**: Valida dados de entrada
- **class-transformer**: Transforma e sanitiza dados

### Outras
- **dotenv**: Gerencia variáveis de ambiente
- **CORS**: Permite requisições de diferentes origens

---

## Como Rodar o Projeto

### 1. Instalar Dependências
```bash
yarn install
```

### 2. Configurar Variáveis de Ambiente
Criar arquivo `.env` com as configurações do banco de dados.

### 3. Rodar em Desenvolvimento
```bash
yarn run start:dev
```

O servidor inicia em: `http://localhost:3000`

### 4. Testar a API
Usar ferramentas como:
- **Postman**
- **Insomnia**
- **Thunder Client** (extensão do VS Code)