COPY products
FROM '.\service-photo-gallery\database\seed\data\products.csv'
DELIMITER ','
CSV HEADER;

COPY styles
FROM '.\service-photo-gallery\database\seed\data\styles.csv'
DELIMITER ','
CSV HEADER;

COPY photo_types
FROM '.\service-photo-gallery\database\seed\data\photo_types.csv'
DELIMITER ','
CSV HEADER;

COPY photo_sizes
FROM '.\service-photo-gallery\database\seed\data\photo_sizes.csv'
DELIMITER ','
CSV HEADER;

COPY photo_urls
FROM '.\service-photo-gallery\database\seed\data\photo_urls.csv'
DELIMITER ','
CSV HEADER;
