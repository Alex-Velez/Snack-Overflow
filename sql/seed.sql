USE snackOverflow;


-- need to implement status
-- transactions
INSERT IGNORE INTO transactions
  (id,   user_id, creation_date,       delivered_date,       expected_date,       total,  order_status, created_at)
VALUES
  -- still-open order for u1
  ('t1', 'u1',    '2025-07-26 15:43:00', NULL,                '2025-07-28 12:00:00', 56.43, 'CREATED',    '2025-07-26 15:43:00'),
  -- delivered order for u1
  ('t2', 'u1',    '2025-07-25 12:15:00', '2025-07-26 09:00:00','2025-07-26 09:00:00', 37.50, 'DELIVERED',  '2025-07-25 12:15:00'),
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

  -- t5 (u1, cancelled)
  ('t5', 'A0006', 1);

-- transactions

INSERT INTO users (id, first_name, last_name, email_addr, password_hash)
VALUES 
('u1', 'Justin', 'Pardo', 'justin@gmail.com', 'snack');

INSERT INTO items (sku, upc, item_name, item_desc, price, rating, category, img_path) VALUES
(73829, 036000291452, 'Red Apple', 'Locally sourced red apple.', 0.79, 4.2, 'fruit', '/uploads/items/apple.png'),
(10457, 012345678905, 'Baguette', 'A fresh, crispy baguette.', 2.49, 3.8, 'bread', '/uploads/items/baguette.png'),
(52984, 042100005264, 'Bunch of Bananas', 'Locally sourced bananas', 1.29, 4.5, 'fruit', '/uploads/items/banana.png'),
(81630, 065100004327, 'Stick of Butter', 'Stick of lowfat butter.', 1.99, 4.1, 'dairy', '/uploads/items/butter.png'),
(39572, 079400201108, 'Single Carrot', 'Single fresh carrot.', 0.39, 3.6, 'vegetable', '/uploads/items/carrot.png'),
(64710, 093000012345, 'Whole Cauliflower', '', 2.79, 4.9, 'vegetable', '/uploads/items/cauliflower.png'),
(18294, 123456789012, 'Rotisserie Chicken', 'One whole rotisserie chicken.', 7.99, 4.0, 'meat', '/uploads/items/chicken.png'),
(92017, 234567890123, 'Snack Overflow Veggie Chips', 'Low calorie veggie chips.', 3.49, 3.7, 'snack', '/uploads/items/chips.png'),
(35068, 345678901234, 'Whole Corn Cob', '', 0.75, 4.6, 'vegetable', '/uploads/items/corn.png'),
(47392, 456789012345, 'Purple Grapes', '1/2lb of purple grapes.', 2.29, 4.4, 'fruit', '/uploads/items/grapes.png'),
(26841, 567890123456, 'Snack Overflow Low-Fat Milk', '', 2.49, 3.9, 'dairy', '/uploads/items/milk.png'),
(79053, 678901234567, 'Whole Onion', '', 0.59, 4.3, 'vegetable', '/uploads/items/onion.png'),
(18430, 789012345678, 'Single Orange', 'A single tangy orange.', 0.89, 4.0, 'fruit', '/uploads/items/orange.png'),
(61925, 890123456789, 'Bag of Popcorn', 'Low-calorie low-sodium popcorn.', 2.99, 3.5, 'snack', '/uploads/items/popcorn.png'),
(34017, 901234567890, 'Half-pound Pork', 'Ethically sourced.', 3.49, 4.1, 'meat', '/uploads/items/pork.png'),
(85360, 098765432109, 'Whole Potato', '', 0.69, 3.8, 'vegetable', '/uploads/items/potato.png'),
(47201, 111111111116, 'Raspberries', '6oz container of raspberries.', 3.99, 4.6, 'fruit', '/uploads/items/raspberries.png'),
(13789, 222222222221, 'One Pound Steak', 'Ethically sourced.', 9.99, 3.7, 'meat', '/uploads/items/steak.png'),
(60482, 333333333336, 'Quarter-Wheel Swiss Cheese', '', 5.49, 4.8, 'dairy', '/uploads/items/swiss_cheese.png'),
(71820, 444444444441, 'Loaf of White Bread', '', 1.99, 4.0, 'bread', '/uploads/items/white_bread.png'),
(29573, 555555555556, 'Loaf of Whole Grain Bread', '', 2.49, 3.7, 'bread', '/uploads/items/whole_grain_bread.png'),
(86149, 666666666661, 'Cup of Peach Yogurt', '', 0.89, 4.3, 'dairy', '/uploads/items/yogurt.png');
