CREATE DATABASE fuelflow;
USE fuelflow;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'depot_staff', 'gas_station_owner', 'gas_station_staff', 'office_staff') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Table
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Depot Staff Table
CREATE TABLE depot_staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    department VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Gas Station Owner Table
CREATE TABLE gas_station_owner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    station_name VARCHAR(255),
    location VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Gas Station Staff Table
CREATE TABLE gas_station_staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    station_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (station_id) REFERENCES gas_station_owner(id) ON DELETE CASCADE
);

-- Office Staff Table
CREATE TABLE office_staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    full_name VARCHAR(255),
    age INT,
    sex ENUM('male', 'female', 'other'),
    contact_no VARCHAR(20),
    department VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
