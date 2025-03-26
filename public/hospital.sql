-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 26, 2025 at 11:01 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'Cardiology'),
(2, 'Neurology'),
(3, 'Pediatrics'),
(4, 'Orthopedics');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstName` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `hospital_number` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int DEFAULT NULL,
  `department_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telephone_number` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `two_factor_secret` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `two_factor_enabled` tinyint(1) DEFAULT '0',
  `backup_codes` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `surname`, `dob`, `hospital_number`, `email`, `department_id`, `department_name`, `telephone_number`, `password`, `created_at`, `two_factor_secret`, `two_factor_enabled`, `backup_codes`) VALUES
(7, 'Asim', 'Mian', '2002-12-31', '1', '20273835@myclyde.ac.uk', 1, 'Cardiology', '0141 383 6089', '$2b$10$5QVGzx3rMq19Cht4h72p5uPSc41d0MNbQcY96VxM1l6NCE.zm3W9C', '2025-02-10 14:42:18', NULL, 0, NULL),
(17, 'Iain', 'Shaw', '1222-04-04', '124', 'ishaw@gmail.com', 2, 'Neurology', '01414532321', '$2b$10$VwrUNBmeykOK.cWmEj3zbupzdQgmX4qFMmLwfyvfJfYPqNlO5SSba', '2025-02-17 14:35:04', NULL, 0, NULL),
(18, 'David', 'Stewart', '1965-12-18', '125', 'dstewart@gmail.com', 1, 'Cardiology', '01415834532', '$2b$10$WDnB4gFaU4f2SluHa2fq3OO8kR6tp/awbDbvr25BGJ57KiTfpja2m', '2025-03-26 02:17:48', NULL, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
