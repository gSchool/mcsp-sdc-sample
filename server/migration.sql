DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
  id SERIAL,
  description TEXT,
  priority NUMERIC
);

INSERT INTO tasks(description, priority) VALUES('Do the dishes', 2);
INSERT INTO tasks(description, priority) VALUES('Walk the dog', 1);
INSERT INTO tasks(description, priority) VALUES('Sweep the floor', 2);
INSERT INTO tasks(description, priority) VALUES('Do your homework', 3);
INSERT INTO tasks(description, priority) VALUES('Beat Elden Ring', 2);
