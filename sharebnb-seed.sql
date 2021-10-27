-- both test users have the password "password"

INSERT INTO users (username, password, firstName, lastName, email, isAdmin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

INSERT INTO listings (name,
                       street,
                       city,
                       state,
                       country,
                       description,
                       photoUrl)
VALUES ('bauer-gallagher', 
        '123 Bauer-Gallagher', 
        'Bauer',
        'Gallagher', 
        'USA',
        'Difficult ready trip question produce produce someone.', 
        'https://sharebnb-photos.s3.us-west-1.amazonaws.com/Screen+Shot+2021-08-31+at+4.50.36+PM.png')
       