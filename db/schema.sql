DROP DATABASE IF EXISTS u2qqdoleqxml2rr8;

CREATE DATABASE u2qqdoleqxml2rr8;

USE u2qqdoleqxml2rr8;

CREATE TABLE burgers (
    id int NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(60) NOT NULL,
    devoured BOOLEAN DEFAULT false, 
    PRIMARY KEY (id)
);