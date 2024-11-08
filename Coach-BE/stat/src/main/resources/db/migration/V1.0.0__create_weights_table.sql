DROP SEQUENCE IF EXISTS stat.weights_seq;
DROP SEQUENCE IF EXISTS stat.trainings_seq;
DROP SEQUENCE IF EXISTS stat.diets_seq;

CREATE SEQUENCE stat.weights_seq INCREMENT BY 1;
SELECT setval('stat.weights_seq', 7);

CREATE SEQUENCE stat.trainings_seq INCREMENT BY 1;
SELECT setval('stat.trainings_seq', 2);

CREATE SEQUENCE stat.diets_seq INCREMENT BY 1;
SELECT setval('stat.diets_seq', 2);

DROP TABLE IF EXISTS stat.weights;
DROP TABLE IF EXISTS stat.trainings;
DROP TABLE IF EXISTS stat.diets;

CREATE TABLE stat.weights (
    id BIGINT PRIMARY KEY,
    member_id BIGINT,
    created DATE,
    weight_value DOUBLE PRECISION
);

CREATE TABLE stat.trainings (
    id BIGINT PRIMARY KEY,
    member_id BIGINT,
    time TEXT,
    appointment DATE,
    note TEXT
);

CREATE TABLE stat.diets (
    id BIGINT PRIMARY KEY,
    member_id BIGINT,
    product TEXT,
    carbohydrates INTEGER,
    proteins INTEGER,
    fats INTEGER
);

INSERT INTO stat.weights (id, member_id, created, weight_value) VALUES
  (1, 1, '2024-01-10', 70.5),
  (2, 1, '2024-02-10', 75.0),
  (3, 1, '2025-03-10', 78.8),
  (4, 1, '2025-04-10', 82.3),
  (5, 1, '2025-05-10', 77.5),
  (6, 1, '2025-06-10', 74.2);

INSERT INTO stat.trainings (id, member_id, time, appointment, note) VALUES
  (1, 1, '10:20', '2024-11-01', 'note1'),
  (2, 1, '10:20', '2024-11-30', 'note2');

INSERT INTO stat.diets (id, member_id, product, carbohydrates, proteins, fats) VALUES
  (1, 1, 'apple', 222, 100, 80),
  (2, 1, 'cheese', 100, 150, 333);
