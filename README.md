# 📚 RespondeAI Exercise Generator Service

🚀 **RespondeAI Exercise Generator Service** é um microserviço que utiliza inteligência artificial para gerar exercícios de múltipla escolha com base em um assunto e ano letivo fornecidos. Ele também permite listar exercícios pendentes associados a um professor.

---

## 🧠 Inspirado por
### Esse projeto faz parte do ecossistema RespondeAI, focado em soluções educacionais assistidas por IA
---

## 🛠️ Funcionalidades

- **Geração de Exercícios**: Gera questões de múltipla escolha com base em um assunto e ano letivo fornecidos.
- **Armazenamento**: Salva os exercícios gerados no banco de dados com o status inicial `"pendente"`.
- **Listagem de Exercícios Pendentes**: Permite listar exercícios pendentes associados a um professor autenticado.
- **Validação de Dados**: Garante que os dados fornecidos nas requisições estejam no formato correto.
- **Autenticação**: Integração com Firebase para autenticação de professores.
- **Documentação**: API documentada com Swagger, acessível via `/api-docs`.

---
## 📌 Status dos Exercícios
### Os exercícios possuem os seguintes status:
- **Pendente**: exercício gerado, aguardando aprovação

- **Aprovado**: exercício validado e pronto para ser exibido aos alunos

- **Rejeitado**: exercício rejeitado pelo professor ou sistema de revisão

---

## 📁 Estrutura de Pastas
### respondeai-exercise-generator-service/
 - **├── .env.example** # Exemplo de variáveis de ambiente
 - **├── README.md** # Documentação do projeto
 - **├── server.js** # Configuração principal do servidor
 - **├── src/**
 - **│ ├── tests/** # Testes automatizados
 - **│ │ ├── controllers/** # Testes dos controladores
 - **│ │ ├── middlewares/** # Testes dos middlewares
 - **│ │ ├── services/** # Testes dos serviços
 - **│ ├── config/** # Configurações do projeto
 - **│ │ ├── db.js** # Configuração do banco de dados
 - **│ │ ├── firebase.js** # Configuração do Firebase
 - **│ │ ├── jest.config.js** # Configuração do Jest
 - **│ │ ├── swaggerConfig.js** # Configuração do Swagger
 - **│ ├── controllers/** # Controladores da API
 - **│ ├── middlewares/** # Middlewares de autenticação e validação
 - **│ ├── models/** # Modelos do banco de dados (Mongoose)
 - **│ ├── routes/** # Definição das rotas da API
 - **│ ├── services/** # Serviços de integração externa (ex: Gemini)
---

## ✅ Pré-requisitos

- Node.js >= 18
- Docker (para MongoDB local)
- Conta no Firebase com acesso ao Admin SDK
- API Key do modelo Gemini da Google (caso não utilize o OpenAI)

---
## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/respondeai-exercise-generator-service.git

# Acesse a pasta do projeto
cd respondeai-exercise-generator-service

# Instale as dependências
npm install

# Copie o exemplo de variáveis de ambiente
cp .env.example .env

# Suba o MongoDB com Docker (caso não tenha um serviço próprio)
docker run -d --name mongodb -p 27017:27017 mongo

# Inicie o servidor
npm start

## 🔐 Variáveis de Ambiente
Configure o arquivo .env com as seguintes variáveis:
```
## 🔐 Variáveis de Ambiente
### Configure o arquivo .env com as seguintes variáveis:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/exercise-generator
FIREBASE_CREDENTIALS_PATH=./respondeai-xxx-firebase-adminsdk-xxx.json
GEMINI_API_KEY=sua_api_key_do_gemini
```

## 🧪 Rodando os Testes
```bash
npm test
```

## 📄 Documentação Swagger
### Acesse a documentação da API:
```bash
http://localhost:3000/api-docs
```




