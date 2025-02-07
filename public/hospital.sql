-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2025 at 11:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

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
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL
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
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `dob` date DEFAULT NULL,
  `hospital_number` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `telephone_number` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `surname`, `dob`, `hospital_number`, `email`, `department_id`, `telephone_number`, `password`, `created_at`) VALUES
(2, 'Karen', 'Sturgeon', NULL, 'CHI1234334', 'ksturgeongcc@gmail.com', 2, '234565435', '$2b$10$l7kVobEuVZVLHqG986dzUOOLxaKf4yPkyIWn/CpNIDDsZB1fFu0hO', '2025-01-11 01:18:35'),
(3, 'Jane', 'Doe', NULL, 'CHI1234335', 'jd@gmail.com', 1, '98765456787', '$2b$10$5epd3D6cPMKfQbKPFfL/huCNycNuHp8kS1exWNQEWAxXNm5NJQxHK', '2025-01-11 23:21:32'),
(4, 'John', 'Doe', NULL, 'CHI1234336', 'johnd@gmail.com', 2, '456789', '$2b$10$bOZ45dhAazJ9fHvHo7wXheWN0uEd5jLPWfD1lV5zge7XPgG4.dshS', '2025-01-11 23:33:51'),
(5, 'asdfadsf', 'asdf', NULL, 'adsf', 'asdf@email.com', 3, '234343', '$2b$10$V7b81dA6o5ew9lhXyWSkrO48OmDgjkPRud0sZGUn6/mETLQDacHQ.', '2025-01-13 01:14:38'),
(6, 'Paul', 'Bennett', NULL, 'CHI9999999', 'paul@email.com', 3, '1234567898', '$2b$10$0uE9x6B4uU3nnozS4EQeKewwfmImm4vP64vQ10nHqiWT5XcYx/qJG', '2025-01-13 09:57:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
