-- =============================================
-- SMART PILLBOX - Setup da Base de Dados
-- Execute no PostgreSQL antes de arrancar
-- =============================================

-- 1. Criar base de dados
CREATE DATABASE smartpillbox;

-- 2. Conectar à base de dados
\c smartpillbox;

-- As tabelas são criadas automaticamente pelo Hibernate (ddl-auto=update)
-- Apenas insere o utilizador admin inicial após o primeiro arranque:

-- Após arrancar a aplicação, regista o admin via API:
-- POST http://localhost:8080/api/auth/registrar
-- {
--   "nome": "Administrador",
--   "email": "admin@smartpillbox.com",
--   "senha": "admin123",
--   "role": "ADMIN"
-- }
