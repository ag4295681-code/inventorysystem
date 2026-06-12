DROP DATABASE IF EXISTS inventoryDB;
CREATE DATABASE inventoryDB;
USE inventoryDB;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
SHOW TABLES;
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);
SHOW TABLES;
CREATE TABLE company (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    company_email VARCHAR(150),
    contact_number VARCHAR(15),
    address VARCHAR(255)
);
SHOW TABLES;
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    price DOUBLE NOT NULL,
    category_id BIGINT,
    company_id BIGINT,
    license_number VARCHAR(100),
    expiry_date DATE,
    legal_status VARCHAR(20),
    low_stock_threshold INT DEFAULT 10,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (company_id) REFERENCES company(id)
);
SHOW TABLES;
CREATE TABLE portfolio (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
SHOW TABLES;
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    transaction_type ENUM('IN','OUT') NOT NULL,
    quantity INT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
SHOW TABLES;
DESC users;
DESC categories;
DESC company;
DESC products;
DESC portfolio;
DESC transactions;