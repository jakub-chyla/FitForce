DROP SEQUENCE IF EXISTS coach.goals_seq;
DROP SEQUENCE IF EXISTS coach.members_seq;

CREATE SEQUENCE coach.goals_seq INCREMENT BY 1;
SELECT setval('coach.goals_seq', 1);

CREATE SEQUENCE coach.members_seq INCREMENT BY 1;
SELECT setval('coach.members_seq', 1);

DROP TABLE IF EXISTS coach.members;
DROP TABLE IF EXISTS coach.goals;

CREATE TABLE coach.goals (
    id BIGINT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE coach.members (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    first_name TEXT,
    last_name TEXT,
    phone BIGINT,
    email TEXT,
    birthday DATE,
    goal_id BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created TIMESTAMP,
    CONSTRAINT fk_goal FOREIGN KEY (goal_id) REFERENCES coach.goals(id)
);

INSERT INTO coach.goals (id, name) VALUES
  (1, 'Lose weight'),
  (2, 'Gain muscles');

INSERT INTO coach.members (id, user_id, first_name, last_name, phone, email, birthday, goal_id, is_active, created)
VALUES
  (1, 1, 'John', 'Williams', 1234567890, 'john.williams@example.com', '1985-05-15', 1, true, CURRENT_TIMESTAMP);
