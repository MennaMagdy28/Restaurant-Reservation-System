-- this statement is for "something i don't know" but it fixes an error change it based on your database connection
-- Active: 1732798036106@@127.0.0.1@5433@Reservation-System 

CREATE TABLE Users(
    id SERIAL PRIMARY KEY ,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50)
);

CREATE TABLE Restaurants(
    id SERIAL PRIMARY KEY,
    vendor_id BIGINT,
    Foreign Key (vendor_id) REFERENCES Users(id)
    ON DELETE CASCADE,
    title VARCHAR(255) UNIQUE,
    food_category VARCHAR(255),
    location VARCHAR(255),
    description TEXT,
    image TEXT
);


CREATE TABLE Tables(
    id SERIAL PRIMARY KEY,
    restaurant_id BIGINT,
    Foreign KEY (restaurant_id) REFERENCES Restaurants(id)
    ON DELETE CASCADE,
    seat_num int
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE Reservations(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id BIGINT,
    Foreign Key (customer_id) REFERENCES Users(id),
    restaurant_id BIGINT,
    Foreign Key (restaurant_id) REFERENCES Restaurants(id),
    table_id BIGINT,
    Foreign Key (table_id) REFERENCES Tables(id),
    date DATE,
    time TIME
);

CREATE TABLE Notifications(
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    Foreign KEY (user_id) REFERENCES Users(id)
    ON DELETE CASCADE,
    title VARCHAR(255),
    message TEXT,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

CREATE TABLE Feedbacks(
    id SERIAL PRIMARY KEY,
    reservation_id UUID,
    Foreign Key (reservation_id) REFERENCES Reservations(id),
    rating INT,
    notes TEXT
);
-- -------------------------------------------------------------------------------------------------
-- insert data 
INSERT INTO Users (username, email, password, role)
VALUES 
    ('admin', 'admin@admin.com', 'password123', 'admin'),
    ('john_doe', 'john@example.com', 'password123', 'customer'),
    ('jane_smith', 'jane@example.com', 'securepass', 'customer'),
    ('vendor1', 'vendor1@example.com', 'vendorpass', 'vendor'),
    ('vendor2', 'vendor2@example.com', 'vendorpass', 'vendor');

INSERT INTO Restaurants (vendor_id, title, food_category, location, description, image)
VALUES 
    (3, 'Pizza Paradise', 'Italian', '123 Food Street', 'Best pizzas in town', 'image1.jpg'),
    (4, 'Sushi World', 'Japanese', '456 Sushi Lane', 'Authentic sushi', 'image2.jpg');

INSERT INTO Tables (restaurant_id, seat_num)
VALUES 
    (1, 4),
    (1, 6),
    (2, 2),
    (2, 4);

INSERT INTO Reservations (customer_id, restaurant_id, table_id, date, time)
VALUES 
    (1, 1, 1, '2024-12-01', '18:30:00'),
    (2, 2, 3, '2024-12-02', '19:00:00');

INSERT INTO Notifications (user_id, title, message)
VALUES 
    (1, 'Reservation Confirmation', 'Your reservation at Pizza Paradise is confirmed.'),
    (2, 'Reservation Reminder', 'Reminder: Your reservation at Sushi World is tomorrow.');

INSERT INTO Feedbacks (reservation_id, rating, notes)
VALUES 
    ((SELECT id FROM Reservations WHERE customer_id = 1 LIMIT 1), 5, 'Amazing pizza!'),
    ((SELECT id FROM Reservations WHERE customer_id = 2 LIMIT 1), 4, 'Great sushi, but a bit pricey.');

------------------------------------------------------------------------------------------------------------------------
-- Edit on relations

ALTER TABLE Feedbacks
ADD CONSTRAINT reservation_id UNIQUE (reservation_id);

ALTER TABLE Feedbacks
ADD COLUMN is_visible BOOLEAN DEFAULT TRUE;

--if running the code is done after the insertions only
UPDATE Feedbacks
SET is_visible = TRUE
WHERE is_visible IS NULL;
------------------------------------------------------------------------------------------------
DROP TABLE Feedbacks

CREATE TABLE Reviews(
    id SERIAL PRIMARY KEY,
    restaurant_id BIGINT,
    Foreign Key (restaurant_id) REFERENCES Restaurants(id)
    ON DELETE CASCADE,
    rating INT,
    notes TEXT,
    createdAt TIMESTAMP DEFAULT now(),
    is_visible BOOLEAN DEFAULT TRUE
);

ALTER table reviews
add COLUMN customer_id;

ALTER table reviews
add CONSTRAINT fk_cust Foreign Key (customer_id) REFERENCES users(id)
