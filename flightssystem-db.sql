-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 22, 2024 at 09:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flightssystem-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`) VALUES
(1, 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `airlines`
--

CREATE TABLE `airlines` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airlines`
--

INSERT INTO `airlines` (`id`, `name`) VALUES
(1, 'Delta'),
(2, 'Turkish Airlines'),
(3, 'Emirates'),
(4, 'Qatar Airways');

-- --------------------------------------------------------

--
-- Table structure for table `airports`
--

CREATE TABLE `airports` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `airports`
--

INSERT INTO `airports` (`id`, `name`, `country`) VALUES
(1, 'Dubai International Airport', 'United Arab Emirates'),
(2, 'King Abdulaziz International Airport', 'Saudi Arabia'),
(3, 'Frankfurt Airport', 'Germany'),
(4, 'Munich Airport', 'Germany'),
(5, 'Beirut-Rafic Hariri International Airport', 'Lebanon');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `booked_seats` int(11) NOT NULL,
  `amount_paid` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `flight_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `booked_seats`, `amount_paid`, `user_id`, `flight_id`) VALUES
(2, 2, 700, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `coin-requests`
--

CREATE TABLE `coin-requests` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coin-requests`
--

INSERT INTO `coin-requests` (`id`, `amount`, `status`, `user_id`) VALUES
(1, 150, 1, 1),
(2, 300, 0, 2),
(3, 12, 1, 5),
(4, 1000, 0, 5);

-- --------------------------------------------------------

--
-- Table structure for table `flights`
--

CREATE TABLE `flights` (
  `id` int(11) NOT NULL,
  `departure_date` date NOT NULL,
  `return_date` date NOT NULL,
  `departure_time` time NOT NULL,
  `arrival_time` time NOT NULL,
  `number_of_seats` int(11) NOT NULL,
  `number_of_passengers` int(11) NOT NULL DEFAULT 0,
  `price` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `departure_airport_id` int(11) NOT NULL,
  `arrival_airport_id` int(11) NOT NULL,
  `airline_id` int(11) NOT NULL,
  `plane_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flights`
--

INSERT INTO `flights` (`id`, `departure_date`, `return_date`, `departure_time`, `arrival_time`, `number_of_seats`, `number_of_passengers`, `price`, `status`, `image`, `departure_airport_id`, `arrival_airport_id`, `airline_id`, `plane_id`, `admin_id`) VALUES
(1, '2024-03-01', '2024-03-04', '01:00:00', '03:30:00', 35, 18, 200, 'canceled', 'uploads/flight.jpg', 5, 2, 3, 1, 1),
(2, '2024-03-13', '2024-03-16', '15:00:00', '20:00:00', 50, 33, 350, 'scheduled', 'uploads/flight.jpg', 5, 4, 2, 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `response` text NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `text`, `user_id`, `response`, `status`) VALUES
(1, 'hello,iam Nabiha', 1, 'Hello again', 1),
(2, 'hello,iam Bob', 2, 'hello from se', 1),
(3, 'hii', 2, '', 0),
(4, 'hello', 2, '', 0),
(5, 'Hello FlyNow', 5, '', 0),
(6, 'hello', 5, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `planes`
--

CREATE TABLE `planes` (
  `id` int(11) NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `airline_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `planes`
--

INSERT INTO `planes` (`id`, `manufacturer`, `model`, `capacity`, `airline_id`) VALUES
(1, 'Airbus', 'A319', 240, 1),
(2, 'Airbus', 'A319', 240, 2),
(3, 'Boeing', '767-300ER', 200, 2),
(6, 'Embraer', 'E170', 130, 3),
(7, 'Boeing', '777', 400, 4);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `review` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `airline_id` int(11) NOT NULL,
  `flight_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`id`, `review`, `rating`, `user_id`, `airline_id`, `flight_id`) VALUES
(1, 'the trip was great', 4, 1, 3, 1),
(2, 'the trip was not good', 2, 2, 2, 2),
(3, 'All is great', 5, 2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `birth_date` date NOT NULL,
  `balance` int(11) NOT NULL DEFAULT 0,
  `preferences` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone_number`, `gender`, `birth_date`, `balance`, `preferences`) VALUES
(1, 'Nabiha Nabiha', 'nabiha@gmail.com', 'nabiha', 70121212, 'female', '2001-03-16', 150, 'test'),
(2, 'Bob Bob', 'bob@gmail.com', 'bob', 12345678, 'male', '2000-03-03', 0, 'test2'),
(4, 'rabih4', 'rabih6@gmail.com', '$2y$10$BjxjyoRPmciuoeqAR/1W3uInPe9BKXpHSIgc8V4xuQqa5gpJeGqae', 0, '', '0000-00-00', 0, ''),
(5, 'rabih', 'rabih5@gmail.com', '$2y$10$kCVlDiqGpGjpLqY0M9iEjeLZBjyN1yN1Qra14qR2SB57p34OX9fpO', 0, 'male', '1999-12-12', 300, ''),
(6, 'rabih3', 'rabih3@gmail.com', '$2y$10$Y1DR/rXXXQ1J9SE4xMy3Ie/B.l29fOUBaSUd7ysdcu4Gc9FH0ywWm', 3030303, 'male', '0000-00-00', 0, 'Middle East Airlines'),
(7, 'test', 'test@gmail.com', '$2y$10$q0VdyP2qe9snQEiww.lDC.4PvppCL8zFENXltuo877J2jAwfRMC/K', 123456, 'male', '1999-12-12', 0, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `airlines`
--
ALTER TABLE `airlines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `airports`
--
ALTER TABLE `airports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-id` (`user_id`),
  ADD KEY `flight-id_2` (`flight_id`);

--
-- Indexes for table `coin-requests`
--
ALTER TABLE `coin-requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-id` (`user_id`);

--
-- Indexes for table `flights`
--
ALTER TABLE `flights`
  ADD PRIMARY KEY (`id`),
  ADD KEY `departure-airport-id` (`departure_airport_id`),
  ADD KEY `arrival-airport-id` (`arrival_airport_id`),
  ADD KEY `airplane-id` (`plane_id`),
  ADD KEY `airline-id` (`airline_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-id` (`user_id`);

--
-- Indexes for table `planes`
--
ALTER TABLE `planes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `airline-id` (`airline_id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user-id` (`user_id`),
  ADD KEY `airline-id` (`airline_id`),
  ADD KEY `flight-id` (`flight_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `airlines`
--
ALTER TABLE `airlines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `airports`
--
ALTER TABLE `airports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `coin-requests`
--
ALTER TABLE `coin-requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `flights`
--
ALTER TABLE `flights`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `planes`
--
ALTER TABLE `planes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `coin-requests`
--
ALTER TABLE `coin-requests`
  ADD CONSTRAINT `coin-requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `flights`
--
ALTER TABLE `flights`
  ADD CONSTRAINT `flights_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `flights_ibfk_2` FOREIGN KEY (`plane_id`) REFERENCES `planes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `flights_ibfk_3` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `flights_ibfk_4` FOREIGN KEY (`departure_airport_id`) REFERENCES `airports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `flights_ibfk_5` FOREIGN KEY (`arrival_airport_id`) REFERENCES `airports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `planes`
--
ALTER TABLE `planes`
  ADD CONSTRAINT `planes_ibfk_1` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_3` FOREIGN KEY (`flight_id`) REFERENCES `flights` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ratings_ibfk_4` FOREIGN KEY (`airline_id`) REFERENCES `airlines` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
