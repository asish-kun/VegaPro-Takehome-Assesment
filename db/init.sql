CREATE DATABASE IF NOT EXISTS task_manager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE task_manager;

CREATE TABLE IF NOT EXISTS tasks (
  id           CHAR(36) PRIMARY KEY,                      -- UUID format
  title        TEXT NOT NULL,
  description  TEXT,
  priority     ENUM('low', 'medium', 'high', 'none') DEFAULT 'none',
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
