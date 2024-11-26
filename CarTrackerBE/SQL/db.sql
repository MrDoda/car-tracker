CREATE DATABASE CarTrackerDB;

USE CarTrackerDB;

CREATE TABLE User (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(255) DEFAULT NULL,
    Image LONGBLOB DEFAULT NULL,
    Created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Vehicle (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    LicensePlate VARCHAR(50) NOT NULL UNIQUE,
    YearOfManufacture YEAR NOT NULL,
    Image LONGBLOB DEFAULT NULL,
    InspectionExpiry DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User(ID)
);


INSERT INTO User (Name, Email, Password, Role) 
VALUES 
('Admin User', 'admin@example.com', '$2b$10$hHyzp6SFxI8ElAeMDSY5D.9zrdxYOkuvXr8iPd9.TSgcQ3GV0HvEK', 'admin'),
('Regular User', 'user@example.com', '$2b$10$hHyzp6SFxI8ElAeMDSY5D.9zrdxYOkuvXr8iPd9.TSgcQ3GV0HvEK', 'user');

INSERT INTO Vehicle (UserID, Name, LicensePlate, YearOfManufacture, InspectionExpiry) 
VALUES 
(1, 'Škoda Octavia', 'ABC1234', 2018, '2025-06-30'),
(1, 'Toyota Corolla', 'XYZ5678', 2020, '2024-12-15');
