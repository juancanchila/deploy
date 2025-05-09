-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: solfintdb
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Areas`
--

DROP TABLE IF EXISTS `Areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Areas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `clientId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Areas`
--

LOCK TABLES `Areas` WRITE;
/*!40000 ALTER TABLE `Areas` DISABLE KEYS */;
INSERT INTO `Areas` VALUES (3,NULL,'Area 51',48,'2025-05-02 16:20:29','2025-05-02 16:20:29'),(4,NULL,'Prueba',3,'2025-05-02 18:58:23','2025-05-02 18:58:23'),(6,NULL,'Area1',57,'2025-05-05 14:21:27','2025-05-05 14:21:27');
/*!40000 ALTER TABLE `Areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ClientLicenses`
--

DROP TABLE IF EXISTS `ClientLicenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ClientLicenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_id` int NOT NULL,
  `licenseCount` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `startDate` datetime DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `available` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `ClientLicenses_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ClientLicenses`
--

LOCK TABLES `ClientLicenses` WRITE;
/*!40000 ALTER TABLE `ClientLicenses` DISABLE KEYS */;
INSERT INTO `ClientLicenses` VALUES (1,1,2000,'2025-04-29 16:49:43','2025-05-03 16:12:48','2025-04-29 00:00:00','2026-04-29 00:00:00',1700),(12,52,10,'2025-05-03 03:34:02','2025-05-03 03:44:45','2025-05-03 03:34:02','2025-04-29 00:00:00',0),(13,53,2,'2025-05-03 03:44:14','2025-05-03 03:44:14','2025-05-03 03:44:14','2025-04-29 00:00:00',2),(14,54,4,'2025-05-03 03:44:24','2025-05-03 03:48:35','2025-05-03 03:44:24','2025-04-29 00:00:00',1),(15,55,2,'2025-05-03 03:44:34','2025-05-03 03:44:34','2025-05-03 03:44:34','2025-04-29 00:00:00',2),(17,52,2,'2025-05-03 03:45:26','2025-05-03 03:45:26','2025-05-03 03:45:26','2025-04-29 00:00:00',2),(18,52,1,'2025-05-03 03:48:35','2025-05-03 03:48:35','2025-05-03 03:48:35','2025-04-29 00:00:00',1),(19,59,300,'2025-05-03 16:12:48','2025-05-03 16:12:48','2025-05-03 16:12:48','2026-04-29 00:00:00',300),(20,1,50000,'2025-05-03 16:14:11','2025-05-03 16:14:44','2025-05-03 00:00:00','2025-05-03 00:00:00',49400),(21,58,600,'2025-05-03 16:14:44','2025-05-03 16:14:44','2025-05-03 16:14:44','2025-05-03 00:00:00',600);
/*!40000 ALTER TABLE `ClientLicenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clients`
--

DROP TABLE IF EXISTS `Clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `parentClientId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subClientLimit` int NOT NULL DEFAULT '1',
  `phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `department` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `postalCode` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `branchType` enum('principal','sucursal') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'sucursal',
  `logo` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `employeeCount` int DEFAULT NULL,
  `contact1Name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact1Phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact2Name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contact2Phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `nit` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `centroDeCosto` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `costCenterId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parentClientId` (`parentClientId`),
  KEY `Clients_costCenterId_foreign_idx` (`costCenterId`),
  CONSTRAINT `Clients_costCenterId_foreign_idx` FOREIGN KEY (`costCenterId`) REFERENCES `CostCenters` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Clients_ibfk_1` FOREIGN KEY (`parentClientId`) REFERENCES `Clients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clients`
--

LOCK TABLES `Clients` WRITE;
/*!40000 ALTER TABLE `Clients` DISABLE KEYS */;
INSERT INTO `Clients` VALUES (1,'SOLFINT',1,'2025-04-05 21:28:47','2025-05-03 03:10:00',NULL,1,'3004407026',NULL,'Barranquilla',NULL,NULL,'admins2@solfint.com','sucursal',NULL,NULL,NULL,NULL,NULL,NULL,'01',NULL,NULL),(52,'Sandra_Principal',1,'2025-05-03 03:28:44','2025-05-03 03:28:44','Sandra_Principal',3,'3156662985','No especificada','No especificada','No especificado','','ddd@gm.com','principal','',0,'Sin nombre','0000000000','','0000000000','12121212',NULL,NULL),(53,'Sandra_Subcliente1',52,'2025-05-03 03:39:09','2025-05-03 03:39:09','Sandra_Subcliente1',1,'3156984472','No especificada','No especificada','No especificado','','gg@gma.com','sucursal','',0,'Sin nombre','0000000000','','0000000000','1212121212',NULL,NULL),(54,'Sandra_Subcliente2',52,'2025-05-03 03:39:59','2025-05-03 03:40:29','Sandra_Subcliente2',1,'3156924485','No especificada','No especificada','No especificado','','fffgg@gg.com','sucursal','',0,'Sin nombre','0000000000','','0000000000','5896555',NULL,NULL),(55,'Sandra_Subcliente3',52,'2025-05-03 03:41:17','2025-05-03 03:41:17','Sandra_Subcliente3',1,'8965233365','No especificada','No especificada','No especificado','','ff@ff.com','sucursal','',0,'Sin nombre','0000000000','','0000000000','88888',NULL,NULL),(57,'Sandra_Principal2',1,'2025-05-03 03:56:58','2025-05-03 03:56:58','Sandra_Principal2',3,'3254889652','No especificada','No especificada','No especificado','','fdff@gm.com','principal','',0,'Sin nombre','0000000000','','0000000000','7845122',NULL,NULL),(58,'Sandra_Principal3',1,'2025-05-03 16:02:15','2025-05-03 16:02:15','Principal',3,'3176852236','No especificada','No especificada','No especificado','','aa@jjjj.com','principal','',0,'Sin nombre','0000000000','','0000000000','9632558',NULL,NULL),(59,'Sub_1',53,'2025-05-03 16:03:54','2025-05-03 16:03:54','',3,'3126589964','No especificada','No especificada','No especificado','','ggg@hhh.com','sucursal','',0,'Sin nombre','0000000000','','0000000000','965332',NULL,NULL),(60,'Cliente_P2',1,'2025-05-09 15:50:05','2025-05-09 15:50:05','',3,'3256987415','No especificada','No especificada','No especificado','','ssdd@gg.com','principal','',0,'Sin nombre','0000000000','','0000000000','1234567896',NULL,NULL);
/*!40000 ALTER TABLE `Clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CostCenters`
--

DROP TABLE IF EXISTS `CostCenters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CostCenters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `clientId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CostCenters`
--

LOCK TABLES `CostCenters` WRITE;
/*!40000 ALTER TABLE `CostCenters` DISABLE KEYS */;
INSERT INTO `CostCenters` VALUES (2,'CC-9431','Test',16,'2025-04-28 16:26:54','2025-04-28 16:26:54'),(3,'CC-2812','test',23,'2025-04-28 16:27:23','2025-04-28 16:27:23'),(4,'CC-3983','CCosto1',48,'2025-05-02 16:18:53','2025-05-02 16:18:53');
/*!40000 ALTER TABLE `CostCenters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExamSubjects`
--

DROP TABLE IF EXISTS `ExamSubjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExamSubjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subjectId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `examId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `examUrl` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `templateId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `customerId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `examLocale` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `examQueued` datetime DEFAULT NULL,
  `examStatus` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `examStep` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `clientId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExamSubjects`
--

LOCK TABLES `ExamSubjects` WRITE;
/*!40000 ALTER TABLE `ExamSubjects` DISABLE KEYS */;
INSERT INTO `ExamSubjects` VALUES (1,'6f1f1eb9dd8d4bf798f131ba65ec9f37','507c5ebc968d43599a4ccacedbe71ac6','https://verifeye.app.link/uLvJDf4bdTb','11111111111111111111111111112721','2025-05-08 20:55:39','2025-05-08 20:55:39','FG7MMPCN9X','es-CO','2025-05-08 20:55:37','','','54'),(2,'8afb65f92f734d9290c0e5c9ecabc779','ebb475f10eb0405190ade256ec35f9c1','https://verifeye.app.link/5vxp93FNeTb','11111111111111111111111111112760','2025-05-09 20:09:33','2025-05-09 20:09:33','FG7MMPCN9X','es-CO','2025-05-09 20:09:32','','','52');
/*!40000 ALTER TABLE `ExamSubjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Exams`
--

DROP TABLE IF EXISTS `Exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Exams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `templateId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tipoDePrueba` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `clientId` int NOT NULL,
  `userId` int NOT NULL,
  `areaId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clientId` (`clientId`),
  KEY `userId` (`userId`),
  KEY `areaId` (`areaId`),
  CONSTRAINT `Exams_ibfk_1` FOREIGN KEY (`clientId`) REFERENCES `Clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Exams_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Exams_ibfk_3` FOREIGN KEY (`areaId`) REFERENCES `Areas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Exams`
--

LOCK TABLES `Exams` WRITE;
/*!40000 ALTER TABLE `Exams` DISABLE KEYS */;
INSERT INTO `Exams` VALUES (1,'11111111111111111111111111112721','Demo corta - Examen Demo',54,47,NULL,'2025-05-05 20:53:41','2025-05-05 20:53:41'),(2,'11111111111111111111111111112757','Test',57,47,NULL,'2025-05-08 18:58:23','2025-05-08 18:58:23'),(3,'11111111111111111111111111112760','Prueba_Sandra_09052025',52,47,NULL,'2025-05-09 15:46:43','2025-05-09 15:46:43'),(4,'11111111111111111111111111112761','OtroCliente',59,106,NULL,'2025-05-09 15:49:15','2025-05-09 15:49:15'),(5,'11111111111111111111111111112762','Prueba_Otro cliente2',60,47,NULL,'2025-05-09 15:51:29','2025-05-09 15:51:29');
/*!40000 ALTER TABLE `Exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Licenses`
--

DROP TABLE IF EXISTS `Licenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Licenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `licenseKey` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `validUntil` datetime DEFAULT NULL,
  `clientId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Licenses`
--

LOCK TABLES `Licenses` WRITE;
/*!40000 ALTER TABLE `Licenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `Licenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Logs`
--

DROP TABLE IF EXISTS `Logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `accion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `objectId` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `objectType` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `clientId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `Logs_clientId_foreign_idx` (`clientId`),
  CONSTRAINT `Logs_clientId_foreign_idx` FOREIGN KEY (`clientId`) REFERENCES `Clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Logs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logs`
--

LOCK TABLES `Logs` WRITE;
/*!40000 ALTER TABLE `Logs` DISABLE KEYS */;
INSERT INTO `Logs` VALUES (1,47,'POST','6f1f1eb9dd8d4bf798f131ba65ec9f37','Evaluado','2025-05-03 01:27:53','2025-05-03 01:27:53',1),(2,47,'POST','feace3d1853841c6a1c49d007ad1c0a9','Evaluado','2025-05-03 01:27:53','2025-05-03 01:27:53',1),(3,47,'POST','49b9e835604347759bc25e74947e0f47','Evaluado','2025-05-03 01:27:53','2025-05-03 01:27:53',1),(4,47,'POST','8b58215fc8fd435b9f084e0f7efd375b','Evaluado','2025-05-03 01:27:53','2025-05-03 01:27:53',1),(5,47,'POST','117e3cdca23a483ba011ab690a7b613a','Evaluado','2025-05-03 01:27:53','2025-05-03 01:27:53',1),(6,47,'POST','237163c2ccf84c3d8c747524e71bb367','Examen','2025-05-03 16:59:40','2025-05-03 16:59:40',1),(7,47,'POST','575719ea44f443a8aa19a692233e4f3c','Examen','2025-05-03 17:13:03','2025-05-03 17:13:03',1),(8,47,'POST','1ced325c33f548b4a010ab56e8aba44f','Examen','2025-05-05 22:57:10','2025-05-05 22:57:10',1),(9,47,'POST','c72788cd21204b11a0cc37fc2738256b','Examen','2025-05-05 22:59:40','2025-05-05 22:59:40',1),(10,47,'POST','1192300a2ea2407ba9cf55fb96e14395','Examen','2025-05-08 19:57:35','2025-05-08 19:57:35',1),(11,47,'POST','98621edb753447fb9205c76e758c0a17','Examen','2025-05-08 20:32:38','2025-05-08 20:32:38',1),(12,47,'POST','236ff106ec0d4e20867842b06576352c','Examen','2025-05-08 20:32:56','2025-05-08 20:32:56',1),(13,47,'POST','9821cab32deb4947b48ed1b5bf1986e4','Examen','2025-05-08 20:40:42','2025-05-08 20:40:42',1),(14,47,'POST','d3c404ffdf75482eb1bef547403fb849','Examen','2025-05-08 20:41:05','2025-05-08 20:41:05',1),(15,47,'POST','64a2cf8b92c0463f9369682fc99ae4bd','Examen','2025-05-08 20:47:30','2025-05-08 20:47:30',1),(16,47,'POST','949a5629df914d0a87700d4bf3b2b5fa','Examen','2025-05-08 20:47:47','2025-05-08 20:47:47',1),(17,47,'POST','37cef866831a4233a412c53d08dab5c1','Examen','2025-05-08 20:48:41','2025-05-08 20:48:41',1),(18,47,'POST','b94d1a9b3aeb42ca98846097d758a080','Examen','2025-05-08 20:49:05','2025-05-08 20:49:05',1),(19,47,'POST','e6ca900104c641c0998b7ae8455481ed','Examen','2025-05-08 20:49:19','2025-05-08 20:49:19',1),(20,47,'POST','7a63f38057c545f1ac52d0b85819840d','Examen','2025-05-08 20:49:45','2025-05-08 20:49:45',1),(21,47,'POST','5c915d0286d643fc8af58939e8d22bdf','Examen','2025-05-08 20:51:03','2025-05-08 20:51:03',1),(22,47,'POST','507c5ebc968d43599a4ccacedbe71ac6','Examen','2025-05-08 20:55:39','2025-05-08 20:55:39',1),(23,47,'POST','11111111111111111111111111112760','Examen','2025-05-09 15:46:43','2025-05-09 15:46:43',52),(24,106,'POST','11111111111111111111111111112761','Examen','2025-05-09 15:49:15','2025-05-09 15:49:15',59),(25,47,'POST','11111111111111111111111111112762','Examen','2025-05-09 15:51:29','2025-05-09 15:51:29',60),(26,47,'POST','3843cc21d47842a4a70d67bbdc3c7fb8','Evaluado','2025-05-09 19:47:06','2025-05-09 19:47:06',1),(27,47,'POST','91e5cbf786884e379f7764e04e18bb4c','Evaluado','2025-05-09 19:49:34','2025-05-09 19:49:34',1),(28,106,'POST','8afb65f92f734d9290c0e5c9ecabc779','Evaluado','2025-05-09 20:08:54','2025-05-09 20:08:54',52),(29,106,'POST','ebb475f10eb0405190ade256ec35f9c1','Examen','2025-05-09 20:09:33','2025-05-09 20:09:33',52);
/*!40000 ALTER TABLE `Logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PasswordResetAttempts`
--

DROP TABLE IF EXISTS `PasswordResetAttempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PasswordResetAttempts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `attemptedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `PasswordResetAttempts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PasswordResetAttempts`
--

LOCK TABLES `PasswordResetAttempts` WRITE;
/*!40000 ALTER TABLE `PasswordResetAttempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `PasswordResetAttempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (14,'Super Admin','Usuario con acceso total al sistema','2025-04-05 21:18:35','2025-04-05 21:18:35'),(15,'Admin','Administrador del cliente','2025-04-05 21:18:35','2025-04-05 21:18:35'),(16,'Evaluador','Encargado de evaluar información','2025-04-05 21:18:35','2025-04-05 21:18:35'),(17,'View','Solo lectura','2025-04-05 21:18:35','2025-04-05 21:18:35');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20250405210625-create-users.js'),('20250405210705-create-roles.js'),('20250405210754-create-clients.js'),('20250405210831-create-user-roles.js'),('20250405210903-create-user.js'),('20250405210905-create-role.js'),('20250405210907-create-client.js'),('20250405210909-create-user-role.js'),('20250405213800-add-clientId-to-users.js'),('20250405215715-create-user-otps-and-identity-flag.js'),('20250405222138-create-user-otp.js'),('20250408010603-add_user_details_to_users.js'),('20250408013529-add_client_details_to_clients.js'),('20250409180422-create-user-login-attempts.js'),('20250409180452-create-user-login-attempt.js'),('20250409183145-create-password-reset-attempts.js'),('20250409183236-create-password-reset-attempt.js'),('20250409183938-create-verification-attempt.js'),('20250409205706-add_nit_and_centroDeCosto_to_clients.js'),('20250415190143-create-area.js'),('20250415190144-create-license.js'),('20250415190146-create-cost-center.js'),('20250415232205-add-costCenterId-to-clients.js'),('20250417202449-add-city-to-users.js'),('20250424162506-create-translate.js'),('20250428163517-create-log.js'),('20250428191753-change-objectid-to-string-in-log.js'),('20250429164536-create-client-licenses.js'),('20250429164716-create-client-license.js'),('20250429174458-add-fields-to-clientlicenses.js'),('20250503003107-add-clientId-to-logs.js'),('20250504160421-create-exam.js'),('20250505233326-create-subject.js'),('20250505234031-add-subjectId-to-subject.js'),('20250506000534-change-subjectid-to-string.js'),('20250506005240-create-exam-subject.js'),('20250506005410-create-exam-subject.js'),('20250508201157-add-fields-to-examsubject.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Subjects`
--

DROP TABLE IF EXISTS `Subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subjectName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subjectToken` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subjectEmail` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subjectMobile` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `clientId` int DEFAULT NULL,
  `areaId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `subjectId` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Subjects`
--

LOCK TABLES `Subjects` WRITE;
/*!40000 ALTER TABLE `Subjects` DISABLE KEYS */;
INSERT INTO `Subjects` VALUES (1,'John Smith','abc123','john@example.com','1234567890',1,0,'2025-05-06 00:06:04','2025-05-06 00:06:04','feace3d1853841c6a1c49d007ad1c0a9'),(2,'John Smith','abc123','john@example.com','1234567890',1,0,'2025-05-06 00:06:04','2025-05-06 00:06:04','6f1f1eb9dd8d4bf798f131ba65ec9f37'),(3,'JAVIER RODRIGUEZ HERNANDEZ','80093370','javier007@gmail.com','3114566380',1,0,'2025-05-06 00:26:31','2025-05-06 00:26:31','dfe961078311496f8ad43aac1a4b7f7b'),(4,'TATIANA ELIZABED JIMENEZ GARZÓN','1012423984','elizabedj16@gmail.com','3175820796',1,0,'2025-05-08 23:38:42','2025-05-08 23:38:42','1b1b0cf222a04b7bbfeafeeff7a95283'),(6,'John Smith','1234567899','JohnSmith@gmail.com','3004407026',1,0,'2025-05-09 19:47:06','2025-05-09 19:47:06','3843cc21d47842a4a70d67bbdc3c7fb8'),(7,'Jhon Doe','1140829291','jhon3@gmail.com','3004407026',1,0,'2025-05-09 19:49:34','2025-05-09 19:49:34','91e5cbf786884e379f7764e04e18bb4c'),(8,'Prueba test','33333','ss@ff.com','31569887456',52,0,'2025-05-09 20:08:54','2025-05-09 20:08:54','8afb65f92f734d9290c0e5c9ecabc779');
/*!40000 ALTER TABLE `Subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Translates`
--

DROP TABLE IF EXISTS `Translates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Translates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `original` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `translated` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Translates`
--

LOCK TABLES `Translates` WRITE;
/*!40000 ALTER TABLE `Translates` DISABLE KEYS */;
INSERT INTO `Translates` VALUES (3,'ALPHA - Preempleo-Robo-Falsificación Docs-Vínculos-Secuestro','Examen 3','2025-04-24 16:43:14','2025-04-24 16:43:14'),(4,'ALPHA - prueba rutina-Robo, Fuga, Vínculos, Falsificación','Examen 4','2025-04-24 16:43:14','2025-04-24 16:43:14'),(6,'Excelcredit - Preempleo-Mentir Formulario-Robo-Vínculos-Secuestr','Examen 6','2025-04-24 16:43:14','2025-04-24 16:43:14'),(7,'Excelcredit - rutina-Robo, Fuga, Vínculos, Falsificación','Examen 7','2025-04-24 16:43:14','2025-04-24 16:43:14'),(8,'FIDELITY - Preempleo-Robo-Falsificación Docs-Vínculos-Secuestro','Examen 8','2025-04-24 16:43:14','2025-04-24 16:43:14'),(9,'FIDELITY - prueba rutina-Robo, Fuga, Vínculos, Falsificación','Examen 9','2025-04-24 16:43:14','2025-04-24 16:43:14'),(10,'Seguridad Alpha - Formulario','Examen 10','2025-04-24 16:43:14','2025-04-24 16:43:14'),(11,'Shipping - Preempleo-Robo-Falsificación Docs-Vínculos-Secu','Examen 11s','2025-04-24 16:43:14','2025-04-24 21:03:18'),(12,'Shipping - rutina-Robo, Fuga, Vínculos, Falsificación','Examen 12','2025-04-24 16:43:14','2025-04-24 16:43:14'),(13,'V3R - Visita domiciliaria','Examen 13','2025-04-24 16:43:14','2025-04-24 16:43:14'),(17,'Águilas de Oro - Preempleo-Robo-Falsificación Docs-Vínculos-Secu','Examen 1','2025-04-24 21:09:35','2025-04-24 21:17:33'),(19,'Águilas de Oro - rutina-Robo, Fuga, Vínculos, Falsificación','Examen 2','2025-04-24 21:17:52','2025-04-24 21:17:52'),(20,'Axa - Preempleo-Robo-Drogas-Vínculos-Secuestro','Examen 11','2025-04-25 13:29:21','2025-04-25 13:29:21'),(22,'Demo corta - consumo de drogas','Demo corta - Examen Demo','2025-05-02 21:08:08','2025-05-02 22:17:12');
/*!40000 ALTER TABLE `Translates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserLoginAttempts`
--

DROP TABLE IF EXISTS `UserLoginAttempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserLoginAttempts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `lastLoginAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserLoginAttempts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserLoginAttempts`
--

LOCK TABLES `UserLoginAttempts` WRITE;
/*!40000 ALTER TABLE `UserLoginAttempts` DISABLE KEYS */;
INSERT INTO `UserLoginAttempts` VALUES (4,47,'3004407026','2025-04-09 19:10:21','2025-04-09 19:10:21','2025-04-09 19:10:21'),(5,47,'3004407026','2025-04-09 19:19:08','2025-04-09 19:19:08','2025-04-09 19:19:08'),(6,47,'3004407026','2025-04-09 20:21:25','2025-04-09 20:21:25','2025-04-09 20:21:25'),(7,47,'3004407026','2025-04-09 20:34:34','2025-04-09 20:34:34','2025-04-09 20:34:34'),(9,47,'3004407026','2025-04-09 20:38:36','2025-04-09 20:38:36','2025-04-09 20:38:36'),(11,47,'3004407026','2025-04-09 20:56:01','2025-04-09 20:56:01','2025-04-09 20:56:01'),(12,47,'3004407026','2025-04-09 21:04:22','2025-04-09 21:04:22','2025-04-09 21:04:22'),(13,47,'3004407026','2025-04-09 21:06:03','2025-04-09 21:06:03','2025-04-09 21:06:03'),(14,47,'3004407026','2025-04-09 21:08:32','2025-04-09 21:08:32','2025-04-09 21:08:32'),(15,47,'3004407026','2025-04-09 21:09:18','2025-04-09 21:09:18','2025-04-09 21:09:18'),(16,47,'3004407026','2025-04-09 21:24:40','2025-04-09 21:24:40','2025-04-09 21:24:40'),(17,47,'3004407026','2025-04-09 22:29:49','2025-04-09 22:29:49','2025-04-09 22:29:49'),(18,47,'3004407026','2025-04-09 23:30:59','2025-04-09 23:30:59','2025-04-09 23:30:59'),(19,47,'3004407026','2025-04-09 23:36:57','2025-04-09 23:36:57','2025-04-09 23:36:57'),(20,47,'3004407026','2025-04-09 23:48:23','2025-04-09 23:48:23','2025-04-09 23:48:23'),(21,47,'3004407026','2025-04-09 23:49:44','2025-04-09 23:49:44','2025-04-09 23:49:44'),(22,47,'3004407026','2025-04-09 23:55:10','2025-04-09 23:55:10','2025-04-09 23:55:10'),(23,47,'3004407026','2025-04-10 00:13:18','2025-04-10 00:13:18','2025-04-10 00:13:18'),(24,47,'3004407026','2025-04-10 00:20:31','2025-04-10 00:20:31','2025-04-10 00:20:31'),(25,47,'3004407026','2025-04-10 00:39:58','2025-04-10 00:39:58','2025-04-10 00:39:58'),(27,47,'3004407026','2025-04-10 00:42:22','2025-04-10 00:42:22','2025-04-10 00:42:22'),(30,47,'3004407026','2025-04-10 00:47:36','2025-04-10 00:47:36','2025-04-10 00:47:36'),(31,47,'3004407026','2025-04-10 00:49:57','2025-04-10 00:49:57','2025-04-10 00:49:57'),(32,47,'3004407026','2025-04-10 00:50:14','2025-04-10 00:50:14','2025-04-10 00:50:14'),(33,47,'3004407026','2025-04-10 00:50:18','2025-04-10 00:50:18','2025-04-10 00:50:18'),(35,47,'3004407026','2025-04-10 01:33:50','2025-04-10 01:33:50','2025-04-10 01:33:50'),(36,47,'3004407026','2025-04-10 02:31:59','2025-04-10 02:31:59','2025-04-10 02:31:59'),(37,47,'3004407026','2025-04-10 11:15:23','2025-04-10 11:15:23','2025-04-10 11:15:23'),(38,47,'3004407026','2025-04-10 11:15:44','2025-04-10 11:15:44','2025-04-10 11:15:44'),(39,47,'3150416295','2025-04-10 11:20:50','2025-04-10 11:20:50','2025-04-10 11:20:50'),(40,47,'3150416295','2025-04-10 11:27:13','2025-04-10 11:27:13','2025-04-10 11:27:13'),(41,47,'3150416295','2025-04-10 11:28:01','2025-04-10 11:28:01','2025-04-10 11:28:01'),(42,47,'3150416295','2025-04-10 11:28:49','2025-04-10 11:28:49','2025-04-10 11:28:49'),(43,47,'3150416295','2025-04-10 11:35:11','2025-04-10 11:35:11','2025-04-10 11:35:11'),(44,47,'3150416295','2025-04-10 11:36:20','2025-04-10 11:36:20','2025-04-10 11:36:20'),(45,47,'3150416295','2025-04-10 11:42:25','2025-04-10 11:42:25','2025-04-10 11:42:25'),(46,47,'3150416295','2025-04-10 11:44:38','2025-04-10 11:44:38','2025-04-10 11:44:38'),(48,47,'3150416295','2025-04-10 12:00:46','2025-04-10 12:00:46','2025-04-10 12:00:46'),(50,47,'3150416295','2025-04-10 12:17:25','2025-04-10 12:17:25','2025-04-10 12:17:25'),(51,47,'3150416295','2025-04-10 12:43:49','2025-04-10 12:43:49','2025-04-10 12:43:49'),(56,47,'3150416295','2025-04-10 13:08:45','2025-04-10 13:08:45','2025-04-10 13:08:45'),(57,47,'3150416295','2025-04-10 14:39:42','2025-04-10 14:39:42','2025-04-10 14:39:42'),(58,47,'3150416295','2025-04-15 15:44:37','2025-04-15 15:44:37','2025-04-15 15:44:37');
/*!40000 ALTER TABLE `UserLoginAttempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserOTPs`
--

DROP TABLE IF EXISTS `UserOTPs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserOTPs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `otpCodeHash` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `isValidated` tinyint(1) DEFAULT '0',
  `validatedAt` datetime DEFAULT NULL,
  `expiresAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserOTPs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserOTPs`
--

LOCK TABLES `UserOTPs` WRITE;
/*!40000 ALTER TABLE `UserOTPs` DISABLE KEYS */;
INSERT INTO `UserOTPs` VALUES (8,47,'$2b$10$OYVW8zBA1b2xuKiBrdea..6B8a4rr7JxqsKSsUWoQWEbwFLhxwvUq',1,'2025-04-05 22:10:42','2025-04-05 22:15:42','2025-04-05 22:10:42','2025-04-05 22:10:42'),(67,47,'$2b$10$f9CwIANfZxtvxtDKMGDRn.lhH/2AywSui2jhvXAOnVtAzag3L/uwm',0,NULL,'2025-04-08 20:12:15','2025-04-08 19:57:15','2025-04-08 19:57:15'),(68,47,'$2b$10$QxsU3Uws/eFofqLHZhmlg.9tLeQHagKoNCIFRkjFeyCfDiYF0Xai.',0,NULL,'2025-04-08 20:12:52','2025-04-08 19:57:52','2025-04-08 19:57:52'),(69,47,'$2b$10$9fvJ1KENbvZZz0rHauXck.sCAqvYH/GqFQdy1Cg705F83euihD8ge',0,NULL,'2025-04-08 20:13:16','2025-04-08 19:58:16','2025-04-08 19:58:16');
/*!40000 ALTER TABLE `UserOTPs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserRoles`
--

DROP TABLE IF EXISTS `UserRoles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserRoles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  `clientId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  KEY `clientId` (`clientId`),
  CONSTRAINT `UserRoles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `UserRoles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `Roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `UserRoles_ibfk_3` FOREIGN KEY (`clientId`) REFERENCES `Clients` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserRoles`
--

LOCK TABLES `UserRoles` WRITE;
/*!40000 ALTER TABLE `UserRoles` DISABLE KEYS */;
INSERT INTO `UserRoles` VALUES (66,47,14,1,'2025-04-10 14:47:03','2025-04-10 14:47:03'),(95,108,17,1,'2025-05-03 03:14:03','2025-05-03 03:14:03'),(96,106,15,1,'2025-05-03 03:14:40','2025-05-03 03:14:40'),(97,109,14,1,'2025-05-03 03:14:50','2025-05-03 03:14:50'),(98,107,16,1,'2025-05-03 03:15:00','2025-05-03 03:15:00'),(99,110,17,1,'2025-05-03 03:17:35','2025-05-03 03:17:35'),(100,117,16,52,'2025-05-03 15:27:53','2025-05-03 15:27:53');
/*!40000 ALTER TABLE `UserRoles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `clientId` int DEFAULT NULL,
  `isIdentityValidated` tinyint(1) NOT NULL DEFAULT '0',
  `fullName` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `whatsapp` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `jobTitle` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `photoUrl` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `Users_clientId_foreign_idx` (`clientId`),
  CONSTRAINT `Users_clientId_foreign_idx` FOREIGN KEY (`clientId`) REFERENCES `Clients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (47,'superadmin','admin@solfint.com','$2b$10$v8TIxzf7CGZwv9Annkvl5.z0eFds2VyeiyY/JBu.69WjpZMa1xF4C','2025-04-05 21:13:04','2025-05-06 22:31:04',1,1,'Admin','3150416295','3150416295','dev',NULL,'Cartagena'),(106,'Sandra_Admin','Admin@gg.com','$2b$10$clJXPS4Jf.Txdz3onlukhuHw2RRhxzvhYt49CMj9MH9dA7qLQq1cO','2025-05-03 03:04:59','2025-05-03 03:55:30',52,0,'Sandra_Admin','3176516671','',NULL,NULL,'Barranquilla'),(107,'Sandra_Evaluador','jjj@g.com','$2b$10$ifi/mrH9fblduBknrAppr.2UoIohYhRgLnBoVQLyWPbUlkZho6qE2','2025-05-03 03:05:41','2025-05-03 03:05:41',1,0,'Sandra_Evaluador','3176516671','',NULL,NULL,NULL),(108,'Sandra_View','ggg@gm.com','$2b$10$S7hpFmWjuh/ZoVx.YDvcd.UmlhQ9omRyjiXi47uTYPELjDehFFARG','2025-05-03 03:06:17','2025-05-03 03:06:17',1,0,'Sandra_View','3176516671','',NULL,NULL,NULL),(109,'Sandra_SuperAdmin','fff@gm.com','$2b$10$6lD6lr.Kj1v15hCtAwZ5YuLQ/./r7fZs6fJGvskqdsRfqA8qtMGWe','2025-05-03 03:06:58','2025-05-03 03:06:58',1,0,'Sandra_SuperAdmin','3156325589','',NULL,NULL,NULL),(110,'PruebaRol','ww@ff.com','$2b$10$30YuvqA4T0jus0FQtZD7Au6djA8DHTMXMm58Dr3KoTFqUKCr3tXp6','2025-05-03 03:16:07','2025-05-03 03:18:06',1,0,'PruebaRol','3176516671','222545584444',NULL,NULL,'Barranquilla'),(117,'Sandra_Evaluador2','Sandra_Evaluador2@gmail.com','$2b$10$1pa2yTaxOywPreDZKwJIc.M3qV4vakrCggayc61yL0LvGuIWS9e6G','2025-05-03 04:03:35','2025-05-03 04:03:35',52,0,'Sandra_Evaluador2','3256968545','',NULL,NULL,NULL),(121,'Sandra_View2','Sandra_View@gmail.com','$2b$10$Jbm.A6qovQI.trd8gBfc7OXI.SEzKJyKD55zelE0TBy8zDXxSN51C','2025-05-03 04:06:17','2025-05-03 04:06:17',53,0,'Sandra_View','3156982545','',NULL,NULL,NULL),(122,'Sandra_CP','DDKD@CVM.COM','$2b$10$8UP/J8YHmvPvP5aYquCRce0s2Ees6LGdV1.T6LXwizRxKmUDZtDgS','2025-05-03 05:07:38','2025-05-03 05:07:38',52,0,'sANDRA_cp2','3256985141','',NULL,NULL,NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VerificationAttempts`
--

DROP TABLE IF EXISTS `VerificationAttempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VerificationAttempts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `code` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wasVerified` tinyint(1) DEFAULT NULL,
  `attemptedAt` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VerificationAttempts`
--

LOCK TABLES `VerificationAttempts` WRITE;
/*!40000 ALTER TABLE `VerificationAttempts` DISABLE KEYS */;
INSERT INTO `VerificationAttempts` VALUES (1,47,'3150416295','734150',1,NULL,'2025-04-10 12:04:41','2025-04-10 12:04:41'),(2,68,'3150416295','290756',1,NULL,'2025-04-10 12:09:12','2025-04-10 12:09:12'),(3,47,'3150416295','076748',1,NULL,'2025-04-10 12:17:42','2025-04-10 12:17:42'),(4,73,'3150416295','586595',1,NULL,'2025-04-10 12:46:25','2025-04-10 12:46:25'),(5,61,'3150416295','569874',0,NULL,'2025-04-10 12:47:56','2025-04-10 12:47:56'),(6,47,'3150416295','996228',1,NULL,'2025-04-10 13:09:38','2025-04-10 13:09:38'),(7,47,'3150416295','256398',0,NULL,'2025-04-10 14:39:49','2025-04-10 14:39:49'),(8,47,'3150416295','840156',1,NULL,'2025-04-15 15:45:45','2025-04-15 15:45:45');
/*!40000 ALTER TABLE `VerificationAttempts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-09 22:38:17
