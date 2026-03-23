-- Database untuk Smart School
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

INSERT INTO users (email, username, password, name) VALUES 
('admin@smartschool.id', 'admin', 'password123', 'Admin Smart School'),
('admin', 'admin', 'admin', 'Admin (Shortcut)'),
('adminsmartschool@', 'adminsmartschool@', 'adminsmartschool@', 'Pemilik Smart School'),
('guru@sekolah.com', 'guru', 'guru2026', 'Guru Inovatif');
