ALTER TABLE `mysql`.`personal_info` 
ADD COLUMN `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL AFTER `name`;

CREATE TABLE personal_info (
    id INT PRIMARY KEY,
    name varchar(255) NOT NULL,
    address varchar(255),
    age INT
)