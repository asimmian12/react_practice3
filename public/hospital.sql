-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 29, 2025 at 09:50 PM
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
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `department_id` int NOT NULL,
  `date` date NOT NULL,
  `time` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `status` enum('booked','completed','cancelled','rescheduled') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'booked',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `user_id`, `doctor_id`, `department_id`, `date`, `time`, `reason`, `notes`, `status`, `created_at`, `updated_at`) VALUES
(38, 2, 3, 3, '2025-04-01', 'Invalid Date', 'Need Autism Test', 'For my son', 'booked', '2025-03-29 01:36:15', '2025-03-29 01:36:15');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int NOT NULL,
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`) VALUES
(1, 'CARDIOLOGY'),
(2, 'NEUROLOGY'),
(3, 'PEDIATRICS'),
(4, 'ORTHOPEDICS'),
(5, 'PULMONOLOGY'),
(6, 'NEUROSURGERY'),
(7, 'OTOLARYNGOLOGY'),
(8, 'DERMATOLOGY'),
(9, 'X-RAY');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT 'Dr.',
  `specialization` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int NOT NULL,
  `bio` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `firstName`, `lastName`, `title`, `specialization`, `department_id`, `bio`, `image`) VALUES
(1, 'Samantha ', 'Jackson', 'Dr.', 'CARDIOLOGY', 1, 'Expert pediatric cardiologist specializing in congenital heart defects, childhood heart conditions, and cardiac imaging. Skilled in non-invasive diagnostics and family-centered care for young cardiac patients.', 'doctor6.jpeg'),
(2, 'John', 'GoldBerg', 'Dr.', 'NEUROLOGY', 2, 'Expert pediatric neurologist specializing in neurodevelopmental disorders, childhood epilepsy, and neuromuscular conditions. Skilled in advanced neuroimaging and electrophysiological diagnostics. Committed to family-centered care for young patients with neurological conditions.', 'doctor1.jpeg'),
(3, 'John', 'Williams', 'Dr.', 'PEDIATRICS', 3, 'Expert pediatric orthopedic surgeon specializing in congenital limb differences, sports injuries, and neuromuscular skeletal disorders. Skilled in advanced surgical techniques and non-operative management for fractures, scoliosis, and gait abnormalities. Committed to family-centered care to optimize mobility and quality of life for children and adolescents.', 'doctor7.jpeg'),
(4, 'Carly', 'Smith', 'Dr.', 'ORTHOPEDICS', 4, 'Expert pediatric neurosurgeon specializing in congenital brain and spinal anomalies, pediatric brain tumors, and complex epilepsy surgery. Skilled in advanced microsurgical techniques and minimally invasive approaches for hydrocephalus, craniosynostosis, and spinal dysraphism. Dedicated to delivering precision, compassionate care to optimize neurological function and quality of life for infants, children, and adolescents.', 'doctor8.jpeg'),
(5, 'David', 'Stewart', 'Dr.', 'NEUROSURGERY', 6, 'Expert pediatric neurosurgeon specializing in congenital brain and spinal anomalies, pediatric brain tumors, and complex epilepsy surgery. Skilled in advanced microsurgical techniques and minimally invasive approaches for hydrocephalus, craniosynostosis, and spinal dysraphism. Dedicated to delivering precision, compassionate care to optimize neurological function and quality of life for infants, children, and adolescents.', 'doctor3.jpeg'),
(6, 'Iain', 'Shaw', 'Dr.', 'PULMONOLOGY', 5, 'Expert pediatric pulmonologist specializing in asthma, cystic fibrosis, chronic lung disease of prematurity, and complex respiratory disorders. Skilled in advanced diagnostics, pulmonary function testing, and multidisciplinary care for ventilator-dependent children. Committed to family-centered treatment plans that optimize lung health and quality of life for infants, children, and adolescents.', 'doctor2.jpeg'),
(7, 'Miley', 'Smith', 'Dr.', 'OTOLARYNGOLOGY', 7, 'Expert pediatric otolaryngologist specializing in airway disorders, congenital ENT anomalies, and complex hearing loss. Skilled in advanced surgical techniques for ear tubes, tonsillectomies, and pediatric sinus disease. Proficient in cochlear implantation and management of voice/swallowing disorders. Committed to family-centered care that optimizes communication, breathing, and quality of life for children of all ages.', 'doctor4.jpeg'),
(8, 'Lisa', 'Abara', 'Dr.', 'DERMATOLOGY', 8, 'Expert pediatric dermatologist specializing in complex skin disorders including atopic dermatitis, vascular birthmarks, and genetic skin conditions. Skilled in advanced diagnostic techniques and minimally invasive procedures for acne, psoriasis, and pigmentary disorders. Special expertise in pediatric laser therapies and surgical dermatology. Committed to providing compassionate, family-centered care that promotes healthy skin development for infants through adolescents.', 'doctor5.jpeg'),
(9, 'Sarah', 'White', 'Dr.', 'X-RAY', 9, 'Expert pediatric radiologist specializing in advanced diagnostic imaging, including low-dose X-ray techniques for infants and children. Skilled in interpreting skeletal surveys for trauma, congenital anomalies, and growth disorders. Special expertise in minimizing radiation exposure while optimizing image quality for accurate diagnosis. Committed to providing family-centered care through clear communication and collaboration with referring physicians to ensure the safest, most effective imaging for pediatric patients.', 'doctor9.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availability`
--

CREATE TABLE `doctor_availability` (
  `id` int NOT NULL,
  `doctor_id` int NOT NULL,
  `day_of_week` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `slot_duration` int DEFAULT '30' COMMENT 'Duration in minutes'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_availability`
--

INSERT INTO `doctor_availability` (`id`, `doctor_id`, `day_of_week`, `start_time`, `end_time`, `slot_duration`) VALUES
(1, 1, 'Monday', '08:00:00', '12:00:00', 30),
(2, 2, 'Wednesday', '09:00:00', '13:00:00', 30),
(3, 3, 'Tuesday', '10:00:00', '14:00:00', 30),
(4, 4, 'Thursday', '11:00:00', '15:00:00', 30),
(5, 5, 'Friday', '08:30:00', '12:30:00', 30),
(6, 6, 'Saturday', '09:00:00', '13:00:00', 30),
(7, 7, 'Monday', '14:00:00', '18:00:00', 30),
(8, 8, 'Thursday', '15:00:00', '19:00:00', 30),
(9, 9, 'Friday', '15:00:00', '19:00:00', 30);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dob` date DEFAULT NULL,
  `hospital_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int DEFAULT NULL,
  `department_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telephone_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `two_factor_secret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `two_factor_enabled` tinyint(1) DEFAULT '0',
  `backup_codes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `surname`, `dob`, `hospital_number`, `email`, `department_id`, `department_name`, `telephone_number`, `password`, `created_at`, `two_factor_secret`, `two_factor_enabled`, `backup_codes`) VALUES
(1, 'Sajid', 'Mian', '1965-06-19', '126', 'sbmian@hotmail.com', 1, 'X-Ray', '01414563214', '$2b$10$6/tcmrbVJ5CvNKpc07BfuOBQbkkT5rpLvRiaTtL3tNBQlEiF6wjhy', '2025-03-28 21:21:42', NULL, 0, NULL),
(2, 'Nuzhat', 'Mian', '2000-01-01', '123', 'nfmian@gmail.com', 1, 'Cardiology', '0123456789', '$2b$10$5QVGzx3rMq19Cht4h72p5uPSc41d0MNbQcY96VxM1l6NCE.zm3W9C', '2025-03-28 01:41:00', NULL, 0, NULL),
(7, 'Asim', 'Mian', '2002-12-31', '1', '20273835@myclyde.ac.uk', 1, 'Cardiology', '0141 383 6089', '$2b$10$5QVGzx3rMq19Cht4h72p5uPSc41d0MNbQcY96VxM1l6NCE.zm3W9C', '2025-02-10 14:42:18', NULL, 0, NULL),
(17, 'Iain', 'Shaw', '1222-04-04', '124', 'ishaw@gmail.com', 2, 'Neurology', '01414532321', '$2b$10$VwrUNBmeykOK.cWmEj3zbupzdQgmX4qFMmLwfyvfJfYPqNlO5SSba', '2025-02-17 14:35:04', NULL, 0, NULL),
(18, 'David', 'Stewart', '1965-12-18', '125', 'dstewart@gmail.com', 1, 'Cardiology', '01415834532', '$2b$10$WDnB4gFaU4f2SluHa2fq3OO8kR6tp/awbDbvr25BGJ57KiTfpja2m', '2025-03-26 02:17:48', NULL, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);

--
-- Constraints for table `doctor_availability`
--
ALTER TABLE `doctor_availability`
  ADD CONSTRAINT `doctor_availability_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
