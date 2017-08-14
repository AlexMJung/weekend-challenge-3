CREATE TABLE todo (
id serial primary key,
task VARCHAR(100),
complete Boolean
);

SELECT * FROM todo;

INSERT INTO todo (task, complete)
VALUES ('connect to database', 'false'),
('test pulling items from database(get)', 'false'),
('add items to database(post)','false'),
('remove items from database(delete)','false'),
('change class of items in database(put)', false);