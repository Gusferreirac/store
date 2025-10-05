## Como Rodar o Projeto (Backend)

### Pré-requisitos
- **Node.js** (versão LTS)
- **Docker** e **Docker Compose**

### Passos

1.  **Entre na pasta do projeto:**
    ```bash
    cd store/store-api
    ```

2.  **Configure as variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.

3.  **Inicie o banco de dados com Docker:**
    Este comando irá criar e iniciar o contêiner do PostgreSQL em segundo plano.
    ```bash
    docker-compose up -d
    ```

4.  **Gere o banco de dados:**
    Este comando irá criar as tabelas no banco de dados com base no seu `schema.prisma`.
    ```bash
    npx prisma db push
    ```

5.  **Instale as dependências da aplicação:**
    ```bash
    npm install
    ```

6.  **Execute a aplicação:**
    ```bash
    npm run start:dev
    ```

A API estará disponível em `http://localhost:3000/`. A documentação (Swagger) pode ser acessada em `http://localhost:3000/api`.
