
# 🧠 RespondeAI Exercise Generator Service

[![Documentação Swagger](https://img.shields.io/badge/Swagger-Documentação-green?logo=swagger)](http://localhost:3000/api-docs)

🚀 **RespondeAI Exercise Generator Service** é um microserviço responsável por gerar automaticamente exercícios de múltipla escolha com o auxílio de IA (Gemini), com base em um assunto, ano letivo e quantidade definidos pelo professor.

---

## 🧠 Inspirado por

Esse projeto faz parte do ecossistema **RespondeAI**, focado em soluções educacionais assistidas por IA.

---

## 🛠️ Funcionalidades

- **Geração automática de questões com IA (Gemini)**
- **Salvamento de cada exercício com status 'pendente'**
- **Associação automática do professor autenticado (Firebase)**
- **Listagem de exercícios pendentes por professor**
- **Filtros opcionais por assunto e ano letivo**
- **Validação e autenticação centralizadas**
- **Documentação via Swagger**

---

## 📁 Estrutura de Pastas

```
respondeai-exercise-generator-service/
├── .env.example               # Exemplo de variáveis de ambiente
├── README.md                  # Documentação do projeto
├── server.js                  # Inicialização do servidor
└── src/
    ├── config/                # Conexão com MongoDB e Firebase
    ├── controllers/           # Lógica de negócio (gerar e listar exercícios)
    ├── models/                # Modelo do Exercise
    ├── routes/                # Rotas da API
    ├── services/              # Integração com Gemini
    ├── middlewares/           # Autenticação e validação
    └── swaggerDocs/           # Documentação Swagger centralizada
```

---

## ✅ Pré-requisitos

- Node.js >= 18
- MongoDB Atlas (recomendado) ou local
- Conta na API Gemini (Google Generative AI)
- Firebase Admin SDK

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/respondeai-exercise-generator-service.git

# Acesse a pasta
cd respondeai-exercise-generator-service

# Instale as dependências
npm install

# Copie o exemplo de variáveis de ambiente
cp .env.example .env

# Inicie o servidor
npm start
```

---

## 🔐 Variáveis de Ambiente

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/respondeai_exercises
GEMINI_API_KEY=sua_chave_gemini
FIREBASE_CREDENTIALS_PATH=./respondeai-firebase-adminsdk.json
```

---

## 📄 Endpoints Úteis

| Método | Rota                           | Descrição                                           |
|--------|--------------------------------|-----------------------------------------------------|
| POST   | /api/exercicios/generate       | Gera exercícios com IA e salva no banco             |
| GET    | /api/exercicios/pendente       | Lista exercícios com status 'pendente' do professor |

---

## 📘 Swagger - Documentação Técnica da API

A API do RespondeAI Exercise Generator Service é documentada com Swagger (OpenAPI 3.0).

### 🔗 Acesse via navegador:
```
http://localhost:3000/api-docs
```

### ✨ O que está documentado:

- Geração de exercícios com IA
- Listagem de exercícios pendentes
- Autenticação e validação por middleware

Essa interface permite:
- Visualizar e testar os endpoints
- Validar formatos de entrada e saída
- Facilitar integração com outros serviços e frontends

> Ideal para devs, testers e integração contínua.
