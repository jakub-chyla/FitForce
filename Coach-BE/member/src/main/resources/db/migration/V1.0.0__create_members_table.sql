drop sequence IF EXISTS member.goals_seq;
drop sequence IF EXISTS member.members_seq;
drop sequence IF EXISTS member.member_order_seq;

create sequence member.goals_seq increment by 1;
select setval('member.goals_seq', 1);

create sequence member.members_seq increment by 1;
select setval('member.members_seq', 1);

create sequence member.member_order_seq increment by 1;
select setval('member.member_order_seq', 1);

drop table IF EXISTS member.members;
drop table IF EXISTS member.goals;
drop table IF EXISTS member.member_order;

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

create TABLE member.member_order (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
        member_id BIGINT
);


insert into member.goals (id, name) values
  (1, 'Lose weight'),
  (2, 'Gain muscles');

insert into member.members (id, user_id, first_name, last_name, phone, avatar, email, birthday, goal_id, is_active, created)
values
  (1, 1, 'John', 'Williams', 1234567890, 1,'john.williams@example.com', '1985-05-15', 1, true, current_timestamp);

  insert into member.members (id, user_id, first_name, last_name, phone, avatar, email, birthday, goal_id, is_active, created)
values
  (2, 1, 'John', 'Williams', 1234567890, 4,'john.williams@example.com', '1985-05-15', 1, true, current_timestamp);

insert into member.member_order(id,user_id, member_id) values (1,1,1);
insert into member.member_order(id,user_id, member_id) values (2,1,2);