-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2023 a las 21:01:04
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appesi`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `age` int(2) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `permissions` varchar(10) DEFAULT 'read',
  `rol` varchar(15) DEFAULT 'user',
  `date_Created` date NOT NULL,
  `last_entry` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `email`, `age`, `is_active`, `permissions`, `rol`, `date_Created`, `last_entry`) VALUES
(1, 'facu@gmail.com', 15, 1, 'read', 'user', '2023-05-06', '2023-05-06'),
(2, 'holamundo@gmail.com', 18, 1, 'read', 'user', '2023-05-06', '2023-05-06');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


/*

-- Table structure for table `juegos`

DROP TABLE IF EXISTS `juegos`;

CREATE TABLE `juegos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` char(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) 
-- Table structure for table `participations`

DROP TABLE IF EXISTS `participations`;

CREATE TABLE `participations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jugador_id` int(11) DEFAULT NULL,
  `juego_id` int(11) DEFAULT NULL,
  `status` char(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jugador_id` (`jugador_id`),
  KEY `juego_id` (`juego_id`),
  CONSTRAINT `participations_ibfk_1` FOREIGN KEY (`jugador_id`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `participations_ibfk_2` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`id`)
) 

-- Table structure for table `usuarios`

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `status` char(255) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) 
*/