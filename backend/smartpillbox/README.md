# 🏥 Smart Pillbox - Backend

## Pré-requisitos
- Java 17+
- Maven 3.8+
- PostgreSQL 14+

---

## ⚡ Como Executar

### 1. Criar a base de dados PostgreSQL
```sql
CREATE DATABASE smartpillbox;
```

### 2. Configurar credenciais
Edita o ficheiro `src/main/resources/application.properties`:
```properties
spring.datasource.username=SEU_USUARIO_POSTGRES
spring.datasource.password=SUA_SENHA_POSTGRES

spring.mail.username=seu_email@gmail.com
spring.mail.password=sua_senha_de_app_gmail
```

> **Gmail:** Para gerar senha de app: Conta Google → Segurança → Verificação em 2 etapas → Senhas de app

### 3. Compilar e executar
```bash
mvn clean install -DskipTests
mvn spring-boot:run
```

A API estará disponível em: `http://localhost:8080/api`

---

## 📡 Endpoints da API

### Autenticação
| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/registrar` | Registar utilizador |

### Pacientes
| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/api/pacientes` | Listar todos |
| GET | `/api/pacientes/{id}` | Buscar por ID |
| GET | `/api/pacientes/buscar?nome=X` | Buscar por nome |
| POST | `/api/pacientes` | Criar paciente |
| PUT | `/api/pacientes/{id}` | Actualizar |
| DELETE | `/api/pacientes/{id}` | Desactivar |

### Medicamentos
| Método | URL | Descrição |
|--------|-----|-----------|
| GET | `/api/medicamentos` | Listar todos |
| GET | `/api/medicamentos/buscar?nome=X` | Buscar por nome |
| POST | `/api/medicamentos` | Criar |
| PUT | `/api/medicamentos/{id}` | Actualizar |
| DELETE | `/api/medicamentos/{id}` | Remover |

### Receitas
| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/api/receitas` | Criar receita |
| GET | `/api/receitas/{id}` | Buscar por ID |
| GET | `/api/receitas/paciente/{id}` | Receitas do paciente |
| PUT | `/api/receitas/{id}` | Actualizar |
| DELETE | `/api/receitas/{id}` | Desactivar |

### Eventos (ESP32)
| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/api/eventos/confirmar/{pacienteId}/{compartimento}` | Confirmar abertura da caixa |
| GET | `/api/eventos/paciente/{id}` | Listar eventos |
| GET | `/api/eventos/historico/{id}?inicio=...&fim=...` | Histórico por período |

---

## 🔐 Autenticação

Todos os endpoints (excepto `/api/auth/**`) requerem token JWT no header:
```
Authorization: Bearer <token>
```

### Perfis de acesso
| Role | Permissões |
|------|-----------|
| ADMIN | Acesso total |
| MEDICO | Criar/editar pacientes, receitas, medicamentos |
| FAMILIAR | Visualizar pacientes e eventos |
| PACIENTE | Visualizar próprios dados |

---

## 🔌 Integração ESP32

A caixa física comunica com o backend via HTTP REST:

```cpp
// Quando a caixa é inclinada (compartimento MANHA do paciente 1):
POST http://SEU_IP:8080/api/eventos/confirmar/1/MANHA
```

Compartimentos disponíveis: `MANHA`, `ALMOCO`, `TARDE`, `NOITE`

---

## ⚙️ Lógica de Alertas

- A cada **1 minuto** o sistema verifica eventos pendentes
- Se um evento não for confirmado em **30 minutos**, o status muda para `ESQUECIDO`
- Um email de alerta é enviado automaticamente para o familiar cadastrado

---

## 🏗️ Arquitectura

```
smartpillbox/
├── controller/      → Endpoints REST
├── service/         → Lógica de negócio
│   └── impl/        → Implementações
├── repository/      → Acesso a dados (JPA)
├── entity/          → Modelos da base de dados
├── dto/
│   ├── request/     → Dados de entrada
│   └── response/    → Dados de saída
├── security/        → JWT Filter
├── config/          → Spring Security Config
├── exception/       → Tratamento de erros
├── enums/           → Enumerações
└── util/            → Utilitários (JWT)
```
