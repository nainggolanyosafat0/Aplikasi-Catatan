-- =========================================
-- Database : fitness_app
-- Aplikasi : Buka Catatan Saya
-- Author   : Aplikasi Website
-- =========================================

-- Buat database
CREATE DATABASE IF NOT EXISTS fitness_app;
USE fitness_app;

-- ==============================
-- TABEL FOLDERS
-- ==============================
CREATE TABLE folders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==============================
-- TABEL NOTES
-- ==============================
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    folder_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (folder_id) REFERENCES folders(id) ON DELETE CASCADE
);

-- ==============================
-- DATA AWAL (DEFAULT)
-- ==============================

INSERT INTO folders (name, code) VALUES
('Catatan 1', 'C1'),
('Catatan 2', 'C2'),
('Catatan 3', 'C3'),
('Catatan 4', 'C4'),
('Catatan 5', 'C5'),
('Catatan 6', 'C6'),
('Catatan 7', 'C7');

INSERT INTO notes (folder_id, title, content) VALUES
(1, 'Catatan 8', 'Ini adalah contoh isi catatan pertama.'),
(1, 'Catatan 8', 'Ini adalah contoh isi catatan kedua.');
