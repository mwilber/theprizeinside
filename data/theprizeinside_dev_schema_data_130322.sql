-- phpMyAdmin SQL Dump
-- version 3.3.2deb1ubuntu1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 22, 2013 at 03:24 PM
-- Server version: 5.1.67
-- PHP Version: 5.3.2-1ubuntu4.19

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `theprizeinside_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblAccount`
--

DROP TABLE IF EXISTS `tblAccount`;
CREATE TABLE IF NOT EXISTS `tblAccount` (
  `accountId` int(11) NOT NULL AUTO_INCREMENT,
  `accountExtId` varchar(50) DEFAULT NULL,
  `accountType` varchar(10) DEFAULT NULL,
  `profileId` int(11) DEFAULT NULL,
  `accountTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`accountId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tblAccount`
--


-- --------------------------------------------------------

--
-- Table structure for table `tblCheckin`
--

DROP TABLE IF EXISTS `tblCheckin`;
CREATE TABLE IF NOT EXISTS `tblCheckin` (
  `checkinId` int(11) NOT NULL AUTO_INCREMENT,
  `checkinLocation` varchar(200) DEFAULT NULL,
  `checkinLat` float(10,6) DEFAULT NULL,
  `checkinLng` float(10,6) DEFAULT NULL,
  `checkinComment` text,
  `checkinRating` int(11) DEFAULT NULL,
  `profileId` int(11) DEFAULT NULL,
  `restaurantId` int(11) DEFAULT NULL,
  `prizeId` int(11) DEFAULT NULL,
  `checkinTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`checkinId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tblCheckin`
--


-- --------------------------------------------------------

--
-- Table structure for table `tblPrize`
--

DROP TABLE IF EXISTS `tblPrize`;
CREATE TABLE IF NOT EXISTS `tblPrize` (
  `prizeId` int(11) NOT NULL AUTO_INCREMENT,
  `prizeName` varchar(100) DEFAULT NULL,
  `prizeImage` varchar(200) DEFAULT NULL,
  `prizeGender` varchar(1) NOT NULL,
  `prizeLink` varchar(200) DEFAULT NULL,
  `prizeActive` int(11) DEFAULT NULL,
  `restaurantId` int(11) DEFAULT NULL,
  `prizeTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`prizeId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `tblPrize`
--

INSERT INTO `tblPrize` (`prizeId`, `prizeName`, `prizeImage`, `prizeGender`, `prizeLink`, `prizeActive`, `restaurantId`, `prizeTimeStamp`) VALUES
(1, 'Transformers Prime', '', 'M', 'http://www.happymeal.com/en_US/index.html#/Toys', 0, 1, '2013-03-19 22:39:04'),
(2, 'Hello Kitty', '', 'F', 'http://www.happymeal.com/en_US/index.html#/Toys', 0, 1, '2013-03-19 22:38:24'),
(3, 'Kidz Bop', '', 'N', 'http://www.bkcrown.com/toys/Default.aspx', 0, 2, '2013-03-19 22:38:14'),
(4, 'HexBug', '', 'M', '', 1, 1, '2013-03-19 22:42:04'),
(5, 'Barbie - Pink Shoes', '', 'F', '', 1, 1, '2013-03-19 22:42:42'),
(6, 'Cut The Rope - Time Travel', '', 'N', '', 1, 2, '2013-03-19 22:45:01'),
(7, 'I Spy Games', '', 'N', '', 1, 6, '2013-03-19 22:50:41'),
(8, 'Phineas and Ferb bags', '', 'N', '', 1, 5, '2013-03-19 22:58:13'),
(9, 'Sonic 4x4s', '', 'N', '', 1, 4, '2013-03-19 23:02:40'),
(10, 'NBA Trading Cards', '', 'N', '', 1, 3, '2013-03-19 23:04:13'),
(11, 'Shape & Solve', '', 'N', '', 1, 7, '2013-03-19 23:12:05');

-- --------------------------------------------------------

--
-- Table structure for table `tblProfile`
--

DROP TABLE IF EXISTS `tblProfile`;
CREATE TABLE IF NOT EXISTS `tblProfile` (
  `profileId` int(11) NOT NULL AUTO_INCREMENT,
  `profileLName` varchar(50) DEFAULT NULL,
  `profileFName` varchar(50) DEFAULT NULL,
  `profileEmail` varchar(50) DEFAULT NULL,
  `profileTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`profileId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tblProfile`
--


-- --------------------------------------------------------

--
-- Table structure for table `tblRestaurant`
--

DROP TABLE IF EXISTS `tblRestaurant`;
CREATE TABLE IF NOT EXISTS `tblRestaurant` (
  `restaurantId` int(11) NOT NULL AUTO_INCREMENT,
  `restaurantAlias` varchar(10) DEFAULT NULL,
  `restaurantName` varchar(50) DEFAULT NULL,
  `restaurantUrl` varchar(200) DEFAULT NULL,
  `restaurantDataUrl` varchar(200) DEFAULT NULL,
  `restaurantTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`restaurantId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tblRestaurant`
--

INSERT INTO `tblRestaurant` (`restaurantId`, `restaurantAlias`, `restaurantName`, `restaurantUrl`, `restaurantDataUrl`, `restaurantTimeStamp`) VALUES
(1, 'mcd', 'McDonalds', 'http://www.happymeal.com/en_US/index.html#/Toys', 'http://www.happymeal.com/en_US/config/flash.xml', '2013-03-19 22:40:22'),
(2, 'bk', 'Burger King', 'http://www.bkcrown.com/Toys/Default.aspx', 'http://www.bkcrown.com/toys/Default.aspx', '2013-03-19 22:44:15'),
(3, 'bell', 'Taco Bell', 'http://www.tacobell.com', 'http://www.tacobell.com/food/menu/kids-meals/', '2013-01-13 22:13:03'),
(4, 'snc', 'Sonic Drive-In', 'http://mywackypack.com/', 'http://www.sonicdrivein.com/kids/wackyPackToys.jsp', '2013-03-19 23:01:58'),
(5, 'sub', 'Subway', 'http://subwaykids.com', 'http://subwaykids.com/grownups/promotions/kidsmeals.aspx', '2013-01-13 22:14:05'),
(6, 'wnd', 'Wendy''s', 'http://www.wendys.com/kids_meal/', '', '2013-03-19 22:49:30'),
(7, 'arb', 'Arby''s', 'http://www.arbys.com/kids.html', '', '2013-03-19 23:10:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userEmail` varchar(128) NOT NULL,
  `userPassword` varchar(32) NOT NULL,
  `userStatus` varchar(50) NOT NULL DEFAULT 'active',
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userEmail`, `userPassword`, `userStatus`) VALUES
(7, 'mwilber@gmail.com', '6423c2a2f26b30abf09608c78f711ea5', 'active');
