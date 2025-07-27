USE snackOverflow;

INSERT IGNORE INTO users (id, first_name, last_name, email_addr, password_hash)
VALUES
  ('u1', 'Justin', 'Pardo', 'justin@gmail.com', 'snack'),
  ('u2', 'Snack',   'Lover',   'snack@gmail.com', 'password');


INSERT IGNORE INTO items (sku, upc, item_name, item_desc, price, rating) VALUES
  ('A0001', '012345678901', 'Lays',     'Potato chips, the classics',                       19.99, 4.2),
  ('A0002', '012345678902', 'Water',    'A gallon of it.',            14.95, 4.7),
  ('A0003', '012345678903', 'Eggplant',     'probably good idk.',          9.99, 4.1),
  ('A0004', '012345678904', 'Cheetos',    'The classic ones.',  59.99, 4.5),
  ('A0005', '012345678905', 'Organic Eggs',        'Free-range organic eggs (dozen).',               4.99, 4.8),
  ('A0006', '012345678906', 'Almond Milk',         'Unsweetened almond milk, 1 L.',                 3.49, 4.4);

-- need to implement status
INSERT IGNORE INTO transactions
  (id,   user_id, creation_date,       delivered_date,       expected_date,       total,  order_status, created_at)
VALUES
  -- still-open order for u1
  ('t1', 'u1',    '2025-07-26 15:43:00', NULL,                '2025-07-28 12:00:00', 56.43, 'CREATED',    '2025-07-26 15:43:00'),
  -- delivered order for u1
  ('t2', 'u1',    '2025-07-25 12:15:00', '2025-07-26 09:00:00','2025-07-26 09:00:00', 37.50, 'DELIVERED',  '2025-07-25 12:15:00'),
  -- new in-progress order for u2
  ('t3', 'u2',    '2025-07-20 10:00:00', NULL,                '2025-07-22 10:00:00', 23.75, 'CREATED',    '2025-07-20 10:00:00'),
  -- delivered order for u2
  ('t4', 'u2',    '2025-07-18 16:30:00', '2025-07-19 14:00:00','2025-07-19 14:00:00', 89.90, 'DELIVERED',  '2025-07-18 16:30:00'),
  -- cancelled order for u1
  ('t5', 'u1',    '2025-07-27 09:00:00', NULL,                NULL,                 12.99, 'CANCELLED',  '2025-07-27 09:00:00');

INSERT IGNORE INTO transaction_items (transaction_id, item_id, item_cnt) VALUES
  -- t1 (u1)
  ('t1', 'A0001', 2),
  ('t1', 'A0002', 1),
  ('t1', 'A0005', 3),

  -- t2 (u1)
  ('t2', 'A0003', 1),
  ('t2', 'A0004', 1),
  ('t2', 'A0006', 2),

  -- t3 (u2)
  ('t3', 'A0001', 1),
  ('t3', 'A0003', 2),

  -- t4 (u2)
  ('t4', 'A0002', 4),
  ('t4', 'A0004', 2),
  ('t4', 'A0005', 1),

  -- t5 (u1, cancelled)
  ('t5', 'A0006', 1);

  CREATE TABLE IF NOT EXISTS categories (
  id   VARCHAR(36)    PRIMARY KEY,
  name VARCHAR(50)    NOT NULL UNIQUE,
  slug VARCHAR(50)    NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS item_categories (
  item_id     CHAR(5)       NOT NULL,
  category_id VARCHAR(36)   NOT NULL,
  PRIMARY KEY (item_id, category_id),
  FOREIGN KEY (item_id)     REFERENCES items(sku)      ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id)  ON DELETE CASCADE
);
-- should try to make it easier to implement items into categories
INSERT IGNORE INTO categories (id, name, slug) VALUES
  ('c1', 'Vegetables', 'vegetables'),
  ('c2', 'Fruits',     'fruits'),
  ('c3', 'Dairy',      'dairy'),
  ('c4', 'Snacks',     'snacks'),
  ('c5', 'Beverages',  'beverages');


INSERT IGNORE INTO item_categories (item_id, category_id) VALUES 
  ('A0003', 'c1'),  -- Eggplant
  ('A0005', 'c3'),  -- Organic Eggs 
  ('A0006', 'c3'),  -- Almond Milk 
  ('A0001', 'c4'),  -- Lays
  ('A0002', 'c5'),  -- Water
  ('A0004', 'c4');  -- Cheetos
