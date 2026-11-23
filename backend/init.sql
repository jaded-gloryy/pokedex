-- 1. Create the database
CREATE DATABASE pokemon_db;

-- 2. Switch context to the new database
USE pokemon_db;

-- 3. Initialize your tables
CREATE TABLE pokemon (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    imageUrl TEXT,
    types JSONB,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
