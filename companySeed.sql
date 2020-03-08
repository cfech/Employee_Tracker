DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

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

INSERT INTO department (name)
VALUES("undefinded");



CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary INT(30),
    department_id INT,
    PRIMARY KEY (id)
);


INSERT INTO roles (title, salary)
VALUES("Accountant", 55000);

INSERT INTO roles (title, salary)
VALUES("Sales Person", 50000);

INSERT INTO roles (title, salary)
VALUES("Marketer", 45000);












CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);


INSERT INTO employee (first_name, last_name)
VALUES("Jim", "Thompson");

INSERT INTO employee (first_name, last_name)
VALUES("Carolina", "Gilmore");

INSERT INTO employee (first_name, last_name)
VALUES("Richie", "Clark");

INSERT INTO employee (first_name, last_name)
VALUES("John", "Vickers");

INSERT INTO employee (first_name, last_name)
VALUES("Allana", "Allen");

INSERT INTO employee (first_name, last_name)
VALUES("Anita", "Kaufman");

INSERT INTO employee (first_name, last_name)
VALUES("Trey", "Best");

INSERT INTO employee (first_name, last_name)
VALUES("Symone", "Bryant")

INSERT INTO employee (first_name, last_name)
VALUES("Jeff", "Test")







-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("chocolate", 3.10, 120);

-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("strawberry", 3.25, 75);