drop sequence IF EXISTS coach.goals_seq;
drop sequence IF EXISTS coach.members_seq;

create sequence coach.goals_seq increment by 1;
select setval('coach.goals_seq', 1);

create sequence coach.members_seq increment by 1;
select setval('coach.members_seq', 1);

drop table IF EXISTS coach.members;
drop table IF EXISTS coach.goals;

create TABLE coach.goals (
    id BIGINT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

create TABLE coach.members (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    first_name TEXT,
    last_name TEXT,
    phone BIGINT,
    avatar BIGINT,
    email TEXT,
    birthday DATE,
    goal_id BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created TIMESTAMP,
    CONSTRAINT fk_goal FOREIGN KEY (goal_id) REFERENCES coach.goals(id)
);

insert into coach.goals (id, name) values
  (1, 'Lose weight'),
  (2, 'Gain muscles');

insert into coach.members (id, user_id, first_name, last_name, phone, avatar, email, birthday, goal_id, is_active, created)
values
  (1, 1, 'John', 'Williams', 1234567890, 1,'john.williams@example.com', '1985-05-15', 1, true, current_timestamp);
