# API de Faturamento

API desenvolvida para otimizar os processos de consulta de dados do setor de Faturamento, resolvendo a necessidade de buscas manuais em documentos médicos.

---

##  sobre o Projeto

Este projeto consiste na criação de uma API RESTful para gerenciar os dados de pacientes e seus atendimentos médicos. A principal motivação foi automatizar a busca por informações específicas, como pacientes que tiveram a glicemia aferida durante a triagem, para facilitar o processo de lançamento de faturas.

---

## 🚀 Tecnologias Utilizadas

* **Backend:** Node.js, Express.js
* **Banco de Dados:** MySQL
* **Ferramentas de Desenvolvimento:** Nodemon, Postman

---

## ⚙️ Funcionalidades Implementadas

Atualmente, a API possui as seguintes funcionalidades de CRUD (Create, Read, Update, Delete) e relatórios:

* **Pacientes:**
    * `GET /pacientes`: Lista todos os pacientes.
    * `GET /pacientes/:id`: Busca um paciente por ID.
    * `POST /pacientes`: Cadastra um novo paciente.
    * `PUT /pacientes/:id`: Atualiza um paciente existente.
    * `DELETE /pacientes/:id`: Deleta um paciente.

* **Atendimentos:**
    * `GET /atendimentos`: Lista todos os atendimentos.
    * `GET /atendimentos/:id`: Busca um atendimento por ID.
    * `POST /atendimentos`: Cadastra um novo atendimento.
    * `PUT /atendimentos/:id`: Atualiza um atendimento existente.
    * `DELETE /atendimentos/:id`: Deleta um atendimento.

* **Relatórios:**
    * `GET /relatorios/pacientes-glicemia-triagem`: Gera um relatório específico de pacientes com glicemia aferida na triagem.

---

## ▶️ Como Rodar o Projeto Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/MiguelMotaAbreu/api-faturamento.git

# 2. Navegue até a pasta do projeto
cd api-faturamento

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
npx nodemon src/server.js

# A API estará rodando em http://localhost:3000