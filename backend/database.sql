--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;

CREATE TABLE user(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    firstname VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
) COMMENT '';

INSERT INTO `user` VALUES(1,'rémy','fefe@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$UfHvadttyf6lLjfnAFBhPQ$6kEukJg4lp8uy2jYa3fyVC9kCKqIClu18YfhkKt+ir8'),(2,'Maxime','Faure@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$amnWVASflI+WCKYLxGJkig$H4bs+7fUd8HhJ9kVcOAmrwXkJonhqrK60t4rVKPweWo');

--
-- Table structure for table `task_category`
--
DROP TABLE IF EXISTS `task_category`;
CREATE TABLE task_category(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    category VARCHAR(255)
) COMMENT '';

INSERT INTO `task_category` VALUES (1, 'Taches ménagère'), (2, 'Taches administratives');

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `TASK`;

CREATE TABLE task(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    task_category_id INT NOT NULL,
    earned_point BIGINT NOT NULL,

    Foreign Key (task_category_id) REFERENCES task_category(id)
) COMMENT '';

INSERT INTO `task` VALUES
(1,'Faire la vaisselle','Savonner en premier toute la vaisselle puis rincer la et ensuite secher là',1, 50),
(2,'Laver le linge', 'regrouper toutes les affaires sales puis les mettres à la machine les sortir de suite quand la machine est terminé puis les etendre',1, 50),
(3,'Faire les courses','Faire la liste des courses puis aller au magasin et acheter les produits de la liste',2, 70),
(4,'Déclarer les impots','Se connecter sur le site impot.gouv puis déclarer la situation ',2, 50),
(5,'laver le four','Acheter du décapfour faire un autocremation du four si le four en possède une puis le laver avec du décapfour',1,100),
(6,'Laver la sale de bain', 'Ranger en premier tout les éléments qui trainent, puis laver l\'evier et la douche et enfin passer l\'aspirateur et la serpillère',1, 100 ),
(7,'Faire le lit','Ranger les draps puis les remettre en place',1, 10),
(8,'Faire la poussière','Prendre un chiffon et passer sur tout les meubles',1, 50),
(9,'Faire le ménage','Passer l\'aspirateur et la serpillère',1, 100),
(10,'Faire la cuisine','Faire la liste des courses puis acheter les produits de la liste et enfin cuisiner',1, 25),
(11,'Faire la lessive','Regrouper tout les vêtements sales puis les mettre à la machine et enfin les étendre',1, 50),
(12,'Faire le repassage','Ranger les vêtements puis les repasser',1, 50),
(13,'Assurer voiture','Faire un comparatif de plusieur assureur pour trouver le meilleur prix',2, 50),
(14,'Assurer maison','Faire un comparatif de plusieur assureur pour trouver le meilleur prix ',2, 50),
(15,'Faire changement d''adresse','Aller a la poste faire une redirection peut permettre de temporiser le temps de faire les changement d''adresse',2, 50),
(16,'Payer taxes foncieres','Se connecter sur le site pour payer la taxe fonciere',2, 50);

-- Rémy taches ménagère 335 admin 135
-- Maxime taches ménagère 260 admin 190
--
-- Table structure for table `assigned_task`
--

DROP TABLE IF EXISTS `assigned_task`;

CREATE TABLE assigned_task(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (task_id) REFERENCES task(id)
) COMMENT '';

INSERT INTO `assigned_task` VALUES (1,1,1),(2,1,3),(3,1,5),(4,1,7),(5,1,9),(6,1,11),(7,1,12),(8,2,2),(9,2,4),(10,2,6),(11,2,8),(12,2,10);


--
-- Table structure for table `accomplish_task`
--

drop TABLE IF EXISTS `accomplish_task`;
CREATE TABLE accomplish_task(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (task_id) REFERENCES task(id)
) COMMENT '';
INSERT INTO `accomplish_task` VALUES 
(1,1,2),
(2,1,4),
(3,1,6),
(4,1,8),
(5,1,10),
(7,1,14),
(8,1,16),
(9,2,1),
(10,2,3),
(11,2,5),
(12,2,7),
(13,2,9),
(14,2,11),
(15,2,13),
(16,2,15);

--
-- Table structure for table `badge`1
--
CREATE TABLE badge(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    title VARCHAR(255) NOT NULL,
    task_category_id INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    critical_score BIGINT NOT NULL,
    Foreign Key (task_category_id) REFERENCES task_category(id)
) COMMENT '';

INSERT into `badge` VALUES 
 (1, 'netoyage endiablé',1, 'green', 100 ),
 (2, 'Yvresse du ménage', 1, 'green', 150), 
 (3, 'Fast & propre', 1,'yellow', 200),
 (4, 'Administrateur de papier',2, 'pink', 100),
 (5, 'Folie administrative', 2,'greysoft', 130),
 (6,'Expert comptable',2,'yellow', 180), 
 (7, 'Maniac', 1,'pink', 500),
 (8, 'Rien ne traine', 1,'green', 550);


--
-- Table structure for table `badge`
--
CREATE TABLE user_badge(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    badge_id INT NOT NULL,
    user_id INT NOT NULL,
    Foreign Key (badge_id) REFERENCES badge(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
) COMMENT '';

INSERT into user_badge VALUES 
(1,1,1),
(2,2,1),
(4,2,2),
(5,4,1),
(6,5,1),
(7,4,2),
(8,6,2),
(9,3,1);

-- Rémy taches ménagère 335 admin 135
-- Maxime taches ménagère 260 admin 190
--
-- Table structure for table `badge`
--
CREATE TABLE score(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    user_id INT NOT NULL,
    task_category_id INT NOT NULL,
    score BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (task_category_id) REFERENCES task_category(id)
) COMMENT '';

INSERT into score VALUES 
(1,1,1,335),
(2,1,2,135),
(3,2,1,260),
(4,2,2,190);


