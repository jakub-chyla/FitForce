create sequence members_seq increment by 1;

select setval('members_seq', 1);

create TABLE members (
    id BIGINT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    phone BIGINT,
    email TEXT,
    birthday DATE,
    goal TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created TIMESTAMP
);

insert into members (id, first_name, last_name, phone, email, birthday, goal, is_active, created)
values
  (1, 'John', 'Williams', 1234567890, 'john.williams@example.com', '1985-05-15', 'LOSE_WEIGHT', true, CURRENT_TIMESTAMP);
