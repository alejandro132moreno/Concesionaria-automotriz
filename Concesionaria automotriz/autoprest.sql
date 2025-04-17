-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-04-2025 a las 21:21:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `autoprest`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `catalogo`
--

CREATE TABLE `catalogo` (
  `id` int(11) NOT NULL,
  `Marca` varchar(50) DEFAULT NULL,
  `Modelo` varchar(50) DEFAULT NULL,
  `Anio` int(11) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `Condicion` varchar(50) DEFAULT NULL,
  `Transmision` varchar(50) DEFAULT NULL,
  `Combustible` varchar(50) DEFAULT NULL,
  `Kilometraje` int(11) DEFAULT NULL,
  `Color` varchar(50) DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  `Precio` int(11) DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `NombreVendedor` varchar(100) NOT NULL,
  `TelefonoVendedor` varchar(20) NOT NULL,
  `Acesorios` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `catalogo`
--

INSERT INTO `catalogo` (`id`, `Marca`, `Modelo`, `Anio`, `Tipo`, `Condicion`, `Transmision`, `Combustible`, `Kilometraje`, `Color`, `Imagen`, `Precio`, `Descripcion`, `NombreVendedor`, `TelefonoVendedor`, `Acesorios`, `createdAt`, `updatedAt`) VALUES
(1, 'Toyota', 'Corolla', 2020, 'Sedán', 'Usado', 'Automática', 'Gasolina', 35000, 'Blanco', 'carro1.jpg', 18500, 'Excelente estado, un solo dueño, mantenimiento al día', 'Juan Pérez', '4651040053', '', '2025-04-11 17:23:26', '2025-04-11 17:30:02'),
(2, 'Honda', 'CR-V', 2022, 'SUV', 'Nuevo', 'Automática', 'Híbrido', 0, 'Negro', 'carro2.jpg', 32000, 'Modelo totalmente nuevo con garantía de fábrica', 'María García', '4651040053', '', '2025-04-11 17:23:26', '2025-04-11 17:30:02'),
(3, 'Ford', 'F-150', 2018, 'Pickup', 'Usado', 'Automática', 'Diésel', 78000, 'Rojo', 'carro3.jpg', 27500, 'Truck en muy buen estado, lista para trabajo', 'Carlos López', '4651040053', '', '2025-04-11 17:23:26', '2025-04-11 17:30:02'),
(4, 'Volkswagen', 'Golf', 2019, 'Compacto', 'Seminuevo', 'Manual', 'Gasolina', 24500, 'Azul', 'carro4.jpg', 16800, 'Versión GTI, equipamiento premium', 'Ana Martínez', '4651040053', '', '2025-04-11 17:23:26', '2025-04-11 17:30:02'),
(5, 'Chevrolet', 'Spark', 2021, 'Subcompacto', 'Usado', 'Manual', 'Gasolina', 42000, 'Plateado', 'carro5.jpg', 9500, 'Económico, bajo consumo de combustible', 'Luis Rodríguez', '4651040053', '', '2025-04-11 17:23:26', '2025-04-11 17:30:02'),
(13, 'Toyota', 'Hilux', 2022, 'Camioneta', 'Nuevo', 'Automática', 'Gasolina', 15000, 'Gris', 'chuylux.jpeg', 250000, 'Automóvil seminuevo en excelentes condiciones, único dueño', 'Chuylux', '4651040053', '', '2025-04-11 17:57:10', '2025-04-11 17:57:10'),
(14, 'Honda', 'Civic', 2025, 'Sedán', 'Seminuevo', 'Manual', 'Gasolina', 12300, 'Blanco', '1743826723517-bmw-f30-widebody-f30_3840x2560_xtrafondos.com.jpg', 560200, 'dcmalsmkkmcldmasklcmdaklcsmkdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '', '', NULL, '2025-04-14 16:05:53', '2025-04-14 16:05:53'),
(15, 'Toyota', 'Hilux', 2025, 'Camioneta', 'Seminuevo', 'Manual', 'Gasolina', 12500, 'Gris', '1743833006312-Chuylux.jpg', 980500, 'Chuylux del Mane, pero en realidad es la troka del chuylux chuylux osea nieves alejandro', '', '', NULL, '2025-04-14 16:06:05', '2025-04-14 16:06:05'),
(16, 'Volkswagen', 'Bocho', 2000, 'Sedán', 'Seminuevo', 'Automática', 'Diésel', 35400, 'Azul', '1743833414913-scott-umstattd-Vy-sy7IiGok-unsplash.jpg', 23500, 'Auto de oswaldo nako prieto, primer carro adquirido les doy dinero si se los llevan', '', '', NULL, '2025-04-14 16:06:58', '2025-04-14 16:06:58'),
(17, 'Volkswagen', 'Bocho', 2000, 'Sedán', 'Seminuevo', 'Automática', 'Diésel', 35400, 'Azul', '1743833524729-scott-umstattd-Vy-sy7IiGok-unsplash.jpg', 23500, 'Auto Nako del Oswaldo, les doy dinero si se lo llevan EFE EFE GG MANE', '', '', NULL, '2025-04-14 16:07:53', '2025-04-14 16:07:53'),
(18, 'Volkswagen', 'Bocho', 2000, 'Sedán', 'Seminuevo', 'Automática', 'Diésel', 35400, 'Azul', '1743833653278-scott-umstattd-Vy-sy7IiGok-unsplash.jpg', 23500, 'Auto Nako del Oswaldo, les doy dinero si se lo llevan EFE EFE GG MANE', '', '', NULL, '2025-04-14 16:08:53', '2025-04-14 16:08:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id` int(11) NOT NULL,
  `vehiculo_id` int(11) NOT NULL,
  `comprador_nombre` varchar(100) NOT NULL,
  `comprador_apellidos` varchar(100) NOT NULL,
  `comprador_telefono` varchar(20) NOT NULL,
  `comprador_correo` varchar(100) NOT NULL,
  `Marca` varchar(50) NOT NULL,
  `Modelo` varchar(50) NOT NULL,
  `Anio` int(11) NOT NULL,
  `Tipo` varchar(50) NOT NULL,
  `Condicion` varchar(50) NOT NULL,
  `Transmision` varchar(50) NOT NULL,
  `Combustible` varchar(50) NOT NULL,
  `Kilometraje` int(11) NOT NULL,
  `Color` varchar(50) NOT NULL,
  `Imagen` varchar(255) NOT NULL,
  `Precio` decimal(10,2) NOT NULL,
  `Descripcion` text NOT NULL,
  `Accesorios` text DEFAULT NULL,
  `NombreVendedor` varchar(100) NOT NULL,
  `TelefonoVendedor` varchar(20) NOT NULL,
  `fecha_compra` datetime DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `compras`
--

INSERT INTO `compras` (`id`, `vehiculo_id`, `comprador_nombre`, `comprador_apellidos`, `comprador_telefono`, `comprador_correo`, `Marca`, `Modelo`, `Anio`, `Tipo`, `Condicion`, `Transmision`, `Combustible`, `Kilometraje`, `Color`, `Imagen`, `Precio`, `Descripcion`, `Accesorios`, `NombreVendedor`, `TelefonoVendedor`, `fecha_compra`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'Emmanuel Eduardo', 'Lara Mares', '449875425', 'manelara6828@gmail.com', 'Toyota', 'Corolla', 2020, 'Sedán', 'Usado', 'Automática', 'Gasolina', 35000, 'Blanco', 'carro1.jpg', 18500.00, 'Excelente estado, un solo dueño, mantenimiento al día', NULL, '', '', '2025-04-14 18:27:22', '2025-04-14 18:27:22', '2025-04-14 18:27:22', NULL),
(2, 1, 'Emmanuel Eduardo', 'lara', '4498975425', 'manelara6828@gmail.com', 'Toyota', 'Corolla', 2020, 'Sedán', 'Usado', 'Automática', 'Gasolina', 35000, 'Blanco', 'carro1.jpg', 18500.00, 'Excelente estado, un solo dueño, mantenimiento al día', NULL, '', '', '2025-04-14 19:13:50', '2025-04-14 19:13:50', '2025-04-14 19:13:50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id` int(11) NOT NULL,
  `Servicio` varchar(50) DEFAULT NULL,
  `Nombre` varchar(50) DEFAULT NULL,
  `Mensaje` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`id`, `Servicio`, `Nombre`, `Mensaje`) VALUES
(1, NULL, 'Wilson', 'Reparar mi BMW'),
(2, 'Accesorios', 'Emmanuel Eduardo', 'es una camioneta crv 2005\r\n'),
(3, 'Repuestos', 'Luis', 'Repuestos para mi pickup y unos rines ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `rol` enum('cliente','vendedor','gerente','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `pass`, `rol`) VALUES
(1, 'Administrador', 'admin@admin.com', '$2b$10$rFeVXE7XnyETVTkwx3fJXuteWAtMwjlpCWXK.7fjBh2rY1T5O2PDq', 'admin'),
(2, 'Alma Guadalupe Lara Mares', 'alma@gmail.com', '$2b$10$f4Nu7XlUjva1Yx.V/0w/wuQQ6aJeGfAVuZu6RBxa8eeTi3dCbs2Ou', 'gerente'),
(3, 'Lara Mares Emmanuel Eduardo', 'manelara6828@gmail.com', '$2b$10$0s.G5eagD918aZL0JbxAhe99pNhSuJ8xINCVIxtXDnlSof8Si1D2i', 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `Marca` varchar(50) DEFAULT NULL,
  `Modelo` varchar(50) DEFAULT NULL,
  `Anio` int(11) DEFAULT NULL,
  `Tipo` varchar(50) DEFAULT NULL,
  `Condicion` varchar(50) DEFAULT NULL,
  `Transmision` varchar(50) DEFAULT NULL,
  `Combustible` varchar(50) DEFAULT NULL,
  `Kilometraje` int(11) DEFAULT NULL,
  `Color` varchar(50) DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  `Precio` int(11) DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `NombreVendedor` varchar(100) NOT NULL,
  `TelefonoVendedor` varchar(20) NOT NULL,
  `Accesorios` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Estado` varchar(20) DEFAULT 'pendiente',
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id`, `Marca`, `Modelo`, `Anio`, `Tipo`, `Condicion`, `Transmision`, `Combustible`, `Kilometraje`, `Color`, `Imagen`, `Precio`, `Descripcion`, `NombreVendedor`, `TelefonoVendedor`, `Accesorios`, `createdAt`, `updatedAt`, `Estado`, `deletedAt`) VALUES
(1, 'Honda', 'Civic', 2025, 'Sedán', 'Seminuevo', 'Manual', 'Gasolina', 12300, 'Blanco', '1743826723517-bmw-f30-widebody-f30_3840x2560_xtrafondos.com.jpg', 560200, 'dcmalsmkkmcldmasklcmdaklcsmkdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '', '', NULL, '2025-04-11 16:11:44', '2025-04-14 16:05:53', 'aprobado', NULL),
(2, 'Toyota', 'Hilux', 2025, 'Camioneta', 'Seminuevo', 'Manual', 'Gasolina', 12500, 'Gris', '1743833006312-Chuylux.jpg', 980500, 'Chuylux del Mane, pero en realidad es la troka del chuylux chuylux osea nieves alejandro', '', '', NULL, '2025-04-11 16:11:44', '2025-04-14 16:06:05', 'aprobado', NULL),
(3, 'Volkswagen', 'Bocho', 2000, 'Sedán', 'Seminuevo', 'Automática', 'Diésel', 35400, 'Azul', '1743833414913-scott-umstattd-Vy-sy7IiGok-unsplash.jpg', 23500, 'Auto de oswaldo nako prieto, primer carro adquirido les doy dinero si se los llevan', '', '', NULL, '2025-04-11 16:11:44', '2025-04-14 16:06:58', 'aprobado', NULL),
(4, 'Volkswagen', 'Bocho', 2000, 'Sedán', 'Seminuevo', 'Automática', 'Diésel', 35400, 'Azul', '1743833524729-scott-umstattd-Vy-sy7IiGok-unsplash.jpg', 23500, 'Auto Nako del Oswaldo, les doy dinero si se lo llevan EFE EFE GG MANE', '', '', NULL, '2025-04-11 16:11:44', '2025-04-14 16:07:53', 'aprobado', NULL),
(5, 'Volkswagen', 'Bocho', 2000, 'Sedán', 'Seminuevo', 'Automática', 'Diésel', 35400, 'Azul', '1743833653278-scott-umstattd-Vy-sy7IiGok-unsplash.jpg', 23500, 'Auto Nako del Oswaldo, les doy dinero si se lo llevan EFE EFE GG MANE', '', '', NULL, '2025-04-11 16:11:44', '2025-04-14 16:08:53', 'aprobado', NULL),
(6, 'Nissan', 'Tsuru', 2000, 'Sedán', 'Seminuevo', 'Manual', 'Gasolina', 12300, 'Amarillo', '1743878627595-pexels-shantumsingh-30877637.jpg', 25500, 'Un tsuru en perfectas condiciones con aire acondicionado nuevo', '', '', NULL, '2025-04-11 16:11:44', '2025-04-14 16:16:37', 'pendiente', '2025-04-14 16:16:37'),
(7, 'Nissan', 'Sentra', 2021, 'Sedán', 'Nuevo', 'Manual', 'Gasolina', 0, 'Guindo', '1744388021794-jeep-wrangler-rubicon-2021_5120x3413_xtrafondos.com.jpg', 320500, 'Incluye fundas para asientos y retrovisor con cámara ', 'Ulises Geovani Adame Reyes', '4651000987', 'Sistema de sonido premium', '2025-04-11 16:13:41', '2025-04-11 16:13:41', 'pendiente', NULL),
(8, 'toyota', 'corona', 2020, 'Camioneta', 'Nuevo', 'Manual', 'Gasolina', 25000655, 'rojo', '1744602379311-honda.jpg', 200558, 'hola como es un gusto vender mi camionesta', 'Nives alejandro', '4498975425', 'Sistema de sonido premium, Luces adicionales', '2025-04-14 03:46:19', '2025-04-14 16:16:48', 'pendiente', '2025-04-14 16:16:48');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `catalogo`
--
ALTER TABLE `catalogo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
