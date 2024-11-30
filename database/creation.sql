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
