DROP TABLE IF EXISTS locations, weathers, restaurants, movies;

CREATE TABLE locations (
id SERIAL PRIMARY KEY,
search_query VARCHAR(255),
formatted_query VARCHAR(255),
latitude NUMERIC(8, 6),
longitude NUMERIC(9, 6)
);

CREATE TABLE weathers (
id SERIAL PRIMARY KEY,
forecast VARCHAR(255),
time VARCHAR(255),
location_id INTEGER NOT NULL,
FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE restaurants (
id SERIAL PRIMARY KEY,
name VARCHAR(255),
image_url VARCHAR(255),
price VARCHAR(255),
rating NUMERIC(4, 2),
url VARCHAR(255),
location_id INTEGER NOT NULL,
FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE movies (
title VARCHAR(255),
overview VARCHAR(255),
vote_average NUMERIC(5, 3),
vote_count NUMERIC(7),
image_url VARCHAR(255),
popularity NUMERIC,
release_date VARCHAR(255),
location_id INTEGER NOT NULL,
FOREIGN KEY (location_id) REFERENCES locations (id)
);