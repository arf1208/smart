-- 1. Buat Database di phpMyAdmin (misal: smart_school)
-- 2. Import file ini

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Contoh Akun Default (Password: password123)
INSERT INTO `users` (`name`, `email`, `password`) VALUES
('Admin Smart School', 'admin@smartschool.id', 'password123'),
('Guru Inovatif', 'guru@sekolah.com', 'guru2026');
