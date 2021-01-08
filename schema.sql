DROP TABLE IF EXISTS location;

CREATE TABLE location (
    id SERIAL PRIMARY KEY,
    lat DECIMAL(8,6),
    lon DECIMAL(9,6),
    city VARCHAR(255),
    display VARCHAR(255)
);

