# 📚 DOCUMENTAÇÃO COMPLETA - PLANNER DE VIAGEM

## 📋 Índice

1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Tecnologias Utilizadas](#tecnologias-utilizadas)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
5. [Módulos do Sistema](#módulos-do-sistema)
6. [Endpoints da API](#endpoints-da-api)
7. [Lógica Financeira](#lógica-financeira)
8. [DTOs e Validações](#dtos-e-validações)
9. [Histórico de Migrations](#histórico-de-migrations)
10. [Conceitos Importantes](#conceitos-importantes)
11. [Como Rodar o Projeto](#como-rodar-o-projeto)

---

## 🎯 Visão Geral do Projeto

### O que é este projeto?

Este é um **sistema de planejamento de viagens** que ajuda você a organizar suas viagens de forma completa e inteligente. O sistema não apenas permite criar viagens e registrar gastos, mas também oferece informações sobre clima, disponibilidade de transporte turístico (como trens), sugestões de lugares para visitar e, principalmente, um **sistema financeiro inteligente** que monitora seus gastos e gerencia fundos de emergência.

### Para quem é este sistema?

Este sistema é ideal para:
- **Viajantes organizados** que querem controlar cada centavo da viagem
- **Planejadores** que desejam informações climáticas antes de viajar
- **Pessoas cautelosas** que mantêm fundos de emergência para gastos inesperados
- **Turistas** que querem recomendações baseadas no clima

### Principais Funcionalidades

1. **Gestão de Viagens**
   - Criar viagens com destino, datas e orçamento
   - Vincular viagens a usuários
   - Visualizar todas as viagens criadas

2. **Controle de Despesas**
   - Registrar gastos categorizados (alimentação, transporte, hospedagem, etc.)
   - Associar despesas a viagens específicas
   - Visualizar histórico de gastos por viagem

3. **Sistema Financeiro Inteligente**
   - Cálculo automático de orçamento consumido
   - Sistema de **fundos de emergência** (por viagem e global)
   - Alertas de gastos excessivos
   - Recomendações financeiras personalizadas
   - Histórico de uso de fundos de emergência

4. **Informações Climáticas**
   - Consulta de clima histórico de destinos
   - Previsões baseadas em dados reais
   - Recomendações de atividades baseadas no clima

5. **Planejamento Inteligente**
   - Sugestões de lugares para visitar
   - Recomendações de atividades internas/externas baseadas no clima
   - Informações sobre transporte turístico

---

## 🛠️ Tecnologias Utilizadas

### O que são essas tecnologias e por que foram escolhidas?

#### 1. **Node.js** (Ambiente de Execução)

**O que é:** Node.js permite executar código JavaScript no servidor (computador), não apenas no navegador.

**Por que usar:** É rápido, eficiente e permite usar a mesma linguagem (JavaScript/TypeScript) tanto no frontend quanto no backend.

**Versão necessária:** Node.js 18 ou superior

---

#### 2. **NestJS** (Framework Backend)

**O que é:** NestJS é um framework (estrutura) para criar aplicações backend organizadas e profissionais.

**Por que usar:**
- Estrutura modular e organizada
- Facilita a manutenção do código
- Usa TypeScript nativamente
- Tem ferramentas prontas para validação, injeção de dependências, etc.
- Segue padrões de mercado

**Analogia:** Se você está construindo uma casa, o NestJS é como ter uma planta arquitetônica profissional com todos os cômodos bem definidos, em vez de construir tudo de forma improvisada.

**Principais conceitos do NestJS:**

- **Modules (Módulos):** Agrupam funcionalidades relacionadas (ex: módulo de viagens, módulo de despesas)
- **Controllers (Controladores):** Recebem as requisições HTTP e chamam os serviços adequados
- **Services (Serviços):** Contêm a lógica de negócio (regras e cálculos)
- **Providers:** Podem ser injetados em outras classes (injeção de dependências)

---

#### 3. **TypeScript** (Linguagem)

**O que é:** TypeScript é JavaScript com tipos. Você define o tipo de cada variável (número, texto, data, etc.).

**Por que usar:**
- Previne erros durante o desenvolvimento
- Autocompletar inteligente no editor
- Código mais legível e documentado
- Facilita refatoração

**Exemplo:**
```typescript
// JavaScript (sem tipos)
function somar(a, b) {
  return a + b;
}
somar(5, "10"); // Retorna "510" (erro silencioso)

// TypeScript (com tipos)
function somar(a: number, b: number): number {
  return a + b;
}
somar(5, "10"); // ERRO detectado antes de rodar!
```

---

#### 4. **Prisma ORM** (Gerenciador de Banco de Dados)

**O que é:** Prisma é uma ferramenta que facilita a comunicação com o banco de dados. Em vez de escrever SQL manualmente, você usa código JavaScript/TypeScript.

**Por que usar:**
- Código mais limpo e fácil de entender
- Previne SQL Injection (tipo de ataque hacker)
- Migrações automáticas do banco
- Autocompletar inteligente
- Validação de tipos

**Exemplo:**
```typescript
// SQL tradicional (complicado)
const trips = await db.query('SELECT * FROM Trip WHERE userId = ?', [userId]);

// Prisma (simples e seguro)
const trips = await prisma.trip.findMany({
  where: { userId: userId }
});
```

**Componentes do Prisma:**
- **Prisma Client:** Biblioteca para consultar o banco
- **Prisma Schema:** Arquivo que define a estrutura do banco
- **Prisma Migrate:** Gerencia mudanças na estrutura do banco

---

#### 5. **MySQL** (Banco de Dados)

**O que é:** MySQL é um sistema de gerenciamento de banco de dados relacional. Ele armazena todos os dados do sistema de forma organizada em tabelas.

**Por que usar:**
- Gratuito e open-source
- Amplamente usado no mercado
- Confiável e rápido
- Ótima documentação

**Conceitos importantes:**
- **Tabelas:** Como planilhas que armazenam dados
- **Colunas:** Campos de cada registro (nome, email, etc.)
- **Linhas:** Cada registro individual
- **Relacionamentos:** Como as tabelas se conectam

---

#### 6. **Axios** (Cliente HTTP)

**O que é:** Axios é uma biblioteca para fazer requisições HTTP (chamar APIs externas).

**Por que usar:** Facilita chamadas a APIs externas (clima, transportes, etc.) de forma simples.

**Exemplo de uso no projeto:**
```typescript
// Buscar dados climáticos de uma API externa
const response = await this.httpService.get(
  'https://meteostat.p.rapidapi.com/stations/daily',
  {
    params: { station: stationId, start: startDate, end: endDate },
    headers: { 'x-rapidapi-key': process.env.RAPIDAPI_KEY }
  }
);
```

---

#### 7. **Class Validator** (Validação de Dados)

**O que é:** Biblioteca que valida automaticamente os dados recebidos nas requisições.

**Por que usar:** Garante que o usuário envie dados no formato correto.

**Exemplo:**
```typescript
export class CreateTripDto {
  @IsString() // Valida que é texto
  title: string;

  @IsNumber() // Valida que é número
  budget: number;

  @IsDateString() // Valida que é uma data válida
  startDate: string;
}
```

---

#### 8. **Jest** (Framework de Testes)

**O que é:** Jest é uma ferramenta para escrever e executar testes automatizados.

**Por que usar:** Garante que o código funciona corretamente e previne bugs.

---

## 🏗️ Arquitetura do Sistema

### Estrutura Geral

O projeto segue o padrão **MVC** (Model-View-Controller) adaptado para APIs REST, com uma arquitetura em camadas:

```
┌─────────────────────────────────────┐
│         CLIENTE (Frontend)          │
│      (Navegador, App Mobile)        │
└─────────────────┬───────────────────┘
                  │ HTTP Requests
                  ▼
┌─────────────────────────────────────┐
│         CONTROLLERS                 │
│   (Recebem requisições HTTP)        │
│   - TripController                  │
│   - ExpenseController               │
│   - WeatherController               │
│   - etc...                          │
└─────────────────┬───────────────────┘
                  │ Chamam
                  ▼
┌─────────────────────────────────────┐
│         SERVICES                    │
│   (Lógica de Negócio)              │
│   - TripService                    │
│   - ExpenseService                 │
│   - WeatherService                 │
│   - etc...                         │
└─────────────────┬───────────────────┘
                  │ Consultam/Modificam
                  ▼
┌─────────────────────────────────────┐
│         PRISMA ORM                  │
│   (Camada de Acesso ao Banco)      │
└─────────────────┬───────────────────┘
                  │ SQL Queries
                  ▼
┌─────────────────────────────────────┐
│         BANCO DE DADOS              │
│           (MySQL)                   │
│   - Tabela User                    │
│   - Tabela Trip                    │
│   - Tabela Expense                 │
│   - Tabela FinancialOperation      │
└─────────────────────────────────────┘
```

### Fluxo de uma Requisição

Vamos entender o que acontece quando você cria uma viagem:

1. **Cliente envia requisição HTTP POST** para `http://localhost:3000/trip`
   ```json
   {
     "title": "Viagem para Curitiba",
     "destination": "Curitiba",
     "startDate": "2026-06-13",
     "endDate": "2026-06-18",
     "budget": 5000,
     "userId": 1
   }
   ```

2. **NestJS recebe a requisição** e direciona para o `TripController`

3. **Controller valida os dados** usando `class-validator`
   - Verifica se `title` é texto
   - Verifica se `budget` é número
   - Verifica se `startDate` é data válida
   - etc.

4. **Controller chama o TripService** passando os dados validados

5. **Service executa a lógica de negócio**
   - Converte datas
   - Prepara dados para o banco

6. **Service usa Prisma** para salvar no banco
   ```typescript
   await this.prisma.trip.create({ data: {...} })
   ```

7. **Prisma executa SQL** no MySQL:
   ```sql
   INSERT INTO Trip (title, destination, startDate, endDate, budget, userId)
   VALUES ('Viagem para Curitiba', 'Curitiba', '2026-06-13', ...);
   ```

8. **Banco retorna a viagem criada** com ID gerado

9. **Response volta pelos mesmos caminhos** até chegar ao cliente

---

### Estrutura de Pastas

```
backend/
├── prisma/                      # Configurações do banco de dados
│   ├── schema.prisma           # Definição do schema do banco
│   └── migrations/             # Histórico de mudanças no banco
│
├── src/                        # Código-fonte principal
│   ├── main.ts                 # Ponto de entrada da aplicação
│   ├── app.module.ts           # Módulo principal (raiz)
│   ├── app.controller.ts       # Controller raiz
│   ├── app.service.ts          # Service raiz
│   │
│   ├── prisma/                 # Módulo Prisma
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts   # Conexão com banco
│   │
│   ├── trip/                   # Módulo de Viagens
│   │   ├── trip.module.ts
│   │   ├── trip.controller.ts  # Endpoints de viagens
│   │   ├── trip.service.ts     # Lógica de viagens
│   │   └── dto/
│   │       └── create-trip.dto.ts
│   │
│   ├── expense/                # Módulo de Despesas
│   │   ├── expense.module.ts
│   │   ├── expense.controller.ts
│   │   ├── expense.service.ts
│   │   └── dto/
│   │       └── create-expense.dto.ts
│   │
│   ├── weather/                # Módulo de Clima
│   │   ├── weather.module.ts
│   │   ├── weather.controller.ts
│   │   └── weather.service.ts
│   │
│   ├── train/                  # Módulo de Trens
│   │   ├── train.module.ts
│   │   ├── train.controller.ts
│   │   └── train.service.ts
│   │
│   ├── places/                 # Módulo de Lugares
│   │   ├── places.module.ts
│   │   └── places.service.ts
│   │
│   └── travel-planner/         # Módulo Planejador de Viagens
│       ├── travel-planner.module.ts
│       ├── travel-planner.controller.ts
│       └── travel-planner.service.ts
│
├── test/                       # Testes E2E (End-to-End)
├── package.json                # Dependências do projeto
├── tsconfig.json               # Configuração TypeScript
└── nest-cli.json               # Configuração NestJS
```

---

## 🗄️ Estrutura do Banco de Dados

### Visão Geral do Schema

O banco de dados possui **4 tabelas principais** que se relacionam entre si:

```
┌──────────────┐
│     User     │ ◄──┐
└──────┬───────┘    │
       │            │
       │ 1         │
       │            │
       │ N          │ 1
       │            │
┌──────▼───────┐    │
│     Trip     │ ◄──┤
└──────┬───────┘    │
       │            │
       │ 1          │ N
       │            │
       │ N          │
       │            │
┌──────▼───────┐    │
│   Expense    │    │
└──────────────┘    │
                    │
                    │
┌──────────────────┐│
│ FinancialOperation│
└───────────────────┘
```

### Relacionamentos Explicados

- **Um usuário pode ter várias viagens** (1:N)
- **Uma viagem pertence a um único usuário** (N:1)
- **Uma viagem pode ter várias despesas** (1:N)
- **Uma despesa pertence a uma única viagem** (N:1)
- **Um usuário pode ter várias operações financeiras** (1:N)
- **Uma viagem pode ter várias operações financeiras** (1:N)

---

### Tabela: User (Usuário)

**Propósito:** Armazena informações dos usuários do sistema.

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| `id` | Int | Identificador único do usuário | Primary Key, Auto Increment |
| `name` | String | Nome completo do usuário | Obrigatório |
| `email` | String | Email do usuário | Obrigatório, Único |
| `password` | String | Senha do usuário (deve ser criptografada) | Obrigatório |
| `emergencyFund` | Float | Fundo de emergência global do usuário | Padrão: 0 |
| `createdAt` | DateTime | Data/hora de criação do registro | Auto-preenchido |

**Relacionamentos:**
- `trips` → Várias viagens (Trip[])
- `operations` → Várias operações financeiras (FinancialOperation[])

**Exemplo de registro:**
```json
{
  "id": 1,
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "$2b$10$hash...",
  "emergencyFund": 2000.00,
  "createdAt": "2026-02-27T20:29:14.000Z"
}
```

**Conceito Importante - Emergency Fund (Fundo de Emergência):**
O `emergencyFund` é um valor que o usuário mantém disponível para cobrir gastos inesperados em **qualquer viagem**. É como uma reserva financeira pessoal.

---

### Tabela: Trip (Viagem)

**Propósito:** Armazena informações sobre cada viagem planejada.

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| `id` | Int | Identificador único da viagem | Primary Key, Auto Increment |
| `title` | String | Título/nome da viagem | Obrigatório |
| `destination` | String | Destino da viagem | Obrigatório |
| `startDate` | DateTime | Data de início da viagem | Obrigatório |
| `endDate` | DateTime | Data de término da viagem | Obrigatório |
| `budget` | Float | Orçamento planejado para a viagem | Opcional (pode ser null) |
| `emergencyFund` | Float | Fundo de emergência específico desta viagem | Padrão: 0 |
| `usedEmergencyFund` | Float | Quanto do fundo de emergência já foi usado | Padrão: 0 |
| `userId` | Int | ID do usuário dono da viagem | Foreign Key → User |
| `createdAt` | DateTime | Data/hora de criação do registro | Auto-preenchido |

**Relacionamentos:**
- `user` → Um usuário (User)
- `expenses` → Várias despesas (Expense[])
- `operations` → Várias operações financeiras (FinancialOperation[])

**Exemplo de registro:**
```json
{
  "id": 1,
  "title": "Férias em Curitiba",
  "destination": "Curitiba",
  "startDate": "2026-06-13T00:00:00.000Z",
  "endDate": "2026-06-18T00:00:00.000Z",
  "budget": 5000.00,
  "emergencyFund": 500.00,
  "usedEmergencyFund": 0.00,
  "userId": 1,
  "createdAt": "2026-02-28T10:15:30.000Z"
}
```

**Conceitos Importantes:**

1. **Budget (Orçamento):** Quanto você PLANEJA gastar na viagem
2. **Emergency Fund da Trip:** Dinheiro extra reservado especificamente para essa viagem
3. **Used Emergency Fund:** Quanto do fundo de emergência já foi consumido

---

### Tabela: Expense (Despesa)

**Propósito:** Registra cada gasto realizado durante uma viagem.

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| `id` | Int | Identificador único da despesa | Primary Key, Auto Increment |
| `description` | String | Descrição do gasto | Obrigatório |
| `amount` | Float | Valor gasto | Obrigatório |
| `category` | String | Categoria do gasto | Obrigatório |
| `date` | DateTime | Data em que o gasto foi realizado | Obrigatório |
| `tripId` | Int | ID da viagem a qual pertence | Foreign Key → Trip |

**Relacionamentos:**
- `trip` → Uma viagem (Trip)

**Categorias Comuns:**
- Alimentação
- Transporte
- Hospedagem
- Passeios
- Compras
- Outros

**Exemplo de registro:**
```json
{
  "id": 1,
  "description": "Almoço no restaurante Madalosso",
  "amount": 120.50,
  "category": "Alimentação",
  "date": "2026-06-14T13:30:00.000Z",
  "tripId": 1
}
```

---

### Tabela: FinancialOperation (Operação Financeira)

**Propósito:** Registra o histórico de uso de fundos de emergência. Cada vez que o sistema usa dinheiro do fundo de emergência, cria um registro aqui.

| Coluna | Tipo | Descrição | Restrições |
|--------|------|-----------|------------|
| `id` | Int | Identificador único da operação | Primary Key, Auto Increment |
| `type` | String | Tipo da operação | Obrigatório |
| `tripId` | Int | ID da viagem relacionada | Foreign Key → Trip |
| `userId` | Int | ID do usuário relacionado | Foreign Key → User |
| `amountTrip` | Float | Valor usado do fundo da viagem | Padrão: 0 |
| `amountGlobal` | Float | Valor usado do fundo global | Padrão: 0 |
| `totalAmount` | Float | Valor total da operação | Obrigatório |
| `createdAt` | DateTime | Data/hora da operação | Auto-preenchido |

**Tipos de Operação:**
- `EMERGENCY_USAGE` → Uso de fundo de emergência

**Relacionamentos:**
- `trip` → Uma viagem (Trip)
- `user` → Um usuário (User)

**Exemplo de registro:**
```json
{
  "id": 1,
  "type": "EMERGENCY_USAGE",
  "tripId": 1,
  "userId": 1,
  "amountTrip": 300.00,
  "amountGlobal": 200.00,
  "totalAmount": 500.00,
  "createdAt": "2026-06-16T18:45:00.000Z"
}
```

**Entendendo a operação:**
- `amountTrip: 300` → Usou R$ 300 do fundo da viagem
- `amountGlobal: 200` → Usou R$ 200 do fundo global do usuário
- `totalAmount: 500` → Total usado foi R$ 500

**Por que registrar isso?**
- Transparência: Saber exatamente quando e quanto foi usado
- Histórico: Poder analisar padrões de gastos inesperados
- Auditoria: Rastrear todas as movimentações financeiras

---

## 📦 Módulos do Sistema

O sistema é dividido em **8 módulos** principais. Cada módulo agrupa funcionalidades relacionadas.

### 1. Prisma Module

**Responsabilidade:** Gerenciar a conexão com o banco de dados.

**Arquivos:**
- `prisma.module.ts` → Definição do módulo
- `prisma.service.ts` → Serviço de conexão

**O que faz:**
```typescript
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect(); // Conecta ao banco ao iniciar
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Desconecta ao parar
  }
}
```

**Por que é importante:**
Este módulo centraliza toda interação com o banco. Outros módulos importam o `PrismaModule` para ter acesso ao banco.

---

### 2. Trip Module (Módulo de Viagens)

**Responsabilidade:** Gerenciar tudo relacionado a viagens.

**Arquivos:**
- `trip.module.ts`
- `trip.controller.ts` → Endpoints HTTP
- `trip.service.ts` → Lógica de negócio
- `dto/create-trip.dto.ts` → Validação de dados

**Funcionalidades:**
1. Criar novas viagens
2. Listar todas as viagens
3. Obter resumo financeiro de uma viagem
4. Usar fundo de emergência em uma viagem

**Dependências:**
- PrismaModule (para acessar o banco)

---

### 3. Expense Module (Módulo de Despesas)

**Responsabilidade:** Gerenciar despesas das viagens.

**Arquivos:**
- `expense.module.ts`
- `expense.controller.ts`
- `expense.service.ts`
- `dto/create-expense.dto.ts`

**Funcionalidades:**
1. Criar novas despesas
2. Listar despesas de uma viagem específica

**Dependências:**
- PrismaModule

---

### 4. Weather Module (Módulo de Clima)

**Responsabilidade:** Fornecer informações climáticas.

**Arquivos:**
- `weather.module.ts`
- `weather.controller.ts`
- `weather.service.ts`

**Funcionalidades:**
1. Consultar dados climáticos históricos
2. Obter previsões específicas para Curitiba em junho
3. Integração com API externa (Meteostat via RapidAPI)

**Dependências:**
- HttpModule (do @nestjs/axios) para chamadas HTTP
- ConfigModule para variáveis de ambiente

**API Externa Usada:**
- **Meteostat API** (via RapidAPI)
  - Fornece dados climáticos históricos
  - Requer chave de API (`RAPIDAPI_KEY`)

---

### 5. Train Module (Módulo de Trens)

**Responsabilidade:** Fornecer informações sobre transporte turístico (trens).

**Arquivos:**
- `train.module.ts`
- `train.controller.ts`
- `train.service.ts`

**Funcionalidades:**
1. Verificar disponibilidade do trem turístico
2. Fornecer recomendações de dias para passeio
3. Integrar informações climáticas

**Dados Fornecidos:**
- Nome do trem: **Serra Verde Express**
- Rota: Curitiba → Morretes
- Duração: aproximadamente 4 horas
- Operação em junho: apenas finais de semana
- Dia recomendado: Sábado (baseado em clima)

---

### 6. Places Module (Módulo de Lugares)

**Responsabilidade:** Fornecer listas de lugares turísticos.

**Arquivos:**
- `places.module.ts`
- `places.service.ts`

**Funcionalidades:**
1. Listar lugares para atividades externas
2. Listar lugares para atividades internas

**Lugares Externos (ao ar livre):**
- Jardim Botânico
- Parque Tanguá
- Ópera de Arame
- Parque Barigui

**Lugares Internos (cobertos):**
- Museu Oscar Niemeyer
- Museu Paranaense
- Shopping Mueller

**Por que essa divisão?**
Para recomendar atividades apropriadas baseadas no clima. Se estiver chovendo, sugere lugares internos.

---

### 7. Travel Planner Module (Módulo Planejador de Viagens)

**Responsabilidade:** Integrar todos os módulos para criar um planejamento completo.

**Arquivos:**
- `travel-planner.module.ts`
- `travel-planner.controller.ts`
- `travel-planner.service.ts`

**Funcionalidades:**
1. Criar plano de viagem completo
2. Integrar dados climáticos
3. Sugerir atividades por dia
4. Incluir informações de transporte

**Dependências:**
- WeatherService
- TrainService
- PlacesService

**O que este módulo entrega:**
Um plano completo com:
- Informações climáticas do período
- Sugestões de lugares para cada dia
- Recomendações de transporte
- Análise de risco climático

---

### 8. App Module (Módulo Principal)

**Responsabilidade:** Módulo raiz que importa todos os outros.

**Arquivos:**
- `app.module.ts`
- `app.controller.ts`
- `app.service.ts`

**Configuração:**
```typescript
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Variáveis de ambiente
    WeatherModule,
    TrainModule,
    PlacesModule,
    TravelPlannerModule,
    PrismaModule,
    TripModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

---

## 🌐 Endpoints da API

### URL Base

```
http://localhost:3000
```

Todas as rotas começam com esta URL base.

---

## 🧳 Endpoints de Viagens (Trip)

### 1. Criar Viagem

**Descrição:** Cria uma nova viagem no sistema.

**Método:** `POST`  
**Rota:** `/trip`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "title": "Férias em Curitiba",
  "destination": "Curitiba",
  "startDate": "2026-06-13",
  "endDate": "2026-06-18",
  "budget": 5000,
  "userId": 1
}
```

**Campos:**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `title` | string | Sim | Nome/título da viagem |
| `destination` | string | Sim | Cidade/local de destino |
| `startDate` | string (ISO) | Sim | Data de início (YYYY-MM-DD) |
| `endDate` | string (ISO) | Sim | Data de término (YYYY-MM-DD) |
| `budget` | number | Não | Orçamento planejado |
| `userId` | number | Sim | ID do usuário dono da viagem |

**Validações:**
- `title` deve ser texto
- `destination` deve ser texto
- `startDate` deve ser data válida
- `endDate` deve ser data válida
- `budget` deve ser número (se fornecido)
- `userId` deve ser número e usuário deve existir

**Response de Sucesso (201):**
```json
{
  "id": 1,
  "title": "Férias em Curitiba",
  "destination": "Curitiba",
  "startDate": "2026-06-13T00:00:00.000Z",
  "endDate": "2026-06-18T00:00:00.000Z",
  "budget": 5000,
  "emergencyFund": 0,
  "usedEmergencyFund": 0,
  "userId": 1,
  "createdAt": "2026-02-28T10:30:00.000Z"
}
```

**Response de Erro (400):**
```json
{
  "statusCode": 400,
  "message": "Usuário não encontrado.",
  "error": "Bad Request"
}
```

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:3000/trip \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Férias em Curitiba",
    "destination": "Curitiba",
    "startDate": "2026-06-13",
    "endDate": "2026-06-18",
    "budget": 5000,
    "userId": 1
  }'
```

---

### 2. Listar Todas as Viagens

**Descrição:** Retorna todas as viagens cadastradas incluindo suas despesas.

**Método:** `GET`  
**Rota:** `/trip`

**Parâmetros:** Nenhum

**Response de Sucesso (200):**
```json
[
  {
    "id": 1,
    "title": "Férias em Curitiba",
    "destination": "Curitiba",
    "startDate": "2026-06-13T00:00:00.000Z",
    "endDate": "2026-06-18T00:00:00.000Z",
    "budget": 5000,
    "emergencyFund": 0,
    "usedEmergencyFund": 0,
    "userId": 1,
    "createdAt": "2026-02-28T10:30:00.000Z",
    "expenses": [
      {
        "id": 1,
        "description": "Almoço",
        "amount": 120.50,
        "category": "Alimentação",
        "date": "2026-06-14T13:30:00.000Z",
        "tripId": 1
      }
    ]
  }
]
```

**Exemplo com cURL:**
```bash
curl http://localhost:3000/trip
```

---

### 3. Obter Resumo Financeiro da Viagem

**Descrição:** Retorna um resumo financeiro completo e detalhado de uma viagem específica, incluindo análise de gastos, fundos de emergência, alertas e recomendações.

**Método:** `GET`  
**Rota:** `/trip/:id/resumo`

**Parâmetros de URL:**
- `id` (number) → ID da viagem

**Response de Sucesso (200):**
```json
{
  "tripId": 1,
  "title": "Férias em Curitiba",
  
  "budget": 5000,
  "percentualUsado": 82.50,
  
  "fundoTrip": 500,
  "fundoGlobal": 2000,
  "usedEmergencyFund": 0,
  "fundoTotalDisponivel": 2500,
  
  "totalGasto": 4125,
  "limiteTotalPossivel": 7500,
  "percentualUsoTotal": 55.00,
  
  "saldoRestantePlanejado": 875,
  "saldoRestanteTotal": 3375,
  
  "ultrapassouOrcamento": false,
  "valorExcedente": 0,
  "aindaPodeCobrirComFundo": true,
  "nivelAlerta": "ATENCAO",
  "statusFinanceiroFinal": "ESTAVEL",
  
  "totalOperacoesEmergencia": 0,
  "totalUsadoEmergencia": 0,
  "historicoEmergencia": [],
  
  "gastosPorCategoria": {
    "Alimentação": 1500,
    "Transporte": 800,
    "Hospedagem": 1500,
    "Passeios": 325
  },
  
  "recomendacao": "Atenção: você já utilizou mais de 80% do orçamento."
}
```

**Campos da Response Explicados:**

**Identificação:**
- `tripId`: ID da viagem
- `title`: Nome da viagem

**Planejamento:**
- `budget`: Orçamento planejado
- `percentualUsado`: % do orçamento já gasto

**Fundos:**
- `fundoTrip`: Fundo de emergência específico da viagem
- `fundoGlobal`: Fundo de emergência global do usuário
- `usedEmergencyFund`: Quanto do fundo da viagem já foi usado
- `fundoTotalDisponivel`: Total disponível (trip + global)

**Totais:**
- `totalGasto`: Soma de todas as despesas
- `limiteTotalPossivel`: Orçamento + fundos disponíveis
- `percentualUsoTotal`: % do limite total já gasto

**Saldos:**
- `saldoRestantePlanejado`: Quanto sobrou do orçamento planejado
- `saldoRestanteTotal`: Quanto sobrou do limite total

**Estado Financeiro:**
- `ultrapassouOrcamento`: Se gastou mais que o planejado (boolean)
- `valorExcedente`: Quanto gastou além do orçamento
- `aindaPodeCobrirComFundo`: Se os fundos cobrem o excedente (boolean)
- `nivelAlerta`: Classificação de risco
  - `SEGURO`: Gastos dentro do orçamento
  - `ATENCAO`: Ultrapassou orçamento mas fundos cobrem
  - `CRITICO`: Ultrapassou até os fundos disponíveis
- `statusFinanceiroFinal`: Status geral
  - `ESTAVEL`: Tudo sob controle
  - `USANDO_EMERGENCIA`: Precisou usar fundos extras
  - `INSUSTENTAVEL`: Gastos além de todos recursos

**Histórico:**
- `totalOperacoesEmergencia`: Quantas vezes usou fundo de emergência
- `totalUsadoEmergencia`: Valor total usado dos fundos
- `historicoEmergencia`: Array com detalhes de cada operação

**Análise:**
- `gastosPorCategoria`: Objeto com total gasto por categoria
- `recomendacao`: Texto com recomendação personalizada

**Exemplo de categorização:**

| Situação | nivelAlerta | statusFinanceiroFinal |
|----------|-------------|-----------------------|
| Gastou R$ 3.000 de R$ 5.000 | SEGURO | ESTAVEL |
| Gastou R$ 4.500 de R$ 5.000 | ATENCAO | ESTAVEL |
| Gastou R$ 5.200 de R$ 5.000 (tem R$ 1.000 de fundo) | ATENCAO | ESTAVEL (mas pode usar emergência) |
| Gastou R$ 8.000 de R$ 5.000 + R$ 2.000 de fundos | CRITICO | INSUSTENTAVEL |

**Exemplo com cURL:**
```bash
curl http://localhost:3000/trip/1/resumo
```

---

### 4. Usar Fundo de Emergência

**Descrição:** Utiliza fundos de emergência para cobrir gastos que ultrapassaram o orçamento planejado. O sistema automaticamente usa primeiro o fundo da viagem, depois o fundo global do usuário.

**Método:** `POST`  
**Rota:** `/trip/:id/usaremergencia`

**Parâmetros de URL:**
- `id` (number) → ID da viagem

**Body:** Nenhum

**Como Funciona:**

1. Sistema calcula quanto foi gasto além do orçamento (excedente)
2. Se excedente ≤ 0: Não há o que cobrir
3. Se excedente > 0:
   - Tenta usar o `emergencyFund` da viagem primeiro
   - Se não for suficiente, usa o `emergencyFund` global
   - Se ainda não for suficiente, informa o valor não coberto

**Response de Sucesso - Sem Excedente (200):**
```json
{
  "message": "Não há excedente para cobrir."
}
```

**Response de Sucesso - Coberto (200):**
```json
{
  "message": "Fundo utilizado com sucesso.",
  "usadoDaTrip": 300,
  "usadoDoGlobal": 200
}
```

**Response de Sucesso - Insuficiente (200):**
```json
{
  "message": "Fundo insuficiente.",
  "valorNaoCoberto": 150
}
```

**O que acontece no banco:**

Se usar R$ 500 (R$ 300 da viagem + R$ 200 global):

1. **Atualiza Trip:**
   ```sql
   emergencyFund = emergencyFund - 300
   usedEmergencyFund = usedEmergencyFund + 300
   ```

2. **Atualiza User:**
   ```sql
   emergencyFund = emergencyFund - 200
   ```

3. **Cria FinancialOperation:**
   ```json
   {
     "type": "EMERGENCY_USAGE",
     "tripId": 1,
     "userId": 1,
     "amountTrip": 300,
     "amountGlobal": 200,
     "totalAmount": 500
   }
   ```

**Exemplo Prático:**

**Antes:**
- Orçamento: R$ 5.000
- Gasto: R$ 5.500
- Fundo da Viagem: R$ 300
- Fundo Global: R$ 2.000
- Excedente: R$ 500

**Depois de chamar o endpoint:**
- Fundo da Viagem: R$ 0 (usou R$ 300)
- Fundo Global: R$ 1.800 (usou R$ 200)
- usedEmergencyFund da viagem: R$ 300

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:3000/trip/1/usaremergencia
```

**IMPORTANTE:** Esta operação é uma **transação** - ou tudo acontece, ou nada acontece. Não há risco de atualizar uma tabela e falhar em outra.

---

## 💰 Endpoints de Despesas (Expense)

### 1. Criar Despesa

**Descrição:** Registra uma nova despesa em uma viagem.

**Método:** `POST`  
**Rota:** `/expense`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "description": "Almoço no restaurante Madalosso",
  "amount": 120.50,
  "category": "Alimentação",
  "date": "2026-06-14T13:30:00.000Z",
  "tripId": 1
}
```

**Campos:**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `description` | string | Sim | Descrição do gasto |
| `amount` | number | Sim | Valor gasto |
| `category` | string | Sim | Categoria do gasto |
| `date` | string (ISO) | Sim | Data/hora do gasto |
| `tripId` | number | Sim | ID da viagem |

**Validações:**
- `description` deve ser texto
- `amount` deve ser número positivo
- `category` deve ser texto
- `date` deve ser data válida
- `tripId` deve ser número e viagem deve existir

**Response de Sucesso (201):**
```json
{
  "id": 1,
  "description": "Almoço no restaurante Madalosso",
  "amount": 120.50,
  "category": "Alimentação",
  "date": "2026-06-14T13:30:00.000Z",
  "tripId": 1
}
```

**Response de Erro (400):**
```json
{
  "statusCode": 400,
  "message": "Viagem não encontrada.",
  "error": "Bad Request"
}
```

**Exemplo com cURL:**
```bash
curl -X POST http://localhost:3000/expense \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Almoço no restaurante Madalosso",
    "amount": 120.50,
    "category": "Alimentação",
    "date": "2026-06-14T13:30:00.000Z",
    "tripId": 1
  }'
```

---

### 2. Listar Despesas de uma Viagem

**Descrição:** Retorna todas as despesas de uma viagem específica.

**Método:** `GET`  
**Rota:** `/expense/:tripId`

**Parâmetros de URL:**
- `tripId` (number) → ID da viagem

**Response de Sucesso (200):**
```json
[
  {
    "id": 1,
    "description": "Almoço no restaurante Madalosso",
    "amount": 120.50,
    "category": "Alimentação",
    "date": "2026-06-14T13:30:00.000Z",
    "tripId": 1
  },
  {
    "id": 2,
    "description": "Táxi para o hotel",
    "amount": 45.00,
    "category": "Transporte",
    "date": "2026-06-13T20:15:00.000Z",
    "tripId": 1
  }
]
```

**Exemplo com cURL:**
```bash
curl http://localhost:3000/expense/1
```

---

## ☁️ Endpoints de Clima (Weather)

### 1. Clima de Curitiba em Junho (Dados Fixos)

**Descrição:** Retorna informações gerais sobre o clima de Curitiba em junho (dados estáticos/históricos).

**Método:** `GET`  
**Rota:** `/weather/curitiba/june`

**Parâmetros:** Nenhum

**Response (200):**
```json
{
  "city": "Curitiba",
  "month": "June",
  "averageTemperature": "10°C - 18°C",
  "rainProbability": "30% - 40%",
  "insight": "Junho em Curitiba costuma ser frio e relativamente seco, com menor volume de chuvas em comparação a outros meses."
}
```

**Caso de Uso:** Planejamento inicial de viagem.

**Exemplo com cURL:**
```bash
curl http://localhost:3000/weather/curitiba/june
```

---

### 2. Clima de Curitiba 13-18 de Junho (Dados Fixos)

**Descrição:** Retorna informações sobre um período específico de junho (dados estáticos/históricos).

**Método:** `GET`  
**Rota:** `/weather/curitiba/june/13-18`

**Parâmetros:** Nenhum

**Response (200):**
```json
{
  "city": "Curitiba",
  "period": "June 13–18",
  "averageTemperature": "9°C - 17°C",
  "rainyDaysEstimate": 2,
  "rainRiskLevel": "low-to-moderate",
  "insight": "Historicamente, o período entre 13 e 18 de junho apresenta poucos dias de chuva, sendo considerado um bom intervalo para passeios ao ar livre.",
  "recommendation": "Ideal para atividades externas como o trem turístico, especialmente no sábado."
}
```

**Caso de Uso:** Planejamento detalhado de atividades.

**Exemplo com cURL:**
```bash
curl http://localhost:3000/weather/curitiba/june/13-18
```

---

### 3. Clima Real de Curitiba em Junho (API Externa)

**Descrição:** Busca dados climáticos reais através da API Meteostat, analisa e retorna informações processadas.

**Método:** `GET`  
**Rota:** `/weather/curitiba/june/real`

**Parâmetros:** Nenhum

**API Externa Utilizada:**
- **Meteostat API** via RapidAPI
- Estação: 83842 (Curitiba)
- Período: Junho de 2024 (dados reais usados como base)

**Response (200):**
```json
{
  "cidade": "Curitiba",
  "período": "13–18 de junho",
  "temperatura_media": "12.5°C",
  "dias_com_chuva": 2,
  "risco_climatico": "médio",
  "melhor_dia_externo": "sábado, 15/06",
  "recomendação": "Alguns dias com risco de chuva, planeje passeios internos como alternativa."
}
```

**Classificação de Risco:**
- **baixo**: 0 dias com chuva
- **médio**: 1-2 dias com chuva
- **alto**: 3+ dias com chuva

**Como o melhor dia é escolhido:**
1. Dia com menos chuva (prioridade)
2. Se empate, dia com temperatura mais alta

**Configuração Necessária:**

Arquivo `.env`:
```
RAPIDAPI_KEY=sua_chave_aqui
```

**Exemplo com cURL:**
```bash
curl http://localhost:3000/weather/curitiba/june/real
```

**ATENÇÃO:** Este endpoint faz chamada para API externa e pode ter custo ou limite de requisições dependendo do plano da RapidAPI.

---

## 🚂 Endpoints de Trem (Train)

### 1. Disponibilidade do Trem Serra Verde

**Descrição:** Retorna informações sobre o trem turístico Serra Verde Express.

**Método:** `GET`  
**Rota:** `/train/serra-verde/june/13-18`

**Parâmetros:** Nenhum

**Response (200):**
```json
{
  "train": "Serra Verde Express",
  "route": "Curitiba → Morretes",
  "duration": "aprox. 4h",
  "operatesInJune": "only weekends",
  "recommendedDay": "Saturday",
  "weatherRisk": "low",
  "insight": "O trem turístico opera apenas aos finais de semana em junho. Com base no histórico climático, o sábado apresenta menor risco de chuva.",
  "recommendation": "Reserve o passeio para o sábado e evite a sexta-feira devido a maior chance de instabilidade."
}
```

**Informações Úteis:**
- O trem é um dos principais atrativos turísticos da região
- Passa por paisagens da Serra do Mar
- Operação limitada a finais de semana em junho

**Exemplo com cURL:**
```bash
curl http://localhost:3000/train/serra-verde/june/13-18
```

---

## 🏛️ Endpoints de Lugares (Places)

> **Nota:** Este módulo não possui endpoints HTTP diretos. Os serviços são usados internamente por outros módulos (como o Travel Planner).

**Métodos disponíveis no PlacesService:**

```typescript
getOutdoorPlaces(): string[]
getIndoorPlaces(): string[]
```

**Lugares Externos:**
- Jardim Botânico
- Parque Tanguá
- Ópera de Arame
- Parque Barigui

**Lugares Internos:**
- Museu Oscar Niemeyer
- Museu Paranaense
- Shopping Mueller

---

## 🗺️ Endpoints do Planejador de Viagens (Travel Planner)

### 1. Gerar Planejamento Completo

**Descrição:** Cria um planejamento completo de viagem integrando dados climáticos, sugestões de lugares e informações de transporte.

**Método:** `GET`  
**Rota:** `/planner`

**Query Parameters:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `city` | string | Sim | Nome da cidade |
| `stationId` | string | Sim | ID da estação meteorológica |
| `startDate` | string | Sim | Data inicial (YYYY-MM-DD) |
| `endDate` | string | Sim | Data final (YYYY-MM-DD) |

**Exemplo de URL:**
```
http://localhost:3000/planner?city=Curitiba&stationId=83842&startDate=2024-06-13&endDate=2024-06-18
```

**Response (200):**
```json
{
  "cidade": "Curitiba",
  "periodo": "2024-06-13 → 2024-06-18",
  "temperatura_media": "12.8°C",
  "dias_com_chuva": 2,
  "risco_climatico": "médio",
  "trem_turistico": {
    "train": "Serra Verde Express",
    "route": "Curitiba → Morretes",
    "duration": "aprox. 4h",
    "operatesInJune": "only weekends",
    "recommendedDay": "Saturday",
    "weatherRisk": "low",
    "insight": "O trem turístico opera apenas aos finais de semana em junho.",
    "recommendation": "Reserve o passeio para o sábado."
  },
  "dias": [
    {
      "data": "2024-06-13",
      "clima": "bom",
      "sugestoes": [
        "Jardim Botânico",
        "Parque Tanguá",
        "Ópera de Arame",
        "Parque Barigui"
      ]
    },
    {
      "data": "2024-06-14",
      "clima": "instável",
      "sugestoes": [
        "Museu Oscar Niemeyer",
        "Museu Paranaense",
        "Shopping Mueller"
      ]
    }
  ]
}
```

**Como Funciona:**

1. **Busca dados climáticos** através da API Meteostat
2. **Calcula médias** de temperatura
3. **Conta dias chuvosos**
4. **Classifica risco climático**:
   - baixo: 0 dias com chuva
   - médio: 1-2 dias com chuva
   - alto: 3+ dias com chuva
5. **Sugere lugares** por dia:
   - Dia bom (sem chuva) → Lugares externos
   - Dia instável (com chuva) → Lugares internos
6. **Inclui informações do trem** turístico

**Exemplo com cURL:**
```bash
curl "http://localhost:3000/planner?city=Curitiba&stationId=83842&startDate=2024-06-13&endDate=2024-06-18"
```

**Configuração Necessária:**

Arquivo `.env`:
```
RAPIDAPI_KEY=sua_chave_aqui
```

---

## 💵 Lógica Financeira

### Sistema de Fundos de Emergência

O sistema implementa um **sistema duplo de fundos de emergência**:

#### 1. Fundo Global do Usuário

- **Localização:** Tabela `User`, campo `emergencyFund`
- **Propósito:** Reserva financeira pessoal que pode ser usada em qualquer viagem
- **Escopo:** Global (todas as viagens)
- **Analogia:** É como uma poupança pessoal de emergência

**Exemplo:**
```
Usuário tem R$ 2.000 de fundo global
↓
Pode usar em qualquer viagem que precisar
```

#### 2. Fundo Específico da Viagem

- **Localização:** Tabela `Trip`, campo `emergencyFund`
- **Propósito:** Dinheiro extra reservado especificamente para aquela viagem
- **Escopo:** Local (apenas aquela viagem)
- **Analogia:** É como levar um "dinheiro extra" só para aquela viagem

**Exemplo:**
```
Viagem tem R$ 500 de fundo próprio
↓
Só pode ser usado nesta viagem
```

---

### Ordem de Uso dos Fundos

Quando você usa o endpoint `POST /trip/:id/usaremergencia`, o sistema segue esta ordem:

```
1. Calcula o excedente
   ↓
   Quanto foi gasto além do orçamento?
   
2. Tenta usar o fundo da viagem primeiro
   ↓
   Usa até esgotar ou cobrir o excedente
   
3. Se ainda não cobriu, usa o fundo global
   ↓
   Usa até esgotar ou cobrir o restante
   
4. Se ainda sobrou excedente
   ↓
   Informa que o fundo é insuficiente
```

**Exemplo Prático:**

**Situação:**
- Orçamento: R$ 5.000
- Gasto total: R$ 6.200
- Excedente: R$ 1.200
- Fundo da viagem: R$ 500
- Fundo global: R$ 2.000

**Processamento:**
```
Excedente = 1.200

1. Usar fundo da viagem:
   min(500, 1.200) = 500
   Restante = 1.200 - 500 = 700

2. Usar fundo global:
   min(2.000, 700) = 700
   Restante = 700 - 700 = 0

Resultado:
- Usou R$ 500 da viagem
- Usou R$ 700 do global
- Total coberto: R$ 1.200
```

---

### Cálculos Financeiros

O endpoint `GET /trip/:id/resumo` realiza diversos cálculos. Vamos entender cada um:

#### 1. Total Gasto

```typescript
const totalGasto = trip.expenses.reduce(
  (acc, expense) => acc + expense.amount,
  0
)
```

**O que faz:** Soma todas as despesas da viagem.

**Exemplo:**
```
Despesas:
- R$ 120 (almoço)
- R$ 80 (transporte)
- R$ 200 (hotel)
Total = R$ 400
```

---

#### 2. Gastos por Categoria

```typescript
const gastosPorCategoria = trip.expenses.reduce(
  (acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
    return acc
  },
  {}
)
```

**O que faz:** Agrupa gastos por categoria.

**Exemplo:**
```
Despesas:
- Almoço: R$ 120 (Alimentação)
- Jantar: R$ 80 (Alimentação)
- Táxi: R$ 50 (Transporte)
- Uber: R$ 30 (Transporte)

Resultado:
{
  "Alimentação": 200,
  "Transporte": 80
}
```

---

#### 3. Fundo Total Disponível

```typescript
const fundoTotalDisponivel = fundoTrip + fundoGlobal
```

**O que faz:** Soma os dois fundos de emergência.

**Exemplo:**
```
Fundo da viagem: R$ 500
Fundo global: R$ 2.000
Total disponível: R$ 2.500
```

---

#### 4. Limite Total Possível

```typescript
const limiteTotalPossivel = budget + fundoTotalDisponivel
```

**O que faz:** Calcula quanto você pode gastar no total (orçamento + fundos).

**Exemplo:**
```
Orçamento: R$ 5.000
Fundos disponíveis: R$ 2.500
Limite total: R$ 7.500
```

**Interpretação:** Você planejou gastar R$ 5.000, mas se necessário, tem mais R$ 2.500 de reserva, totalizando R$ 7.500.

---

#### 5. Saldo Restante Planejado

```typescript
const saldoRestantePlanejado = budget - totalGasto
```

**O que faz:** Quanto sobrou do orçamento planejado.

**Exemplo:**
```
Orçamento: R$ 5.000
Gasto: R$ 3.500
Saldo: R$ 1.500
```

**Interpretação:** Você ainda tem R$ 1.500 do seu orçamento original.

---

#### 6. Saldo Restante Total

```typescript
const saldoRestanteTotal = limiteTotalPossivel - totalGasto
```

**O que faz:** Quanto sobrou considerando tudo (orçamento + fundos).

**Exemplo:**
```
Limite total: R$ 7.500
Gasto: R$ 3.500
Saldo total: R$ 4.000
```

---

#### 7. Percentual Usado do Orçamento

```typescript
const percentualUsado = budget > 0
  ? Number(((totalGasto / budget) * 100).toFixed(2))
  : 0
```

**O que faz:** Calcula quantos % do orçamento você usou.

**Exemplo:**
```
Orçamento: R$ 5.000
Gasto: R$ 4.000
Percentual: (4.000 / 5.000) × 100 = 80%
```

---

#### 8. Percentual de Uso Total

```typescript
const percentualUsoTotal = limiteTotalPossivel > 0
  ? Number(((totalGasto / limiteTotalPossivel) * 100).toFixed(2))
  : 0
```

**O que faz:** Calcula quantos % do limite total você usou.

**Exemplo:**
```
Limite total: R$ 7.500
Gasto: R$ 4.000
Percentual: (4.000 / 7.500) × 100 = 53.33%
```

---

#### 9. Ultrapassou Orçamento?

```typescript
const ultrapassouOrcamento = totalGasto > budget
```

**O que faz:** Verifica se gastou mais que o planejado.

**Exemplo:**
```
Orçamento: R$ 5.000
Gasto: R$ 5.200
Ultrapassou: true
```

---

#### 10. Valor Excedente

```typescript
const valorExcedente = ultrapassouOrcamento
  ? Number((totalGasto - budget).toFixed(2))
  : 0
```

**O que faz:** Calcula quanto gastou além do orçamento.

**Exemplo:**
```
Orçamento: R$ 5.000
Gasto: R$ 5.200
Excedente: R$ 200
```

---

#### 11. Ainda Pode Cobrir com Fundo?

```typescript
const aindaPodeCobrirComFundo = valorExcedente <= fundoTotalDisponivel
```

**O que faz:** Verifica se os fundos cobrem o excedente.

**Exemplo 1 (Sim):**
```
Excedente: R$ 200
Fundos disponíveis: R$ 2.500
Pode cobrir: true
```

**Exemplo 2 (Não):**
```
Excedente: R$ 3.000
Fundos disponíveis: R$ 2.500
Pode cobrir: false
```

---

#### 12. Nível de Alerta

```typescript
let nivelAlerta: 'SEGURO' | 'ATENCAO' | 'CRITICO' = 'SEGURO'

if (totalGasto > limiteTotalPossivel) {
  nivelAlerta = 'CRITICO'
} else if (ultrapassouOrcamento) {
  nivelAlerta = 'ATENCAO'
}
```

**Classificação:**

| Situação | Nível | Descrição |
|----------|-------|-----------|
| Gasto ≤ Orçamento | SEGURO | Tudo sob controle |
| Orçamento < Gasto ≤ Limite Total | ATENCAO | Ultrapassou planejado, mas fundos cobrem |
| Gasto > Limite Total | CRITICO | Ultrapassou tudo |

**Exemplos:**

```
Caso 1: SEGURO
Orçamento: R$ 5.000
Gasto: R$ 3.000
Limite Total: R$ 7.500
→ Está dentro do orçamento

Caso 2: ATENCAO
Orçamento: R$ 5.000
Gasto: R$ 6.000
Limite Total: R$ 7.500
→ Ultrapassou orçamento, mas tem fundos

Caso 3: CRITICO
Orçamento: R$ 5.000
Gasto: R$ 8.000
Limite Total: R$ 7.500
→ Ultrapassou até os fundos
```

---

#### 13. Status Financeiro Final

```typescript
let statusFinanceiroFinal:
  | 'ESTAVEL'
  | 'USANDO_EMERGENCIA'
  | 'INSUSTENTAVEL' = 'ESTAVEL'

if (totalGasto > limiteTotalPossivel) {
  statusFinanceiroFinal = 'INSUSTENTAVEL'
} else if (ultrapassouOrcamento) {
  statusFinanceiroFinal = 'USANDO_EMERGENCIA'
}
```

**Estados:**

| Status | Significado |
|--------|-------------|
| ESTAVEL | Gastos dentro do orçamento planejado |
| USANDO_EMERGENCIA | Ultrapassou orçamento, pode usar fundos |
| INSUSTENTAVEL | Ultrapassou todos os recursos disponíveis |

---

#### 14. Recomendação Personalizada

```typescript
let recomendacao = 'Orçamento sob controle.'

if (totalGasto > limiteTotalPossivel) {
  recomendacao = 'Você ultrapassou inclusive o fundo de emergência disponível.'
} else if (ultrapassouOrcamento && aindaPodeCobrirComFundo) {
  recomendacao = 'Você ultrapassou o orçamento planejado. Pode optar por usar fundo de emergência.'
} else if (percentualUsado >= 80) {
  recomendacao = 'Atenção: você já utilizou mais de 80% do orçamento.'
}
```

**Regras:**

1. Se gastou além de tudo → Avisa que passou do limite
2. Se ultrapassou orçamento mas tem fundo → Sugere usar fundo
3. Se usou 80%+ do orçamento → Alerta para atenção
4. Caso contrário → Tudo sob controle

---

### Transações no Banco de Dados

O endpoint `POST /trip/:id/usaremergencia` usa **transações** do Prisma:

```typescript
return await this.prisma.$transaction(async (tx) => {
  // Todas as operações dentro desta função
  // Ou todas acontecem, ou nenhuma acontece
})
```

**Por que usar transações?**

Imagine se o sistema:
1. Atualizasse o fundo da viagem ✅
2. Falhasse ao atualizar o usuário ❌
3. Não criasse o registro histórico ❌

**Resultado:** Dados inconsistentes! O fundo da viagem foi debitado, mas o resto não.

**Com transações:**
- Todas as 3 operações acontecem, OU
- Nenhuma acontece (rollback automático)

**Propriedades ACID:**
- **A**tomicity: Tudo ou nada
- **C**onsistency: Dados sempre consistentes
- **I**solation: Transações isoladas entre si
- **D**urability: Mudanças permanentes após commit

---

## 📝 DTOs e Validações

### O que são DTOs?

**DTO** significa **Data Transfer Object** (Objeto de Transferência de Dados).

**Propósito:**
- Definir o formato dos dados que a API recebe
- Validar automaticamente os dados
- Documentar o que cada endpoint espera

---

### CreateTripDto

**Arquivo:** `src/trip/dto/create-trip.dto.ts`

```typescript
export class CreateTripDto {
  @IsString()
  title: string

  @IsString()
  destination: string

  @IsDateString()
  startDate: string

  @IsDateString()
  endDate: string

  @IsOptional()
  @IsNumber()
  budget?: number

  @IsNumber()
  userId: number
}
```

**Validações Aplicadas:**

| Campo | Decorador | O que valida |
|-------|-----------|--------------|
| `title` | `@IsString()` | Deve ser texto |
| `destination` | `@IsString()` | Deve ser texto |
| `startDate` | `@IsDateString()` | Deve ser data válida (ISO 8601) |
| `endDate` | `@IsDateString()` | Deve ser data válida (ISO 8601) |
| `budget` | `@IsOptional()` `@IsNumber()` | Opcional, mas se fornecido deve ser número |
| `userId` | `@IsNumber()` | Deve ser número |

**Exemplos de Validação:**

✅ **Válido:**
```json
{
  "title": "Viagem SP",
  "destination": "São Paulo",
  "startDate": "2026-07-01",
  "endDate": "2026-07-05",
  "budget": 3000,
  "userId": 1
}
```

❌ **Inválido (title não é string):**
```json
{
  "title": 12345,
  "destination": "São Paulo",
  ...
}
```

❌ **Inválido (data em formato errado):**
```json
{
  "title": "Viagem SP",
  "startDate": "01/07/2026",  // Formato errado
  ...
}
```

---

### CreateExpenseDto

**Arquivo:** `src/expense/dto/create-expense.dto.ts`

```typescript
export class CreateExpenseDto {
  @IsString()
  description: string

  @IsNumber()
  amount: number

  @IsString()
  category: string

  @IsDateString()
  date: string

  @IsNumber()
  tripId: number
}
```

**Validações Aplicadas:**

| Campo | Decorador | O que valida |
|-------|-----------|--------------|
| `description` | `@IsString()` | Deve ser texto |
| `amount` | `@IsNumber()` | Deve ser número |
| `category` | `@IsString()` | Deve ser texto |
| `date` | `@IsDateString()` | Deve ser data válida |
| `tripId` | `@IsNumber()` | Deve ser número |

**Exemplos de Validação:**

✅ **Válido:**
```json
{
  "description": "Almoço",
  "amount": 45.90,
  "category": "Alimentação",
  "date": "2026-06-14T12:30:00.000Z",
  "tripId": 1
}
```

❌ **Inválido (amount não é número):**
```json
{
  "description": "Almoço",
  "amount": "quarenta e cinco",
  ...
}
```

---

### Como a Validação Funciona

1. **Request chega no controller**
2. **NestJS intercepta** antes de chamar o método
3. **class-validator valida** o DTO
4. **Se inválido:** Retorna erro 400 automaticamente
5. **Se válido:** Chama o método do controller

**Configuração Global:**

No arquivo `main.ts`:
```typescript
app.useGlobalPipes(new ValidationPipe())
```

Isso ativa a validação automática em todos os endpoints.

---

### Tipos de Validadores Disponíveis

A biblioteca `class-validator` oferece muitos decoradores:

| Decorador | Validação |
|-----------|-----------|
| `@IsString()` | Deve ser string |
| `@IsNumber()` | Deve ser número |
| `@IsInt()` | Deve ser inteiro |
| `@IsBoolean()` | Deve ser boolean |
| `@IsEmail()` | Deve ser email válido |
| `@IsDateString()` | Deve ser data ISO 8601 |
| `@IsOptional()` | Campo opcional |
| `@IsNotEmpty()` | Não pode ser vazio |
| `@Min(valor)` | Número mínimo |
| `@Max(valor)` | Número máximo |
| `@MinLength(n)` | String com min n caracteres |
| `@MaxLength(n)` | String com max n caracteres |
| `@IsArray()` | Deve ser array |
| `@IsEnum(enum)` | Deve ser valor do enum |

---

## 🔄 Histórico de Migrations

As **migrations** são mudanças na estrutura do banco de dados. Cada migration representa uma evolução do schema.

### Migration 1: Init (27/02/2026)

**Arquivo:** `20260227202914_init/migration.sql`

**O que criou:**
- Tabela `User`
- Tabela `Trip`
- Tabela `Expense`
- Relacionamentos entre tabelas

**Resumo:**
Esta foi a migration inicial que criou a estrutura básica do banco.

**Estrutura Criada:**

```sql
User:
- id (PK, auto-increment)
- name
- email (UNIQUE)
- password
- createdAt

Trip:
- id (PK, auto-increment)
- title
- destination
- startDate
- endDate
- budget (nullable)
- userId (FK → User)
- createdAt

Expense:
- id (PK, auto-increment)
- description
- amount
- category
- date
- tripId (FK → Trip)
```

---

### Migration 2: Add Emergency Funds (28/02/2026)

**Arquivo:** `20260228004132_add_emergency_funds/migration.sql`

**O que adicionou:**
```sql
ALTER TABLE `Trip` ADD COLUMN `emergencyFund` DOUBLE NOT NULL DEFAULT 0;
ALTER TABLE `User` ADD COLUMN `emergencyFund` DOUBLE NOT NULL DEFAULT 0;
```

**Resumo:**
Adicionou o conceito de fundos de emergência tanto para usuários quanto para viagens.

**Mudanças:**
- User ganhou campo `emergencyFund`
- Trip ganhou campo `emergencyFund`
- Ambos com valor padrão 0

---

### Migration 3: Add Emergency Fields (28/02/2026)

**Arquivo:** `20260228010410_add_emergency_fields/migration.sql`

**O que adicionou:**
```sql
ALTER TABLE `Trip` ADD COLUMN `usedEmergencyFund` DOUBLE NOT NULL DEFAULT 0;
```

**Resumo:**
Adicionou rastreamento de quanto do fundo de emergência já foi usado em cada viagem.

**Mudanças:**
- Trip ganhou campo `usedEmergencyFund`
- Permite controlar o histórico de uso

---

### Migration 4: Add Financial Operations (28/02/2026)

**Arquivo:** `20260228032634_add_financial_operations/migration.sql`

**O que criou:**
```sql
CREATE TABLE `FinancialOperation` (
  id INT PK AUTO_INCREMENT,
  type VARCHAR(191) NOT NULL,
  tripId INT NOT NULL FK,
  userId INT NOT NULL FK,
  amountTrip DOUBLE DEFAULT 0,
  amountGlobal DOUBLE DEFAULT 0,
  totalAmount DOUBLE NOT NULL,
  createdAt DATETIME(3) DEFAULT NOW()
)
```

**Resumo:**
Criou tabela para registrar histórico detalhado de operações financeiras (uso de fundos de emergência).

**Mudanças:**
- Nova tabela `FinancialOperation`
- Relacionamento com `Trip` e `User`
- Rastreamento detalhado de valores

---

### Evolução do Schema

```
27/02/2026
├── User (básico)
├── Trip (básico)
└── Expense

28/02/2026 (manhã)
├── User + emergencyFund
├── Trip + emergencyFund
└── Expense

28/02/2026 (tarde)
├── User + emergencyFund
├── Trip + emergencyFund + usedEmergencyFund
└── Expense

28/02/2026 (noite)
├── User + emergencyFund
├── Trip + emergencyFund + usedEmergencyFund
├── Expense
└── FinancialOperation (NOVA)
```

---

### Comandos Prisma

**Criar nova migration:**
```bash
npx prisma migrate dev --name nome_da_migration
```

**Aplicar migrations:**
```bash
npx prisma migrate deploy
```

**Resetar banco (CUIDADO - apaga dados):**
```bash
npx prisma migrate reset
```

**Visualizar status:**
```bash
npx prisma migrate status
```

**Gerar Prisma Client:**
```bash
npx prisma generate
```

---

## 🎓 Conceitos Importantes

### 1. API REST

**O que é:**
API (Application Programming Interface) REST (Representational State Transfer) é um estilo de arquitetura para criar serviços web.

**Características:**
- Usa HTTP (mesmo protocolo dos sites)
- Stateless (sem estado entre requisições)
- Recursos identificados por URLs
- Operações usando métodos HTTP

**Métodos HTTP:**

| Método | Propósito | Exemplo |
|--------|-----------|---------|
| GET | Buscar dados | `GET /trip` lista viagens |
| POST | Criar recurso | `POST /trip` cria viagem |
| PUT | Atualizar completo | `PUT /trip/1` atualiza viagem |
| PATCH | Atualizar parcial | `PATCH /trip/1` atualiza campo |
| DELETE | Deletar | `DELETE /trip/1` remove viagem |

---

### 2. Status HTTP

**Códigos de Resposta:**

| Código | Significado | Quando Usar |
|--------|-------------|-------------|
| 200 | OK | Sucesso (GET, PUT, PATCH) |
| 201 | Created | Recurso criado (POST) |
| 204 | No Content | Sucesso sem retornar dados |
| 400 | Bad Request | Dados inválidos |
| 401 | Unauthorized | Não autenticado |
| 403 | Forbidden | Não autorizado |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Erro no servidor |

---

### 3. Injeção de Dependências

**O que é:**
Pattern onde classes recebem suas dependências externamente, em vez de criá-las.

**Sem Injeção (ruim):**
```typescript
class TripController {
  private service: TripService
  
  constructor() {
    this.service = new TripService() // Criar manualmente
  }
}
```

**Com Injeção (bom):**
```typescript
@Controller('trip')
class TripController {
  constructor(private readonly service: TripService) {}
  // NestJS injeta automaticamente
}
```

**Vantagens:**
- Facilita testes (pode injetar mocks)
- Desacoplamento (não depende da implementação)
- Reutilização de instâncias

---

### 4. Prisma Schema

**Sintaxe:**

```prisma
model NomeDoModelo {
  id        Int      @id @default(autoincrement())
  campo     String
  data      DateTime @default(now())
  opcional  String?  // ? indica opcional
  
  relacao   OutroModelo @relation(fields: [campoId], references: [id])
  campoId   Int
}
```

**Tipos de Dados:**

| Prisma | MySQL | TypeScript |
|--------|-------|------------|
| String | VARCHAR | string |
| Int | INT | number |
| Float | DOUBLE | number |
| Boolean | TINYINT(1) | boolean |
| DateTime | DATETIME | Date |

**Relacionamentos:**

```prisma
// Um para Muitos (1:N)
model User {
  id    Int    @id
  trips Trip[]
}

model Trip {
  id     Int  @id
  userId Int
  user   User @relation(fields: [userId], references: [id])
}
```

---

### 5. Async/Await

**O que é:**
Forma moderna de trabalhar com código assíncrono (que demora para executar).

**Por que usar:**
Operações de banco, APIs externas, leitura de arquivos são lentas. Não queremos bloquear a aplicação.

**Sintaxe:**

```typescript
async function buscarViagem(id: number) {
  const trip = await prisma.trip.findUnique({ where: { id } })
  return trip
}
```

**Exemplo Prático:**

```typescript
// ❌ Bloqueante (ruim)
function buscar() {
  const resultado = operacaoLenta() // Aplicação trava
  return resultado
}

// ✅ Não-bloqueante (bom)
async function buscar() {
  const resultado = await operacaoLenta() // Aplicação continua
  return resultado
}
```

---

### 6. Environment Variables (Variáveis de Ambiente)

**O que são:**
Configurações que mudam entre ambientes (desenvolvimento, produção).

**Arquivo `.env`:**
```
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
RAPIDAPI_KEY="sua_chave_secreta"
PORT=3000
```

**Como usar:**
```typescript
const apiKey = process.env.RAPIDAPI_KEY
```

**Por que usar:**
- Segurança (não commitar senhas no Git)
- Flexibilidade (mudar configs sem alterar código)
- Portabilidade (rodar em diferentes ambientes)

---

### 7. Módulos do NestJS

**Estrutura:**

```typescript
@Module({
  imports: [OutroModule],      // Módulos que este usa
  controllers: [MeuController], // Controllers deste módulo
  providers: [MeuService],      // Services deste módulo
  exports: [MeuService]         // O que este módulo exporta
})
export class MeuModule {}
```

**Exemplo Real:**

```typescript
@Module({
  imports: [PrismaModule],      // Usa Prisma
  controllers: [TripController], // Expõe endpoints de Trip
  providers: [TripService],      // Fornece TripService
  exports: [TripService]         // Outros módulos podem usar
})
export class TripModule {}
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

**Software Necessário:**
1. **Node.js** 18+ ([Download](https://nodejs.org))
2. **MySQL** 8+ ([Download](https://dev.mysql.com/downloads/))
3. **npm** ou **yarn** (vem com Node.js)
4. **Git** (opcional, para clonar repositório)

**Verificar instalação:**
```bash
node --version  # Deve mostrar v18 ou superior
npm --version   # Deve mostrar versão
mysql --version # Deve mostrar versão do MySQL
```

---

### Passo a Passo

#### 1. Clone o Repositório (ou acesse a pasta)

```bash
cd /Users/sarasales/Desktop/planner-viagem/backend
```

---

#### 2. Instale as Dependências

```bash
npm install
```

Isso instala todas as bibliotecas listadas no `package.json`.

---

#### 3. Configure o Banco de Dados

**Crie o banco no MySQL:**

```bash
mysql -u root -p
```

Dentro do MySQL:
```sql
CREATE DATABASE planner_viagem;
EXIT;
```

---

#### 4. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
touch .env
```

Adicione as seguintes variáveis:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/planner_viagem"
RAPIDAPI_KEY="sua_chave_rapidapi_aqui"
PORT=3000
```

**Substitua:**
- `usuario` → Seu usuário MySQL (geralmente `root`)
- `senha` → Sua senha MySQL
- `planner_viagem` → Nome do banco que criou
- `sua_chave_rapidapi_aqui` → Chave da RapidAPI (se for usar endpoints de clima real)

---

#### 5. Execute as Migrations

```bash
npx prisma migrate dev
```

Isso cria todas as tabelas no banco de dados.

---

#### 6. Gere o Prisma Client

```bash
npx prisma generate
```

Isso gera o código TypeScript para acessar o banco.

---

#### 7. Inicie o Servidor

**Modo Desenvolvimento (com hot-reload):**
```bash
npm run start:dev
```

**Modo Produção:**
```bash
npm run build
npm run start:prod
```

---

#### 8. Teste a API

O servidor estará rodando em `http://localhost:3000`

**Teste com navegador:**
```
http://localhost:3000
```

**Teste com cURL:**
```bash
curl http://localhost:3000
```

---

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev      # Inicia com hot-reload
npm run start:debug    # Inicia em modo debug

# Produção
npm run build          # Compila TypeScript
npm run start:prod     # Roda versão compilada

# Testes
npm run test           # Executa testes unitários
npm run test:watch     # Testes em modo watch
npm run test:cov       # Testes com cobertura
npm run test:e2e       # Testes end-to-end

# Qualidade de Código
npm run lint           # Verifica erros de lint
npm run format         # Formata código

# Prisma
npx prisma studio      # Abre interface visual do banco
npx prisma migrate dev # Cria/aplica migrations
npx prisma generate    # Gera Prisma Client
```

---

### Testando Endpoints

#### Criar Viagem:

```bash
curl -X POST http://localhost:3000/trip \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Teste",
    "destination": "Curitiba",
    "startDate": "2026-06-13",
    "endDate": "2026-06-18",
    "budget": 5000,
    "userId": 1
  }'
```

**Nota:** Antes de criar viagem, você precisa ter um usuário criado no banco. Você pode criar manualmente via Prisma Studio ou criando um endpoint de criação de usuário.

---

#### Criar Usuário (via Prisma Studio):

```bash
npx prisma studio
```

Isso abre uma interface web em `http://localhost:5555` onde você pode:
- Visualizar dados
- Criar registros manualmente
- Editar dados
- Deletar registros

**Crie um usuário:**
1. Abra a tabela `User`
2. Clique em "Add record"
3. Preencha:
   - name: "João Silva"
   - email: "joao@email.com"
   - password: "senha123" (em produção, criptografe!)
   - emergencyFund: 2000
4. Salve

Agora você tem um usuário com `id: 1` para usar nas viagens.

---

### Troubleshooting (Solucionando Problemas)

#### Erro: "Cannot connect to MySQL"

**Causa:** MySQL não está rodando ou credenciais erradas.

**Solução:**
```bash
# No Mac:
brew services start mysql

# Verificar se está rodando:
mysql -u root -p
```

---

#### Erro: "Table doesn't exist"

**Causa:** Migrations não foram executadas.

**Solução:**
```bash
npx prisma migrate dev
```

---

#### Erro: "Module not found"

**Causa:** Dependências não instaladas.

**Solução:**
```bash
npm install
```

---

#### Erro: "Port 3000 already in use"

**Causa:** Outra aplicação usando a porta 3000.

**Solução:**

Opção 1 - Mudar porta no `.env`:
```env
PORT=3001
```

Opção 2 - Matar processo na porta 3000:
```bash
lsof -ti:3000 | xargs kill -9
```

---

## 📊 Diagrama de Relacionamentos (ERD)

```
┌─────────────────────────────────────────────┐
│                    User                     │
├─────────────────────────────────────────────┤
│ PK  id              INT                     │
│     name            VARCHAR(191)            │
│     email           VARCHAR(191) UNIQUE     │
│     password        VARCHAR(191)            │
│     emergencyFund   DOUBLE (default: 0)     │
│     createdAt       DATETIME                │
└──────────────┬──────────────────────────────┘
               │
               │ 1:N
               │
┌──────────────▼──────────────────────────────┐
│                    Trip                     │
├─────────────────────────────────────────────┤
│ PK  id                 INT                  │
│     title              VARCHAR(191)         │
│     destination        VARCHAR(191)         │
│     startDate          DATETIME             │
│     endDate            DATETIME             │
│     budget             DOUBLE (nullable)    │
│     emergencyFund      DOUBLE (default: 0)  │
│     usedEmergencyFund  DOUBLE (default: 0)  │
│ FK  userId             INT                  │
│     createdAt          DATETIME             │
└──────────────┬──────────────────────────────┘
               │
               │ 1:N
               │
┌──────────────▼──────────────────────────────┐
│                  Expense                    │
├─────────────────────────────────────────────┤
│ PK  id            INT                       │
│     description   VARCHAR(191)              │
│     amount        DOUBLE                    │
│     category      VARCHAR(191)              │
│     date          DATETIME                  │
│ FK  tripId        INT                       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            FinancialOperation               │
├─────────────────────────────────────────────┤
│ PK  id             INT                      │
│     type           VARCHAR(191)             │
│ FK  tripId         INT                      │
│ FK  userId         INT                      │
│     amountTrip     DOUBLE (default: 0)      │
│     amountGlobal   DOUBLE (default: 0)      │
│     totalAmount    DOUBLE                   │
│     createdAt      DATETIME                 │
└─────────────────────────────────────────────┘
      │              │
      │              └──────────┐
      │                         │
      │ N:1                     │ N:1
      │                         │
      ▼                         ▼
    Trip                      User
```

---

## 🎯 Casos de Uso Completos

### Caso de Uso 1: Planejamento de Viagem Completo

**Cenário:** Maria quer planejar uma viagem para Curitiba.

**Passos:**

1. **Criar usuário** (via Prisma Studio ou endpoint futuro)
2. **Criar viagem:**
```bash
POST /trip
{
  "title": "Férias de Junho",
  "destination": "Curitiba",
  "startDate": "2026-06-13",
  "endDate": "2026-06-18",
  "budget": 3000,
  "userId": 1
}
```

3. **Obter planejamento climático:**
```bash
GET /planner?city=Curitiba&stationId=83842&startDate=2024-06-13&endDate=2024-06-18
```

4. **Verificar disponibilidade do trem:**
```bash
GET /train/serra-verde/june/13-18
```

---

### Caso de Uso 2: Registrando Despesas Durante a Viagem

**Cenário:** Maria está em Curitiba e registrando gastos.

**Dia 1 - Chegada:**
```bash
POST /expense
{
  "description": "Táxi do aeroporto ao hotel",
  "amount": 80.00,
  "category": "Transporte",
  "date": "2026-06-13T15:30:00Z",
  "tripId": 1
}
```

**Dia 2 - Passeios:**
```bash
POST /expense
{
  "description": "Ingresso Jardim Botânico",
  "amount": 25.00,
  "category": "Passeios",
  "date": "2026-06-14T10:00:00Z",
  "tripId": 1
}

POST /expense
{
  "description": "Almoço no Madalosso",
  "amount": 120.00,
  "category": "Alimentação",
  "date": "2026-06-14T13:00:00Z",
  "tripId": 1
}
```

**Dia 3 - Trem:**
```bash
POST /expense
{
  "description": "Passeio de trem Serra Verde",
  "amount": 250.00,
  "category": "Passeios",
  "date": "2026-06-15T08:00:00Z",
  "tripId": 1
}
```

---

### Caso de Uso 3: Monitoramento Financeiro

**Cenário:** Maria quer ver como está o orçamento.

**A qualquer momento:**
```bash
GET /trip/1/resumo
```

**Response mostra:**
- Quanto já gastou
- Quanto resta do orçamento
- % de uso do orçamento
- Gastos por categoria
- Alertas se necessário
- Fundos disponíveis

---

### Caso de Uso 4: Ultrapassando o Orçamento

**Cenário:** Maria teve gastos inesperados e ultrapassou o orçamento.

**Situação:**
- Orçamento: R$ 3.000
- Gasto total: R$ 3.500
- Fundo da viagem: R$ 500
- Fundo global: R$ 2.000

**Verificar situação:**
```bash
GET /trip/1/resumo
```

**Response mostra:**
```json
{
  "budget": 3000,
  "totalGasto": 3500,
  "ultrapassouOrcamento": true,
  "valorExcedente": 500,
  "nivelAlerta": "ATENCAO",
  "fundoTotalDisponivel": 2500,
  "aindaPodeCobrirComFundo": true,
  "recomendacao": "Você ultrapassou o orçamento planejado. Pode optar por usar fundo de emergência."
}
```

**Usar fundo de emergência:**
```bash
POST /trip/1/usaremergencia
```

**Response:**
```json
{
  "message": "Fundo utilizado com sucesso.",
  "usadoDaTrip": 500,
  "usadoDoGlobal": 0
}
```

**Verificar novamente:**
```bash
GET /trip/1/resumo
```

**Agora mostra:**
```json
{
  "statusFinanceiroFinal": "USANDO_EMERGENCIA",
  "usedEmergencyFund": 500,
  "totalOperacoesEmergencia": 1,
  "historicoEmergencia": [
    {
      "id": 1,
      "amountTrip": 500,
      "amountGlobal": 0,
      "totalAmount": 500,
      "createdAt": "2026-06-16T10:30:00Z"
    }
  ]
}
```

---

## 📱 Exemplos de Integração Frontend

### React/Next.js Exemplo

```typescript
// api/trips.ts
export async function createTrip(data: CreateTripDto) {
  const response = await fetch('http://localhost:3000/trip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export async function getTripSummary(tripId: number) {
  const response = await fetch(`http://localhost:3000/trip/${tripId}/resumo`)
  return response.json()
}

// Componente
function TripSummary({ tripId }: { tripId: number }) {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    getTripSummary(tripId).then(setSummary)
  }, [tripId])

  if (!summary) return <div>Carregando...</div>

  return (
    <div>
      <h2>{summary.title}</h2>
      <p>Orçamento: R$ {summary.budget}</p>
      <p>Gasto: R$ {summary.totalGasto}</p>
      <p>Percentual: {summary.percentualUsado}%</p>
      
      <ProgressBar value={summary.percentualUsado} />
      
      {summary.nivelAlerta === 'CRITICO' && (
        <Alert severity="error">{summary.recomendacao}</Alert>
      )}
      
      {summary.nivelAlerta === 'ATENCAO' && (
        <Alert severity="warning">{summary.recomendacao}</Alert>
      )}
    </div>
  )
}
```

---

## 🔒 Segurança (Recomendações)

**O que FALTA implementar para produção:**

1. **Autenticação:**
   - JWT (JSON Web Tokens)
   - Passport.js
   - Login/Logout
   - Proteção de rotas

2. **Autorização:**
   - Usuários só podem ver/editar suas próprias viagens
   - Guards do NestJS
   - Role-based access control (RBAC)

3. **Senha segura:**
   - bcrypt para hash de senhas
   - NUNCA armazenar senha em texto puro

4. **Rate Limiting:**
   - Limitar requisições por IP
   - Prevenir ataques DDoS

5. **CORS:**
   - Configurar quais origens podem acessar a API

6. **Validação adicional:**
   - Sanitização de inputs
   - Prevenir SQL Injection (Prisma já ajuda)
   - Prevenir XSS

7. **HTTPS:**
   - Em produção, SEMPRE use HTTPS
   - Certificado SSL

8. **Logging:**
   - Winston ou Pino
   - Monitorar erros e ações

---

## 📈 Melhorias Futuras Sugeridas

1. **Funcionalidades:**
   - Sistema de autenticação completo
   - Upload de fotos da viagem
   - Exportar viagem em PDF
   - Compartilhar viagem com outros usuários
   - Notificações (email/push)
   - Conversão de moedas
   - Sugestões de economia baseadas em IA

2. **Técnicas:**
   - Cache (Redis)
   - Paginação para listagens grandes
   - Filtros e ordenação
   - Search/busca textual
   - Soft delete (não deletar, marcar como deletado)
   - Auditoria (quem mudou o quê e quando)

3. **Integrações:**
   - Mais APIs de clima
   - APIs de voos
   - APIs de hotéis
   - Google Maps
   - Booking.com
   - TripAdvisor

4. **Performance:**
   - Índices no banco de dados
   - Query optimization
   - CDN para assets
   - Compressão de responses

---

## 📚 Recursos de Aprendizado

### Documentação Oficial

- **NestJS:** https://docs.nestjs.com
- **Prisma:** https://www.prisma.io/docs
- **TypeScript:** https://www.typescriptlang.org/docs
- **MySQL:** https://dev.mysql.com/doc

### Tutoriais Recomendados

- **NestJS Fundamentals:** https://courses.nestjs.com
- **Prisma Getting Started:** https://www.prisma.io/docs/getting-started
- **REST API Design:** https://restfulapi.net

---

## 🤝 Contribuindo

### Como Contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença **UNLICENSED** (conforme package.json).

---

## 💬 Suporte

Para dúvidas ou problemas:
1. Abra uma issue no GitHub
2. Consulte a documentação
3. Entre em contato com a equipe

---

## 🎉 Conclusão

Esta documentação cobriu **ABSOLUTAMENTE TUDO** sobre o projeto:

✅ Visão geral e propósito  
✅ Todas as tecnologias explicadas em detalhes  
✅ Arquitetura completa do sistema  
✅ Estrutura do banco de dados com exemplos  
✅ Todos os 8 módulos documentados  
✅ Todos os endpoints com exemplos cURL  
✅ Lógica financeira explicada passo a passo  
✅ DTOs e validações  
✅ Histórico completo de migrations  
✅ Conceitos importantes explicados  
✅ Guia completo de instalação  
✅ Casos de uso práticos  
✅ Exemplos de integração  
✅ Recomendações de segurança  
✅ Sugestões de melhorias  

**Este projeto é um sistema completo de planejamento de viagens com:**
- Gestão de viagens e despesas
- Sistema financeiro inteligente com fundos de emergência
- Integração com APIs de clima
- Recomendações personalizadas
- Análise financeira detalhada

Tudo construído com as melhores práticas de desenvolvimento, arquitetura limpa, e tecnologias modernas.

---

**Última Atualização:** 28 de Fevereiro de 2026  
**Versão da Documentação:** 1.0.0
