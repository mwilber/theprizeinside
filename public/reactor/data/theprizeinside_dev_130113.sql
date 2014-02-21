-- phpMyAdmin SQL Dump
-- version 3.3.2deb1ubuntu1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 13, 2013 at 10:20 PM
-- Server version: 5.1.66
-- PHP Version: 5.3.2-1ubuntu4.18

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tblPrize`
--

INSERT INTO `tblPrize` (`prizeId`, `prizeName`, `prizeImage`, `prizeGender`, `prizeLink`, `prizeActive`, `restaurantId`, `prizeTimeStamp`) VALUES
(1, 'Transformers Prime', '', 'M', 'http://www.happymeal.com/en_US/index.html#/Toys', 1, 1, '2013-01-13 22:17:41'),
(2, 'Hello Kitty', '', 'F', 'http://www.happymeal.com/en_US/index.html#/Toys', 1, 1, '2013-01-13 22:18:02'),
(3, 'Kidz Bop', '', 'N', 'http://www.bkcrown.com/toys/Default.aspx', 1, 2, '2013-01-13 22:19:19');

-- --------------------------------------------------------

--
-- Table structure for table `tblProfile`
--

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

CREATE TABLE IF NOT EXISTS `tblRestaurant` (
  `restaurantId` int(11) NOT NULL AUTO_INCREMENT,
  `restaurantAlias` varchar(10) DEFAULT NULL,
  `restaurantName` varchar(50) DEFAULT NULL,
  `restaurantUrl` varchar(200) DEFAULT NULL,
  `restaurantDataUrl` varchar(200) DEFAULT NULL,
  `restaurantTimeStamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`restaurantId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `tblRestaurant`
--

INSERT INTO `tblRestaurant` (`restaurantId`, `restaurantAlias`, `restaurantName`, `restaurantUrl`, `restaurantDataUrl`, `restaurantTimeStamp`) VALUES
(1, 'mcd', 'McDonalds', 'http://www.happymeal.com/en_US', 'http://www.happymeal.com/en_US/config/flash.xml', '2013-01-13 22:11:48'),
(2, 'bk', 'Burger King', 'http://www.bkcrown.com/toys', 'http://www.bkcrown.com/toys/Default.aspx', '2013-01-13 22:12:17'),
(3, 'bell', 'Taco Bell', 'http://www.tacobell.com', 'http://www.tacobell.com/food/menu/kids-meals/', '2013-01-13 22:13:03'),
(4, 'snc', 'Sonic Drive-In', 'http://www.sonicdrivein.com/kids', 'http://www.sonicdrivein.com/kids/wackyPackToys.jsp', '2013-01-13 22:13:33'),
(5, 'sub', 'Subway', 'http://subwaykids.com', 'http://subwaykids.com/grownups/promotions/kidsmeals.aspx', '2013-01-13 22:14:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

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
