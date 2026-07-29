-- MySQL dump 10.13  Distrib 8.0.42, for macos15 (arm64)
--
-- Host: localhost    Database: concorde_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'admin','$2a$12$124K57S4MiNu0jhBnLiHOuooofHAfNBcaXQhL4oDUWqKuv0YL73Y2','2026-05-10 08:08:04');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `display_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Residential','residential','home',1),(4,'Commercial','commercial','building-2',2),(5,'Interiors','interiors','sofa',3),(6,'Construction','construction','hard-hat',4),(7,'Renovation','renovation','hammer',5),(8,'Layouts & Planning','layouts','layout-dashboard',6);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiries`
--

DROP TABLE IF EXISTS `enquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `message` text,
  `service` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `read_status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiries`
--

LOCK TABLES `enquiries` WRITE;
/*!40000 ALTER TABLE `enquiries` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_images`
--

DROP TABLE IF EXISTS `project_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `image_path` varchar(500) NOT NULL,
  `sort_order` int DEFAULT '0',
  `is_before` tinyint(1) DEFAULT '0',
  `is_after` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  CONSTRAINT `project_images_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_images`
--

LOCK TABLES `project_images` WRITE;
/*!40000 ALTER TABLE `project_images` DISABLE KEYS */;
INSERT INTO `project_images` VALUES (2,2,'/images/interiors/IMG_0041.JPG',0,0,0),(3,2,'/images/interiors/IMG_0038.JPG',1,0,0),(4,2,'/images/interiors/IMG_1130.JPG',2,0,0),(5,2,'/images/interiors/IMG_0045.JPG',3,0,0),(6,2,'/images/interiors/IMG_0051.JPG',4,0,0),(7,3,'/images/interiors/IMG20230515025232.jpg',0,0,0),(8,3,'/images/interiors/IMG_0056.JPG',1,0,0),(9,3,'/images/layouts/IMG_20210706_085736.jpg',2,0,0),(10,4,'/images/construction/20000108_142623.jpg',0,0,0),(11,4,'/images/construction/jaya 1.jpg',1,0,0),(12,4,'/images/construction/jaya 2.jpg',2,0,0),(13,4,'/images/layouts/CV REDDY - PLANS-Model 1.jpg',3,0,0),(14,4,'/images/layouts/CV REDDY - PLANS-Model 2.jpg',4,0,0),(15,5,'/images/construction/architecture (1).jpg',0,0,0),(16,5,'/images/construction/architecture (2).jpg',1,0,0),(17,5,'/images/interiors/1gf10.jpg',2,0,0),(18,5,'/images/interiors/1gf9.jpg',3,0,0),(19,6,'/images/interiors/IMG20230515025232.jpg',0,0,0),(20,6,'/images/interiors/BQOT7745.JPG',1,0,0),(21,6,'/images/interiors/GAMB2356.JPG',2,0,0),(22,7,'/images/layouts/Anjaneyulu-Model 1.jpg',0,0,0),(23,7,'/images/layouts/Anjaneyulu-Model 2.jpg',1,0,0),(24,7,'/images/layouts/Jagan Mohan-Model 1.jpg',2,0,0),(25,7,'/images/construction/architecture (3).jpg',3,0,0);
/*!40000 ALTER TABLE `project_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category_id` int DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `year_completed` int DEFAULT NULL,
  `short_desc` text,
  `full_desc` longtext,
  `cover_image` varchar(500) DEFAULT NULL,
  `status` enum('published','draft') DEFAULT 'draft',
  `featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (2,'Serene Villa Interiors — Bangalore','serene-villa-interiors-bangalore',5,'Bangalore, Karnataka','4,200 sq ft',2024,'A nature-inspired villa interior blending warmth, sustainability, and timeless elegance.','<p>This project involved a complete interior transformation of a premium villa in Whitefield, Bangalore. The brief called for a nature-inspired aesthetic that harmonizes with the lush garden surroundings while delivering contemporary luxury and functional living spaces.</p><p>Every room was thoughtfully designed with warm tones, natural materials, and layered lighting to create immersive, emotionally resonant spaces. Custom joinery, handcrafted furniture, and curated art pieces complete the experience.</p>','/images/interiors/IMG20230712190652.jpg','published',1,'2026-06-05 08:14:53','2026-06-05 08:14:53'),(3,'Modern Commercial Office — Chennai','modern-commercial-office-chennai',4,'Chennai, Tamil Nadu','6,800 sq ft',2023,'A dynamic, biophilic office space designed for productivity, collaboration, and employee well-being.','<p>This large-format commercial fit-out for a technology firm in OMR, Chennai was designed around the principles of biophilic design — integrating living walls, natural light, and organic forms throughout the workspace.</p><p>The design balances open collaborative zones with focused work areas, featuring custom acoustic panels, modular furniture systems, and a seamless material palette that reinforces the client brand identity.</p>','/images/interiors/IMG20230515035704.jpg','published',1,'2026-06-05 08:14:53','2026-06-05 08:14:53'),(4,'Luxury Residential Construction — Coimbatore','luxury-residential-construction-coimbatore',6,'Coimbatore, Tamil Nadu','5,500 sq ft',2023,'A ground-up luxury villa construction combining sustainable materials with precision engineering.','<p>This end-to-end construction project in Saravanampatti, Coimbatore demonstrates our full turnkey capability — from foundation and structural work through to interior finishes and landscaping.</p><p>The residence features fly-ash bricks, steel-reinforced RCC structure, solar-ready roofing provisions, and rainwater harvesting integration. The construction timeline was delivered in 18 months with zero structural defects on final inspection.</p>','/images/construction/20000108_091233.jpg','published',1,'2026-06-05 08:14:53','2026-06-05 08:14:53'),(5,'Contemporary Home Renovation — Mysore','contemporary-home-renovation-mysore',7,'Mysore, Karnataka','2,800 sq ft',2024,'A thoughtful renovation that preserved original character while elevating modern functionality.','<p>This renovation project involved transforming a 25-year-old independent house in Gokulam, Mysore into a contemporary family home. The challenge was to retain the spatial character of the original architecture while introducing modern amenities, better ventilation, and a refined aesthetic.</p><p>Structural reinforcement, new MEP systems, redesigned kitchen and bathrooms, and a complete interior refresh delivered a home that feels entirely new while honoring its heritage.</p>','/images/construction/20000108_142623.jpg','published',0,'2026-06-05 08:14:53','2026-06-05 08:14:53'),(6,'Sustainable Office Interiors — Bangalore','sustainable-office-interiors-bangalore',5,'Bangalore, Karnataka','3,200 sq ft',2023,'A LEED-aligned office interior designed with recycled materials, energy efficiency, and wellness at its core.','<p>Designed for a sustainability-focused consultancy in Indiranagar, Bangalore, this office interior aligns with LEED principles while delivering a sophisticated, high-performance work environment.</p><p>Key features include reclaimed wood accents, VOC-free paints, LED lighting with occupancy sensors, ergonomic workstations, and a dedicated meditation room — creating a workplace that genuinely supports employee well-being.</p>','/images/interiors/IMG20230301114229.jpg','published',0,'2026-06-05 08:14:53','2026-06-05 08:14:53'),(7,'Premium Villa Architecture — Ooty','premium-villa-architecture-ooty',3,'Ooty, Tamil Nadu','3,900 sq ft',2024,'A mountain retreat villa designed in harmony with the Nilgiri landscape and climate.','<p>Perched in the Nilgiris at an altitude of 7,200 feet, this villa was designed to embrace the mountain climate, mist, and natural greenery of Ooty. The architectural brief prioritized passive heating, panoramic views, and seamless indoor-outdoor connectivity.</p><p>Steeply pitched rooflines, stone facade cladding, large double-glazed openings, and a wrap-around deck bring the landscape into every living space. The structure uses locally quarried stone and sustainably harvested timber throughout.</p>','/images/layouts/IMG_20210706_085736.jpg','published',0,'2026-06-05 08:14:53','2026-06-05 08:14:53');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `description` text,
  `features` text,
  `icon` varchar(100) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `display_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (5,'Design & Development','Land to Lifestyle.','Planning spaces that are intelligent, functional and future-ready. The success of a project begins long before construction — our consultancy supports landowners, investors, developers and organizations with informed planning and development decisions.','[\"Master Planning\",\"Site Analysis\",\"Layout Development\",\"Infrastructure Planning\",\"Land Development Consultancy\",\"Feasibility Studies\",\"Building Planning\",\"Zoning & Utilization Studies\",\"Design Strategy\",\"Development Advisory\"]','ruler','/images/brand/doc-image-5.jpg',1),(6,'Architecture & Construction','Building enduring spaces with precision.','From empty land to enduring landmarks. Concord provides end-to-end development solutions for residential, commercial, hospitality and institutional projects — integrating planning, engineering, architecture and execution into a seamless delivery process.','[\"Residential Construction\",\"Luxury Villas\",\"Apartments\",\"Farm Houses\",\"Commercial Buildings\",\"Retail Developments\",\"Hospitality Projects & Resorts\",\"Institutional Buildings\",\"Turnkey Construction\",\"Project Management\"]','hardhat','/images/brand/doc-image-4.jpg',2),(7,'Landscape Architecture','Where nature and design become one.','Creating destinations, not just gardens. Landscape architecture is the art of shaping experiences through nature — whether a farmhouse retreat, a resort environment, a recreational destination or a community development, we create outdoor spaces that connect people with their surroundings.','[\"Farmhouse Landscapes\",\"Resort Landscapes\",\"Garden Design\",\"Outdoor Living Spaces\",\"Courtyard Design\",\"Water Features\",\"Sustainable Landscaping\",\"Recreational Spaces\",\"Green Infrastructure\",\"Eco-sensitive Development\"]','trees','/images/brand/doc-image-2.jpg',3),(8,'Interior Design & Turnkey Execution','Spaces designed around people.','Interior design at Concord goes beyond decoration. We create environments that influence emotions, productivity, wellbeing and experiences — every interior tailored to the people who use it.','[\"Residential & Luxury Home Interiors\",\"Commercial Interiors\",\"Corporate Offices\",\"Retail & Hospitality Interiors\",\"Space Planning\",\"Custom Furniture\",\"Modular Kitchens\",\"Lighting & False Ceiling Design\",\"Material Selection\",\"Complete Turnkey Execution\"]','sofa','/images/brand/doc-image-3.jpg',4),(9,'Smart Living & Smart Workspaces','Technology integrated seamlessly into everyday experiences.','Technology integrated seamlessly into everyday experiences — smart home and office automation, intelligent lighting, voice-controlled environments, security integration and energy monitoring that quietly anticipate the people who use them.','[\"Smart Home Automation\",\"Smart Office Automation\",\"Intelligent Lighting Systems\",\"Voice-Controlled Environments\",\"Security & Surveillance Integration\",\"Energy Monitoring Systems\",\"Smart Climate Control\",\"Integrated AV Systems\",\"Workplace Automation\"]','cpu','/images/brand/doc-image-8.jpg',5);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `key` varchar(100) NOT NULL,
  `value` longtext,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES ('about_headline','Designing Experiences. Building Possibilities.'),('awards_won','8'),('brand_philosophy','We believe that spaces are more than structures — they shape emotions, lifestyles, and human experiences. At Concord Interior Concepts, we design and build environments that connect people with nature, promote sustainable living, and create lasting value through thoughtful architecture and timeless interiors.'),('brand_promise','Thoughtful design, responsible construction, transparent execution, and spaces built with timeless quality and care.'),('brand_purpose','To create meaningful and sustainable living spaces that improve everyday life while contributing positively to people, communities, and the environment.'),('brand_statement','At Concord Interior Concepts, we create environments that inspire living, enable business, and enrich communities.'),('brand_story_long','Concord Interior Concepts is a multidisciplinary design and development firm dedicated to shaping spaces that balance aesthetics, functionality, sustainability and long-term value. Our work spans architecture, construction, landscape development, luxury interiors, infrastructure planning and consultancy. We collaborate with homeowners, businesses, developers and institutions to transform ideas into environments that inspire everyday life. Every project is approached with one objective — to create spaces that are not only visually exceptional but strategically designed for the future.'),('brand_story_short','Concord Interior Concepts was built on the belief that meaningful spaces can transform the way people live. By combining sustainable construction, nature-inspired interiors, and thoughtful design, we create timeless environments that balance elegance, functionality, and environmental harmony. Our goal is simple — to design spaces that not only look beautiful, but also nurture well-being, inspire peaceful living, and create lasting value for generations to come.'),('brand_usp','A holistic design-build firm redefining modern living through sustainable architecture, nature-inspired interiors, and seamless turnkey execution tailored for timeless and conscious lifestyles.'),('company_address',''),('company_email',''),('company_name','Concord Interior Concepts'),('company_phone',''),('company_tagline','A Design, Build & Development Consultancy'),('core_values','[{\"title\":\"Sustainability\",\"icon\":\"leaf\",\"description\":\"We are committed to environmentally responsible construction and design practices that contribute to a greener and healthier future.\"},{\"title\":\"Nature-Centric Design\",\"icon\":\"trees\",\"description\":\"We create spaces that harmonize with nature, promoting balance, well-being, and mindful living.\"},{\"title\":\"Quality Craftsmanship\",\"icon\":\"gem\",\"description\":\"We believe in delivering excellence through precision, durability, attention to detail, and timeless workmanship.\"},{\"title\":\"Innovation with Purpose\",\"icon\":\"lightbulb\",\"description\":\"We embrace creativity, modern technology, and functional innovation to build meaningful and future-ready spaces.\"},{\"title\":\"Integrity & Transparency\",\"icon\":\"shield-check\",\"description\":\"We build trust through honesty, accountability, ethical practices, and transparent communication in every project.\"},{\"title\":\"Client-Centric Approach\",\"icon\":\"heart-handshake\",\"description\":\"We prioritize our clients vision, comfort, and satisfaction by delivering personalized and seamless experiences.\"},{\"title\":\"Timeless Elegance\",\"icon\":\"sparkles\",\"description\":\"We design spaces that blend sophistication, functionality, and enduring aesthetic value beyond trends.\"},{\"title\":\"Community & Environmental Responsibility\",\"icon\":\"globe\",\"description\":\"We strive to create a positive impact on people, communities, and the ecosystem through conscious and responsible development.\"}]'),('footer_message','Designing Spaces. Building Experiences. Creating Sustainable Futures.'),('founding_year','2020'),('happy_clients','50'),('happy_clients_count','50'),('hero_cta1_label','View Our Work'),('hero_cta1_url','/portfolio'),('hero_cta2_label','Get a Quote'),('hero_cta2_url','/contact'),('hero_image','/images/interiors/IMG20230712190652.jpg'),('hero_sub_tagline','Architecture, Construction, Interiors, Landscape Development and Strategic Planning — brought together through one integrated vision.'),('hero_tagline','We Design. We Build. We Transform.'),('mission_statement','Our mission is to transform spaces into sustainable living experiences by blending nature-inspired design, quality craftsmanship, and functional innovation with a commitment to environmental harmony and client satisfaction.'),('service_philosophy','At Concord Interior Concepts, we believe great spaces are created through a balance of purpose, sustainability, and emotion. Our approach combines architecture, interiors, and construction into one seamless process — ensuring every space is functional, timeless, and deeply connected to nature and modern living. We design with intention, build with responsibility, and execute with precision to create environments that inspire meaningful experiences and lasting value.'),('vision_statement','To become a leader in sustainable architecture by creating environmentally conscious spaces that harmonize nature, human living, and the ecosystem — blending innovation, functionality, and timeless elegance to inspire healthier communities and a greener future.'),('whatsapp_number','');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `review_text` text,
  `rating` int DEFAULT '5',
  `photo` varchar(500) DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-21  0:41:57
