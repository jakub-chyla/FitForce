drop sequence IF EXISTS member.goals_seq;
drop sequence IF EXISTS member.members_seq;

create sequence member.goals_seq increment by 1;
select setval('member.goals_seq', 1);

create sequence member.members_seq increment by 1;
select setval('member.members_seq', 1);

drop table IF EXISTS member.members;
drop table IF EXISTS member.goals;

create TABLE member.goals (
    id BIGINT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

create TABLE member.members (
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
    CONSTRAINT fk_goal FOREIGN KEY (goal_id) REFERENCES member.goals(id)
);

insert into member.goals (id, name) values
  (1, 'Lose weight'),
  (2, 'Gain muscles');

insert into member.members (id, user_id, first_name, last_name, phone, avatar, email, birthday, goal_id, is_active, created)
values
  (1, 1, 'John', 'Williams', 1234567890, 1,'john.williams@example.com', '1985-05-15', 1, true, current_timestamp);
