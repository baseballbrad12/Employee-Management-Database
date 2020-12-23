DROP DATABASE IF EXISTS employee_managementDB;

CREATE DATABASE employee_managementDB;

USE employee_managementDB;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
PRIMARY KEY (id)
);

SELECT * FROM department;

SELECT * FROM role;
 
SELECT * FROM employee;

-- department Seeds
INSERT INTO department (name) VALUE ("Engineering");
INSERT INTO department (name) VALUE ("Finance");
INSERT INTO department (name) VALUE ("Sales");
INSERT INTO department (name) VALUE ("Scheduling");
INSERT INTO department (name) VALUE ("Supply Chain");
INSERT INTO department (name) VALUE ("Program Office");


-- role seeds
INSERT INTO role (title, salary, department_id) VALUE ("Director of Operations", 200000, 6);
INSERT INTO role (title, salary, department_id) VALUE ("Program Mananger", 120000, 6);
INSERT INTO role (title, salary, department_id) VALUE ("Director of Finance", 180000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Sales Manager", 80000, 3);
INSERT INTO role (title, salary, department_id) VALUE ("Head of Engineering", 300000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Scheduling Manager", 90000, 3);
INSERT INTO role (title, salary, department_id) VALUE ("Supply Chain Manager", 95000, 5);
INSERT INTO role (title, salary, department_id) VALUE ("Engineer I", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUE ("Financial Analyst I", 65000, 2);
INSERT INTO role (title, salary, department_id) VALUE ("Sales Associate I", 50000, 3);
INSERT INTO role (title, salary, department_id) VALUE ("Scheduling Analyst I", 55000, 4);
INSERT INTO role (title, salary, department_id) VALUE ("Supply Chain Analyst I", 55000, 5);
INSERT INTO role (title, salary, department_id) VALUE ("Office Administrator I", 50000, 6);

-- employee Seeds
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Bradley", "Gosiengfiao", null, 9);  
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Eddie", "Van Halen", 1, 5);  
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Young", "Thug", 2, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Jerry", "Rice", 3, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Tom", "Brady", 1, 3);  
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Johnny", "English", null, 13); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Nick", "Bosa", null, 12); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Joe", "Montana", null, 11); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Roddy", "Rich", null, 10); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Derek", "Jeter", null, 8); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Babe", "Ruth", 2, 7); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Stephen", "A Smith", 1, 6); 
INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUE ("Todd", "Gurley", 2, 4); 

