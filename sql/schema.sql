DROP DATABASE IF EXISTS snackOverflow;
CREATE DATABASE IF NOT EXISTS snackOverflow;
USE snackOverflow;

CREATE TABLE users(
  id VARCHAR(36) PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email_addr VARCHAR(45) UNIQUE NOT NULL,
  password_hash VARCHAR(45) NOT NULL,
  shipping_addr TEXT
);

CREATE TABLE items(
  sku char(5) PRIMARY KEY,
  upc char(12) UNIQUE NOT NULL,
  item_name VARCHAR(100) NOT NULL,
  item_desc TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(2, 1),
  category VARCHAR(50) NOT NULL,
  img_path VARCHAR(255)
);

CREATE TABLE item_ratings(
  user_id VARCHAR(36) NOT NULL,
  item_id VARCHAR(36) NOT NULL,
  rating DECIMAL(2, 1) NOT NULL,
  PRIMARY KEY (user_id, item_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(sku)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE cart_items(
  user_id VARCHAR(36) NOT NULL,
  item_id VARCHAR(36) NOT NULL,
  item_cnt VARCHAR(36) NOT NULL,
  PRIMARY KEY (user_id, item_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(sku)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE transactions(
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  creation_date DATETIME NOT NULL,
  delivered_date DATETIME,
  expected_date DATETIME,
  order_status VARCHAR(9) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE transaction_items(
  transaction_id VARCHAR(36) NOT NULL,
  item_id char(5) NOT NULL,
  item_cnt INT NOT NULL,
  PRIMARY KEY (transaction_id, item_id),
  FOREIGN KEY (transaction_id) REFERENCES transactions(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (item_id) REFERENCES items(sku)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

CREATE TABLE discounts(
  code VARCHAR(10) PRIMARY KEY,
  sku CHAR(5) NOT NULL,
  discount INT NOT NULL
);
