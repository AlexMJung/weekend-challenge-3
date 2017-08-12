CREATE TABLE todo (
id serial primary key,
task VARCHAR(250)
);

INSERT INTO todo (task)
VALUES ('connect to database'),
('test pulling items from database(get)'),
('add items to database(post)'),
('remove items from database(delete)'),
('change class of items in database(put)');