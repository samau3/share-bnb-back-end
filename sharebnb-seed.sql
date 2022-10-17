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
                       price,
                       username
                       )
VALUES (
        'Forest Camping', 
        '123 Something St', 
        'Elk',
        'California',
        'United States',
        'Enjoy a private forest camping hut. Rustic yet designed with comfort in mind. Nestled among the Redwoods a few miles from the Pacific Ocean. This is a place for you to disconnect and reconnect with the surroundings. To unplug and decompress from busy life.',        
        232,
        'testuser'
),
(
        'Secluded Luxury Retreat',
        '123 Something St',
        'Ione',
        'California',
        'United States',
        'Secluded, 10 acre retreat style property with a Pool and Pond. King Bed, Full Kitchen, Full Bathroom, Shower & Outdoor Soaking Tub. Come for the beauty of the ranch, the coziness of the Tiny House and a place to truly get away from it all. We invite you to come and relax and leave the world behind.',
        211,
        'testuser'
),
(
        'Sequoia Getaway',
        '123 Something St',
        'Cazadero',
        'California',
        'United States',
        'Mid-century modern cabin, gleaming Airstream and sauna along seasonal Austin Creek, nestled among the Redwoods.',
        175,
        'testuser'
),
(
        'Yosemite Lake Side',
        '123 Something St',
        'Oakhurts',
        'California',
        'United States',
        'Welcome to our minimalist tiny house 30 minutes (17.6 miles) from the South entrance of Yosemite! Our tiny house is parked next to our small home where my husband and I live in our beautiful town, Oakhurst, with our two rescue llamas.',
        180,
        'testuser'
),
(
        'La Paloma Pools',
        '123 Something St',
        'Palm Springs',
        'California',
        'United States',
        'Live the quintessential Palm Springs experience at La Paloma Palms. Nestled in the highly sought after neighborhood of Vista Las Palmas, this four-bedroom villa is one of the mid-century modern masterpieces known to locals as an Alexander house. Originally constructed in 1960, La Paloma has been redefined to modern standards of luxury and its West-facing orientation presents stunning views of the San Jacinto Mountains.',
        1018,
        'testuser'
),
(
        'Luxury Lake Side Retreat',
        '123 Something St',
        'Glenbrook',
        'Nevada',
        'United States',
        'Make memories with family and friends with the pine forests and clear waters of Lake Tahoe as a backdrop at Villa De Lago. This expansive waterfront vacation rental, whose name means “the lake house,” gives you the quintessential experience: a private dock for dipping your feet, a bouldered shoreline to explore and a quiet location near South Lake Tahoe, north of Cave Rock, Nevada.',
        950,
        'testuser'
),
(
        'Modern Napa Vineyard',
        '123 Something St',
        'Angwin',
        'California',
        'United States',
        'Toast the Napa Valley sunset with glasses of local Cabernet at this renovated Howell Mountain farmhouse. Situated on an acre of secluded land, the villa features spacious interiors, an ample pool terrace for dining and games, and sweeping views of the countryside including Summit Lake. Walk to local wine tastings or take an easy drive into St. Helena and Calistoga.',
        1750,
        'testuser'
),
(
        'Saddle Peak Retreat',
        '123 Something St',
        'Topanga',
        'California',
        'United States',
        'Located in the boho heart of Los Angeles, this secluded home is surrounded by nothing but wild, wide-open space. The ultra modern structure, perched at the edge of a lush escarpment, features an unimpeded view of the rugged countryside from its abundance of full-length windows. The iconic Santa Monica Pier and sprawling seaside at Venice Beach, as well as The Getty Villa, are a short drive away.',        
        1057,
        'testuser'
),
(
        'Wine Country Vineyard',
        '123 Something St',
        'Calistoga',
        'California',
        'United States',
        'Calistoga is a small, yet incredibly vibrant, city within California’s Napa and Sonoma Valley. Situated on an actual vineyard, this luxurious six-bedroom enjoys an authenticity that most vacation rentals in Napa will never possess. Decorated with lavender bushes, an olive grove, and grape vines, Vineyard Estate is a beautiful setting for a family getaway. Nearby, you’ll find Mt. St. Helena Golf Course, the Old Faithful Geyser of California, and countless wineries to explore throughout the prestigious Napa Valley. Spacious open concept design, high-vaulted ceilings, and room-length openings to the terrace make it even easier to enjoy Calistoga’s beautiful scenery.',
        2250,
        'testuser'
),
(
        'Beach Side Escape',
        '123 Something St',
        'Manchester',
        'California',
        'United States',
        'Beautiful ocean front home on a bluff with unobstructed ocean views above private Irish Beach. First-class amenities and furnishings to comfortably sleep six. Watch whales and sunsets from the hot tub on the deck. Easy access to a wide variety of recreational activities in Mendocino County. A spectacular getaway.',
        324,
        'testuser'
),
(
        'Rooftop Ocean Views',
        '123 Something St',
        'Sea Ranch',
        'California',
        'United States',
        'This is an award winning home designed by and for the architect and her new husband. Take the driveway off Hedgegate Road, drive up to the front door of the residence visible through an opening with a black gong. Upon entry, one climbs steps to the upper living area of the home, kitchen living to the left, sleeping + shower to the right.',
        225,
        'testuser'
);

INSERT INTO listing_photos (listingsId, photoUrl)
VALUES
        (1, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Forest-Camping-Hut-1.jpeg'),
        (1, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Forest-Camping-Hut-2.jpeg'),
        (1, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Forest-Camping-Hut-3.jpeg'),
        (2, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Rustic-Cottage-1.jpeg'),
        (2, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Rustic-Cottage-2.jpeg'),
        (2, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Rustic-Cottage-3.jpeg'),
        (3, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Sequoia-House-1.jpeg'),
        (3, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Sequoia-House-2.jpeg'),
        (3, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Sequoia-House-3.jpeg'),
        (4, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Yosemite-Bass-Lake-Tiny-House.jpeg'),
        (5, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/La-Paloma-Pool-1.jpeg'),
        (5, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/La-Paloma-Pool-2.jpeg'),
        (6, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Villa-De-Lago-1.jpeg'),
        (6, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Villa-De-Lago-2.jpeg'),
        (6, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Villa-De-Lago-3.jpeg'),
        (7, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Modern-Napa-Farmhouse-1.jpeg'),
        (7, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Modern-Napa-Farmhouse-2.jpeg'),
        (7, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Modern-Napa-Farmhouse-3.jpeg'),
        (8, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Saddle-Peak-1.jpeg'),
        (8, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Saddle-Peak-2.jpeg'),
        (8, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Saddle-Peak-3.jpeg'),
        (9, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Vineyard-Estate-1.jpeg'),
        (9, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Vineyard-Estate-2.jpeg'),
        (9, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Vineyard-Estate-3.jpeg'),
        (10, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Beach-side-1.jpeg'),
        (10, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Beach-Side-2.jpeg'),
        (10, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Beach-side-3.jpeg'),
        (11, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Rooftop-1.jpeg'),
        (11, 'https://sharebnb-photos2.s3.us-west-1.amazonaws.com/photos/Rooftop-2.jpeg');


