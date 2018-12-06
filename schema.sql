DROP TABLE IF EXISTS locations, weathers, yelp, moviedb;

CREATE TABLE locations (
id SERIAL PRIMARY KEY,
search_query VARCHAR(255),
formatted_query VARCHAR(255),
latitude NUMERIC,
longitude NUMERIC
);

CREATE TABLE weathers (
id SERIAL PRIMARY KEY,
forcast VARCHAR(255),
time VARCHAR(255),
location_id INTEGER NOT NULL,
FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE yelp(
id SERIAL PRIMARY KEY,
name VARCHAR(255),
image_url VARCHAR(255),
price VARCHAR(255),
rating VARCHAR(255),
url VARCHAR(255),
location_id INTEGER NOT NULL,
FOREIGN KEY (location_id) REFERENCES locations (id)
);

CREATE TABLE  moviedb (
id SERIAL PRIMARY KEY,
title VARCHAR(255),
overview VARCHAR(255),
total_votes VARCHAR(255),
image_url VARCHAR(255),
popularity VARCHAR(255),
location_id INTEGER NOT NULL,
FOREIGN KEY (location_id) REFERENCES locations (id)
);