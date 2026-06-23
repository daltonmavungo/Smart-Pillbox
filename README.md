<div align="center">

# Smart Pillbox

### Sistema inteligente de gestão de medicamentos

[![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)](https://www.mysql.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## Sobre o Projeto

O **Smart Pillbox** é uma aplicação web fullstack desenvolvida para facilitar a gestão de medicamentos de pacientes. O sistema permite que profissionais de saúde registem pacientes, criem receitas, controlem medicamentos e recebam alertas automáticos por e-mail sobre os eventos de toma de medicação.

> Projeto desenvolvido como parte do meu portfólio pessoal, demonstrando competências em desenvolvimento fullstack com tecnologias modernas.

---

## Funcionalidades

- Autenticação segura com JWT
- Gestão de pacientes — registo, edição e listagem
- Gestão de medicamentos — cadastro e controlo de stock
- Receitas médicas — criação e associação a pacientes
- Eventos de medicação — registo e acompanhamento de tomas
- Alertas por e-mail — notificações automáticas via Gmail
- Dashboard — visão geral do sistema

---

## Tecnologias Utilizadas

### Backend

| Tecnologia | Versão | Descrição |
|---|---|---|
| Java | 17 | Linguagem principal |
| Spring Boot | 3.x | Framework backend |
| Spring Security | 6.x | Autenticação e autorização |
| Spring Data JPA | 3.x | Persistência de dados |
| MySQL | 8.0 | Base de dados relacional |
| JWT | — | Tokens de autenticação |
| JavaMailSender | — | Envio de e-mails |
| Maven | 3.x | Gestão de dependências |

### Frontend

| Tecnologia | Versão | Descrição |
|---|---|---|
| React | 18 | Framework de UI |
| Vite | 4.x | Bundler e servidor de desenvolvimento |
| Tailwind CSS | 3.x | Estilização utilitária |
| Axios | — | Requisições HTTP |
| React Router | — | Navegação entre páginas |

---

## Estrutura do Projeto

\`\`\`
smartpillbox-monorepo/
│
├── backend/
│   └── smartpillbox/
│       ├── src/main/java/com/smartpillbox/
│       │   ├── controller/        # Endpoints REST
│       │   ├── service/           # Lógica de negócio
│       │   ├── repository/        # Acesso à base de dados
│       │   ├── entity/            # Entidades JPA
│       │   ├── dto/               # Objetos de transferência
│       │   ├── security/          # Filtros JWT
│       │   ├── config/            # Configurações Spring
│       │   └── enums/             # Enumerações
│       └── src/main/resources/
│           └── application.properties.example
│
└── frontend/
    └── frontend/
        └── src/
            ├── pages/
            │   ├── auth/
            │   ├── dashboard/
            │   ├── pacientes/
            │   ├── medicamentos/
            │   ├── receitas/
            │   └── eventos/
            ├── components/
            ├── context/
            └── services/
\`\`\`

---

## Como Instalar e Correr

### Pre-requisitos

- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven 3.x

### 1. Clonar o repositorio

\`\`\`bash
git clone https://github.com/daltonmavungo/SmartPillbox1.git
cd SmartPillbox1
\`\`\`

### 2. Configurar a base de dados

\`\`\`bash
mysql -u root -p < backend/smartpillbox/setup-database.sql
\`\`\`

### 3. Configurar o Backend

\`\`\`bash
cp backend/smartpillbox/src/main/resources/application.properties.example backend/smartpillbox/src/main/resources/application.properties
\`\`\`

Edita o ficheiro \`application.properties\` com as tuas credenciais e executa:

\`\`\`bash
cd backend/smartpillbox
mvn spring-boot:run
\`\`\`

### 4. Configurar o Frontend

\`\`\`bash
cd frontend/frontend
npm install
npm run dev
\`\`\`

---

## Seguranca

- Senhas encriptadas com BCrypt
- Autenticacao via JWT com expiracao configuravel
- O ficheiro application.properties esta no .gitignore e nunca e enviado para o repositorio
- Variaveis sensiveis sao configuradas apenas localmente

---

## Autor

**Dalton Mavungo**

[![GitHub](https://img.shields.io/badge/GitHub-daltonmavungo-181717?style=flat&logo=github)](https://github.com/daltonmavungo)
[![Email](https://img.shields.io/badge/Email-josedalton258@gmail.com-red?style=flat&logo=gmail)](mailto:josedalton258@gmail.com)

