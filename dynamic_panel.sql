-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 24, 2019 at 03:07 PM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dynamic_panel`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `author_image` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `categories` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `post_data` text NOT NULL,
  `views` int(11) NOT NULL,
  `status` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `date`, `title`, `author`, `author_image`, `image`, `categories`, `tags`, `post_data`, `views`, `status`) VALUES
(19, 1550703754, 'This is the data of sucess', 'Tehman', '12.jpg', '10a09f1c09b5c190dc933608e3224d59.png', 'Ecommerce Industr', 'Tehman,sardar', 'This is the post desc of', 0, 'A'),
(20, 1551012359, 'This is 2nd post', 'Tehman', '12.jpg', 'e3c2ff3fa8b2bb5d833a427ea1a75e81.jpg', 'Ecommerce Industr', 'Tehman,sardar', 'sadsadfad', 0, 'P'),
(21, 1551012642, 'this si post', 'Zeeshan', '12.jpg', 'f22217c9cb05164761aac34476ec7267.jpg', 'Mobile Development', 'zeehan,sardar', 'THISFSDD', 0, 'A'),
(22, 1551015044, 'this si post', 'Tehmi', '12.jpg', '295cbaac71d1cd0e0dc79722c605cade.jpg', 'Digital Marketing', 'zeehan,sardar', 'This is th', 0, 'A'),
(23, 1551015905, 'this si post', 'Tehmi', 'b9092ad4177dd67ea365dd0d927092c3.png', '85d02e1ef12f522f93b7e0c1c42e62dd.png', 'Digital Marketing', 'zeehan,sardar', 'tihisss', 0, 'P');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` text NOT NULL,
  `details` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `date`, `first_name`, `last_name`, `username`, `email`, `image`, `password`, `role`, `details`) VALUES
(6, 1550958807, 'Tehman', 'sardar', 'tehman_sardar', 'tehman_sardar@gmail.com', 'c60faef35ebb963814318a50ac6ec92b.png', '$2y$10$DJxg4fmwqdEDuWr1XjEfLOBXpE9RJKm3NEsE3jBdbW.nsvaOiOV.O', 'admin', 'Good'),
(7, 1551012596, 'Tehmi', 'sardar', 'zeeshan', 'zeeshan_sardar@gmail.com', 'b9092ad4177dd67ea365dd0d927092c3.png', '$2y$10$PO4k6NdNWcL91xKIwhwmW./JT6JcWLSCoV3d6BzFuB3M6LqC61gVq', 'admin', 'bad');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
