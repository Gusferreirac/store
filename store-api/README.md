## Como Rodar o Projeto (Backend)

### Pré-requisitos
- **Node.js** (versão LTS)
- **Docker** e **Docker Compose**

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO_BACKEND>
    ```

2.  **Entre na pasta do projeto:**
    ```bash
    cd <NOME_DA_PASTA>
    ```

3.  **Configure as variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.

4.  **Inicie o banco de dados com Docker:**
    Este comando irá criar e iniciar o contêiner do PostgreSQL em segundo plano.
    ```bash
    docker-compose up -d
    ```

5.  **Gere o banco de dados:**
    Este comando irá criar as tabelas no banco de dados com base no seu `schema.prisma`.
    ```bash
    npx prisma db push
    ```

6.  **Instale as dependências da aplicação:**
    ```bash
    npm install
    ```

7.  **Execute a aplicação:**
    ```bash
    npm run start:dev
    ```

A API estará disponível em `http://localhost:3000/`. A documentação (Swagger) pode ser acessada em `http://localhost:3000/api`.