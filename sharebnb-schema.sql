CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE listing_photos (
  id SERIAL PRIMARY KEY,
  listingsId INTEGER 
    REFERENCES listings,
  photoUrl TEXT
);

--TODO: Add reference between listings and users