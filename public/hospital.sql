-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2025 at 03:14 PM
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
(7, 'Asim', 'Mian', '2002-12-31', '1', '20273835@myclyde.ac.uk', 1, '0141 383 6089', '$2b$10$5QVGzx3rMq19Cht4h72p5uPSc41d0MNbQcY96VxM1l6NCE.zm3W9C', '2025-02-10 14:42:18'),
(11, 'David', 'Stewart', '2002-12-30', 'CHI1234567890', 'asim.mian7878@gmail.com', 2, '01413836089', 'Sajid365', '2025-02-10 15:33:28'),
(16, 'Karen', 'Sturgon', '1333-12-12', '133', 'ksturgon@yahoo.com', 1, '01414445674', '$2b$10$Jev6NGmHXt3WYDYyQUbh7uMScSpsYBCDtK9q1QhRk/G7kMRPx9Hg.', '2025-02-16 18:06:57'),
(17, 'Iain', 'Shaw', '1222-04-04', '124', 'ishaw@gmail.com', 2, '01414532321', '$2b$10$VwrUNBmeykOK.cWmEj3zbupzdQgmX4qFMmLwfyvfJfYPqNlO5SSba', '2025-02-17 14:35:04'),

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
