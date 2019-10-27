-- User table
create table users (username VARCHAR unique not null, password VARCHAR not null);

-- CO2 table
create table co2 (ppm VARCHAR not null, current timestamp not null);