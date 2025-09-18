-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2025 at 02:24 PM
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
-- Database: `tree_for_sell`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` enum('fruit','flowering','ornamental','timber','medicinal','shade') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `planting_instructions` text DEFAULT NULL,
  `uses` text DEFAULT NULL,
  `facts` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `price`, `image_url`, `description`, `planting_instructions`, `uses`, `facts`, `created_at`) VALUES
(1, 'Mango Tree (আম)', 'fruit', 29.99, 'https://growplant.org/wp-content/uploads/2024/11/best-fertilizer-for-mango-tree.jpg', 'Mango trees are tropical trees that produce sweet, juicy fruits. They require warm climates and well-drained soil.', 'Plant in full sun with plenty of space for growth. Water regularly during the first few years.', 'Produces delicious fruits, provides shade, and has ornamental value.', 'Mango is the national fruit of India, Pakistan, and the Philippines. A single tree can live for over 100 years.', '2025-09-17 11:56:34'),
(2, 'Jackfruit Tree (কাঁঠাল)', 'fruit', 39.99, 'https://images.unsplash.com/photo-1596436889106-be35e8435c75', 'Jackfruit trees produce the world\'s largest tree-borne fruits, weighing up to 55 kg.', 'Requires tropical climate, well-drained soil, and plenty of space.', 'Fruits are edible, wood is used for furniture, and latex has various uses.', 'Jackfruit is a popular meat substitute due to its texture when unripe.', '2025-09-17 11:56:34'),
(3, 'Krishnachura (Delonix regia)', 'flowering', 49.99, 'https://images.unsplash.com/photo-1596436889106-be35e8435c75', 'Known for its stunning red flowers that cover the tree during blooming season.', 'Thrives in tropical climates with well-drained soil and full sun.', 'Primarily ornamental, provides excellent shade during summer.', 'The flowers are so vibrant that they can make entire landscapes appear red during peak bloom.', '2025-09-17 11:56:34'),
(4, 'Teak Tree (সেগুন)', 'timber', 79.99, 'https://images.unsplash.com/photo-1596436889106-be35e8435c75', 'Premium timber tree known for its durability and water resistance.', 'Grows best in well-drained soil with moderate rainfall.', 'High-quality furniture, shipbuilding, and construction.', 'Teak wood contains natural oils that make it resistant to termites and rotting.', '2025-09-17 11:56:34'),
(5, 'Neem Tree (নিম)', 'medicinal', 34.99, 'https://images.unsplash.com/photo-1596436889106-be35e8435c75', 'Medicinal tree with numerous health benefits and insect-repelling properties.', 'Grows in various soil types, drought-resistant once established.', 'Medicinal purposes, natural pesticide, and air purification.', 'Neem is called \'the village pharmacy\' in India due to its many medicinal uses.', '2025-09-17 11:56:34'),
(6, 'Banyan Tree (বট)', 'shade', 89.99, 'https://images.unsplash.com/photo-1596436889106-be35e8435c75', 'Massive tree with aerial roots that grow into secondary trunks.', 'Requires ample space to grow, prefers well-drained soil.', 'Provides extensive shade, often planted in parks and large spaces.', 'The Great Banyan in India covers 4.67 acres and is over 250 years old.', '2025-09-17 11:56:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart_item` (`user_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
