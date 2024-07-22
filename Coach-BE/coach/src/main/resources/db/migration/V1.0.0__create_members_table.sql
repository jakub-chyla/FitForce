CREATE SEQUENCE members_seq INCREMENT BY 1;

SELECT setval('members_seq', 1);

CREATE TABLE members (
    id BIGINT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    phone BIGINT
);

  insert into members (id, first_name, last_name, phone)
values
  (1, 'a', 'b', 123456789);