CREATE SEQUENCE members_seq INCREMENT BY 1;

SELECT setval('members_seq', 1);

CREATE TABLE members (
    id BIGINT PRIMARY KEY,
    name TEXT,
    email TEXT
);

  insert into members (id, name, email)
values
  (1, 'a', 'b');