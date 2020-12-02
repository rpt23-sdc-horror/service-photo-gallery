DROP TABLE IF EXISTS photo_urls;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS photo_types;
DROP TABLE IF EXISTS photo_sizes;

CREATE TABLE products (
    product_id    int primary key
);

CREATE TABLE styles (
    style_id      int primary key,
    style         text
);

CREATE TABLE photo_types (
    photo_type_id int primary key,
    photo_type    text
);

CREATE TABLE photo_sizes (
    photo_size_id int primary key,
    photo_size    text
);

CREATE TABLE photo_urls (
    product_id    int references products(product_id),
    style_id      int references styles(style_id),
    photo_url     text,
    photo_type_id int references photo_types(photo_type_id),
    photo_size_id int references photo_sizes(photo_size_id)
);

CREATE INDEX pid ON photo_urls(product_id);
