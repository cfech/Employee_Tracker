DROP DATABASE IF EXISTS company_db3;

CREATE DATABASE company_db3;

USE company_db3;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES("Accounting");

INSERT INTO department (name)
VALUES("Sales");

INSERT INTO department (name)
VALUES("Marketing");





CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4),
    department_id INT,
    PRIMARY KEY (id)
);


INSERT INTO roles (title, salary)
VALUES("Accountant", 55000.00);

INSERT INTO roles (title, salary)
VALUES("Sales Person", 50000.00);

INSERT INTO roles (title, salary)
VALUES("Marketer", 45000.00);


INSERT INTO roles (title, salary)
VALUES("Manager", 90000.00);









CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Jimmy", "Accounting", 1,1500);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Sally", "Sales", 2, 1500);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Mike", "Marketing", 3, 1500);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES("Jim", "Thompson",3, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Carolina", "Gilmore", 1,1 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Richie", "Clark", 1,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("John", "Vickers", 1,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Allana", "Allen" ,2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Anita", "Kaufman", 2,2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Trey", "Best", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Symone", "Bryant",3,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Jeff", "Test",3,3);
